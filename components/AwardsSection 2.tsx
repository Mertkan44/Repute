"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const awards = [
  {
    name: "Awwwards",
    description: "Honorable Mention",
    year: "2026",
  },
  {
    name: "CSS Design Awards",
    description: "Site of the Day",
    year: "2026",
  },
  {
    name: "CSS Design Awards",
    description: "UI, UX & Innovation Awards",
    year: "2026",
  },
  {
    name: "Orpetron - Web Design Awards",
    description: "Site of the Day",
    year: "2026",
  },
  {
    name: "Landbook",
    description: "Landbook Featured",
    year: "2025",
  },
  {
    name: "Muzli",
    description: "Muzli Picks",
    year: "2025",
  },
  {
    name: "Awwwards",
    description: "Honorable Mention + No-Code Nominee",
    year: "2025",
  },
  {
    name: "Awwwards",
    description: "Honorable Mention",
    year: "2025",
  },
  {
    name: "28th Webby Awards",
    description: "Nominee - Branded Entertainment",
    year: "2024",
  },
  {
    name: "28th Webby Awards",
    description: "Winner - People's Voice",
    year: "2024",
  },
  {
    name: "28th Webby Awards",
    description: "Nominee - Tourism & Leisure",
    year: "2024",
  },
  {
    name: "Paris Film Awards",
    description: "Silver Award - Feature Documentary",
    year: "2022",
  },
  {
    name: "Bend Film Festival",
    description: "Winner - Best Outdoor Feature",
    year: "2022",
  },
];

export default function AwardsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="awards"
      ref={sectionRef}
      style={{
        position: "relative",
        backgroundColor: "#000",
        padding: "6rem 2rem",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Background hero image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="/images/awards-hero.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", opacity: 0.06 }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Two column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          {/* Left: Header */}
          <div className="fade-up">
            <p
              style={{
                fontFamily: '"PP Supply Mono", monospace',
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}
            >
              (AWARDS &amp; RECOGNITIONS)
            </p>
            <h2
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.02em",
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "1.5rem",
              }}
            >
              We Don&apos;t Chase Awards. *<br />
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                *They find us
              </span>
            </h2>

            {/* Award logos */}
            <div
              style={{
                marginTop: "3rem",
                borderRadius: "0.75rem",
                overflow: "hidden",
                backgroundColor: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "1.5rem",
              }}
            >
              <Image
                src="/images/award-logos.png"
                alt="Award organizations"
                width={500}
                height={60}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  opacity: 0.7,
                }}
              />
            </div>
          </div>

          {/* Right: Award list */}
          <div className="fade-up">
            <div>
              {awards.map((award, i) => (
                <div
                  key={i}
                  className="award-item"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1rem 0.75rem",
                    cursor: "default",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: '"PP Neue Montreal", sans-serif',
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        color: "#ffffff",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {award.name}
                    </div>
                    <div
                      style={{
                        fontFamily: '"PP Neue Montreal", sans-serif',
                        fontSize: "0.8rem",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      {award.description}
                    </div>
                  </div>
                  <div
                    style={{
                      fontFamily: '"PP Supply Mono", monospace',
                      fontSize: "0.75rem",
                      letterSpacing: "0.05em",
                      color: "rgba(255,255,255,0.35)",
                      flexShrink: 0,
                      marginLeft: "1rem",
                    }}
                  >
                    {award.year}
                  </div>
                </div>
              ))}
              {/* Bottom border */}
              <div
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
