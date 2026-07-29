'use client'
import { useEffect, useRef, useState } from 'react'
import { MeshGradient } from '@paper-design/shaders-react'

export default function GradientCanvas({
  mouseRef,
}: {
  mouseRef?: React.MutableRefObject<{ x: number; y: number }>
}) {
  const INIT = { ox: 0.12, oy: -0.05, rot: 6, swirl: 0.9, distortion: 0.95 }
  const [state, setState] = useState(INIT)
  const cur = useRef({ ...INIT })
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mouseRef) return
    let raf = 0
    let inViewport = true
    const last = { ox: cur.current.ox, oy: cur.current.oy, rot: cur.current.rot, swirl: cur.current.swirl, distortion: cur.current.distortion }
    const tick = () => {
      const m = mouseRef.current
      const w = window.innerWidth || 1
      const h = window.innerHeight || 1
      const nx = (m.x / w) - 0.5
      const ny = (m.y / h) - 0.5
      const r = Math.min(1, Math.hypot(nx, ny) * 2)

      const tOx = nx * 0.55
      const tOy = ny * 0.55
      const tRot = nx * 18
      const tSwirl = 0.55 + r * 0.6
      const tDist = 0.75 + r * 0.35

      const k = 0.09
      cur.current.ox += (tOx - cur.current.ox) * k
      cur.current.oy += (tOy - cur.current.oy) * k
      cur.current.rot += (tRot - cur.current.rot) * k
      cur.current.swirl += (tSwirl - cur.current.swirl) * k
      cur.current.distortion += (tDist - cur.current.distortion) * k

      const moved =
        Math.abs(cur.current.ox - last.ox) > 0.002 ||
        Math.abs(cur.current.oy - last.oy) > 0.002 ||
        Math.abs(cur.current.rot - last.rot) > 0.05 ||
        Math.abs(cur.current.swirl - last.swirl) > 0.003 ||
        Math.abs(cur.current.distortion - last.distortion) > 0.003

      if (moved) {
        last.ox = cur.current.ox
        last.oy = cur.current.oy
        last.rot = cur.current.rot
        last.swirl = cur.current.swirl
        last.distortion = cur.current.distortion
        setState({
          ox: cur.current.ox,
          oy: cur.current.oy,
          rot: cur.current.rot,
          swirl: cur.current.swirl,
          distortion: cur.current.distortion,
        })
      }
      if (inViewport) raf = requestAnimationFrame(tick)
      else raf = 0
    }
    const start = () => { if (!raf) raf = requestAnimationFrame(tick) }

    let io: IntersectionObserver | null = null
    if (wrapRef.current) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            inViewport = e.isIntersecting
            if (inViewport) start()
          }
        },
        { threshold: 0 }
      )
      io.observe(wrapRef.current)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      io?.disconnect()
    }
  }, [mouseRef])

  return (
    <div ref={wrapRef} className="absolute inset-0 w-full h-full">
      <MeshGradient
        style={{ width: '100%', height: '100%' }}
        colors={['#000000', '#000000', '#ff3d00', '#000000', '#000000', '#0b1580', '#000000']}
        speed={0.32}
        distortion={state.distortion}
        swirl={state.swirl}
        offsetX={state.ox}
        offsetY={state.oy}
        rotation={state.rot}
      />
    </div>
  )
}
