"use client";

import { useEffect, useRef } from "react";

type TopoArc = number[][];
type TopoGeometry =
  | {
      type: "GeometryCollection";
      geometries: TopoGeometry[];
    }
  | {
      type: "MultiPolygon";
      arcs: number[][][];
    }
  | {
      type: "Polygon";
      arcs: number[][];
    };
type Topology = {
  transform: {
    scale: [number, number];
    translate: [number, number];
  };
  arcs: TopoArc[];
  objects: Record<string, TopoGeometry>;
};
type CobeGlobe = {
  update: (props: { phi: number; theta: number }) => void;
  destroy: () => void;
};
type CobeModule = {
  default: (
    canvas: HTMLCanvasElement,
    options: {
      devicePixelRatio: number;
      width: number;
      height: number;
      phi: number;
      theta: number;
      dark: number;
      diffuse: number;
      mapSamples: number;
      mapBrightness: number;
      baseColor: [number, number, number];
      markerColor: [number, number, number];
      glowColor: [number, number, number];
      markers: Array<{ location: [number, number]; size: number }>;
    }
  ) => CobeGlobe;
};
type KillableCanvas = HTMLCanvasElement & {
  __kill?: () => void;
};

/* ── Minimal TopoJSON → coordinate rings decoder ── */
function decodeTopo(topo: Topology, objName: string): number[][][] {
  const { scale, translate } = topo.transform;
  const decoded: number[][][] = topo.arcs.map((arc: number[][]) => {
    let x = 0,
      y = 0;
    return arc.map(([dx, dy]: number[]) => {
      x += dx;
      y += dy;
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
    });
  });

  const rings: number[][][] = [];
  function walk(g: TopoGeometry) {
    if (g.type === "GeometryCollection") return g.geometries.forEach(walk);
    if (!g.arcs) return;
    const groups = g.type === "MultiPolygon" ? g.arcs.flat() : g.arcs;
    groups.forEach((ring: number[]) => {
      const pts: number[][] = [];
      ring.forEach((i: number) => {
        const rev = i < 0;
        const a = decoded[rev ? ~i : i];
        (rev ? [...a].reverse() : a).forEach((p) => pts.push(p));
      });
      rings.push(pts);
    });
  }
  walk(topo.objects[objName]);
  return rings;
}

/* ── Orthographic projection (matches cobe internally) ── */
const D = Math.PI / 180;
const R = 0.8;

function proj(
  lat: number,
  lon: number,
  phi: number,
  theta: number
): { x: number; y: number; v: boolean } {
  const cl = Math.cos(lat * D),
    sl = Math.sin(lat * D);
  const cn = Math.cos(lon * D),
    sn = Math.sin(lon * D);
  const sx = cl * cn * R,
    sy = sl * R,
    sz = -cl * sn * R;
  const cp = Math.cos(phi),
    sp = Math.sin(phi);
  const ct = Math.cos(theta),
    st = Math.sin(theta);
  const xr = cp * sx + sp * sz;
  const yr = sp * st * sx + ct * sy - cp * st * sz;
  const zr = -sp * ct * sx + st * sy + cp * ct * sz;
  return { x: (xr + 1) / 2, y: (-yr + 1) / 2, v: zr > 0.005 };
}

/* ── Graticule lines ── */
function graticule(): number[][][] {
  const L: number[][][] = [];
  for (let lat = -80; lat <= 80; lat += 20) {
    const l: number[][] = [];
    for (let lon = -180; lon <= 180; lon += 3) l.push([lat, lon]);
    L.push(l);
  }
  for (let lon = -180; lon < 180; lon += 20) {
    const l: number[][] = [];
    for (let lat = -90; lat <= 90; lat += 3) l.push([lat, lon]);
    L.push(l);
  }
  return L;
}

/* ── Draw projected lines on 2D canvas ── */
function drawLines(
  ctx: CanvasRenderingContext2D,
  lines: number[][][],
  phi: number,
  theta: number,
  sz: number,
  color: string,
  lw: number,
  lonLat = false
) {
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  for (const line of lines) {
    ctx.beginPath();
    let pen = false;
    for (const pt of line) {
      const p = proj(lonLat ? pt[1] : pt[0], lonLat ? pt[0] : pt[1], phi, theta);
      if (p.v) {
        const px = p.x * sz,
          py = p.y * sz;
        if (!pen) {
          ctx.moveTo(px, py);
          pen = true;
        } else ctx.lineTo(px, py);
      } else if (pen) {
        ctx.stroke();
        ctx.beginPath();
        pen = false;
      }
    }
    if (pen) ctx.stroke();
  }
}

/* ── Component ── */
export default function GlobeComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const ptrRef = useRef<{ x: number; y: number } | null>(null);
  const phiRef = useRef(-0.5); // face Istanbul/Europe
  const thetaRef = useRef(0.25);
  const coastRef = useRef<number[][][]>([]);
  const gratRef = useRef(graticule());

  /* Load coastline outlines */
  useEffect(() => {
    fetch("https://unpkg.com/world-atlas@2.0.2/land-110m.json")
      .then((r) => r.json())
      .then((t: Topology) => {
        coastRef.current = decodeTopo(t, "land");
      })
      .catch(() => {});
  }, []);

  /* Cobe globe + overlay render loop */
  useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;

    canvas.style.cursor = "grab";
    const ctx = overlay.getContext("2d");
    if (!ctx) return;
    const overlayCtx = ctx;
    const SZ = 800;
    overlay.width = SZ * 2;
    overlay.height = SZ * 2;
    ctx.scale(2, 2);

    let raf = 0;
    let dead = false;
    let visible = false;
    let tickFn: (() => void) | null = null;

    const start = () => {
      if (raf || !tickFn) return;
      raf = requestAnimationFrame(tickFn);
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visible = e.isIntersecting;
          if (visible) start();
          else stop();
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    import("cobe").then((mod) => {
      if (dead) return;
      const globe = (mod as CobeModule).default(canvas, {
        devicePixelRatio: 2,
        width: 1600,
        height: 1600,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 24000,
        mapBrightness: 10,
        baseColor: [0.4, 0.4, 0.4],
        markerColor: [0.85, 0.25, 0.04],
        glowColor: [0.15, 0.15, 0.15],
        markers: [{ location: [41.0082, 28.9784], size: 0.06 }],
      });

      tickFn = function tick() {
        if (dead || !visible) {
          raf = 0;
          return;
        }
        if (!ptrRef.current) phiRef.current += 0.002;
        globe.update({ phi: phiRef.current, theta: thetaRef.current });

        /* overlay */
        overlayCtx.clearRect(0, 0, SZ, SZ);
        drawLines(overlayCtx, gratRef.current, phiRef.current, thetaRef.current, SZ, "rgba(255,255,255,0.07)", 0.5);
        if (coastRef.current.length)
          drawLines(overlayCtx, coastRef.current, phiRef.current, thetaRef.current, SZ, "rgba(255,255,255,0.25)", 0.8, true);

        raf = requestAnimationFrame(tickFn!);
      };
      if (visible) start();

      (canvas as KillableCanvas).__kill = () => {
        dead = true;
        stop();
        globe.destroy();
      };
    });

    return () => {
      dead = true;
      io.disconnect();
      stop();
      (canvas as KillableCanvas).__kill?.();
    };
  }, []);

  return (
    <div style={{ position: "relative", width: 800, height: 800 }}>
      <canvas
        ref={canvasRef}
        style={{ width: 800, height: 800, display: "block" }}
        onPointerDown={(e) => {
          ptrRef.current = { x: e.clientX, y: e.clientY };
          e.currentTarget.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          ptrRef.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = "grab";
        }}
        onPointerOut={() => {
          ptrRef.current = null;
        }}
        onMouseMove={(e) => {
          if (ptrRef.current) {
            const dx = e.clientX - ptrRef.current.x;
            const dy = e.clientY - ptrRef.current.y;
            phiRef.current -= dx * 0.005;
            thetaRef.current = Math.max(
              -1,
              Math.min(1, thetaRef.current + dy * 0.005)
            );
            ptrRef.current = { x: e.clientX, y: e.clientY };
          }
        }}
      />
      <canvas
        ref={overlayRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 800,
          height: 800,
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
