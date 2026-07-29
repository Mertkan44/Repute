"use client";

import Image from "next/image";

const projects = [
  {
    id: 1,
    name: "Kastle AI",
    tags: ["Brand Identity", "Web Design & Dev", "Motion & 3D"],
    image: "/images/work-kastle.png",
  },
  {
    id: 2,
    name: "We Scale It",
    tags: ["Brand Identity", "Web Design & Dev"],
    image: "/images/work-wescaleit.png",
  },
  {
    id: 4,
    name: "Jeremie Bouchard",
    tags: ["Brand Identity", "Motion & 3D"],
    image: "/images/work-jeremie.jpeg",
  },
  {
    id: 5,
    name: "Enzo Drew",
    tags: ["Brand Identity", "Web Design & Dev"],
    image: "/images/work-enzo.png",
  },
];

export default function FeaturedWork() {
  return (
    <section
      id="work"
      style={{
        backgroundColor: "transparent",
        padding: "6rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: '"PP Supply Mono", monospace',
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                color: "rgba(0,0,0,0.5)",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              [ Selected Projects ]
            </p>
            <h2
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.02em",
                color: "#000000",
                lineHeight: 1.1,
              }}
            >
              Featured Work
            </h2>
          </div>
          <a
            href="#"
            style={{
              fontFamily: '"PP Neue Montreal", sans-serif',
              fontWeight: 500,
              fontSize: "0.875rem",
              letterSpacing: "0.05em",
              color: "rgba(0,0,0,0.6)",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#000000"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(0,0,0,0.6)"; }}
          >
            All Work →
          </a>
        </div>

        {/* Bento Grid — 4 cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: "1rem",
          }}
        >
          {/* Row 1: Wide left (8) + Narrow right (4) */}
          <WorkCard project={projects[0]} col="span 8" aspectRatio="56%" />
          <WorkCard project={projects[1]} col="span 4" aspectRatio="100%" />

          {/* Row 2: Narrow left (4) + Wide right (8) — mirrored */}
          <WorkCard project={projects[2]} col="span 4" aspectRatio="100%" />
          <WorkCard project={projects[3]} col="span 8" aspectRatio="56%" />
        </div>
      </div>
    </section>
  );
}

function WorkCard({
  project,
  col,
  aspectRatio,
}: {
  project: (typeof projects)[0];
  col: string;
  aspectRatio: string;
}) {
  return (
    <div
      className="work-card"
      style={{
        gridColumn: col,
        position: "relative",
        overflow: "hidden",
        borderRadius: "12px",
        backgroundColor: "#111",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "relative",
          paddingBottom: aspectRatio,
          overflow: "hidden",
        }}
      >
        <Image
          src={project.image}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="work-card-img"
          style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
        />
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85) 100%)",
            zIndex: 1,
          }}
        />
        {/* Card info */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "1.5rem",
            zIndex: 2,
          }}
        >
          <h3
            style={{
              fontFamily: '"PP Neue Montreal", sans-serif',
              fontWeight: 600,
              fontSize: "1.05rem",
              color: "#ffffff",
              marginBottom: "0.5rem",
            }}
          >
            {project.name}
          </h3>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: '"PP Supply Mono", monospace',
                  fontSize: "0.65rem",
                  letterSpacing: "0.05em",
                  color: "rgba(255,255,255,0.7)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "2rem",
                  padding: "0.2rem 0.6rem",
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
