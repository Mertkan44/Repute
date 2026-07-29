"use client";

import Image from "next/image";
import GlobeComponent from "./GlobeComponent";

export default function AboutSection() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: "#000",
        padding: "6rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Section Label */}
        <p
          style={{
            fontFamily: '"PP Supply Mono", monospace',
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.5)",
            textTransform: "uppercase",
            marginBottom: "2rem",
          }}
        >
          [ ABOUT US ] ↓
        </p>

        {/* Top bento grid — 3 columns: stats | framer | globe */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr 4.2fr",
            gap: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          {/* ── Col 1: Stat cards (stacked) ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { value: "13+", label: "Years of Experience" },
              { value: "15+", label: "Awards & Recognition" },
              { value: "350+", label: "Satisfied Clients" },
            ].map((stat) => (
              <div
                key={stat.value}
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  padding: "1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: '"PP Neue Montreal", sans-serif',
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 3.5vw, 3rem)",
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                    lineHeight: 1,
                    marginBottom: "0.4rem",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: '"PP Neue Montreal", sans-serif',
                    fontWeight: 400,
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.02em",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Col 2: Framer Expert card ── */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* 3D Framer Logo */}
            <div
              style={{
                flex: 1,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "200px",
              }}
            >
              <div style={{ position: "relative", width: "80%", aspectRatio: "1 / 1" }}>
                <Image
                  src="/images/about-framer-3d-correct.png"
                  alt="Framer 3D logo"
                  fill
                  sizes="20vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Bottom label */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginBottom: "0.4rem",
                }}
              >
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "#0EA5E9",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: '"PP Supply Mono", monospace',
                    fontSize: "0.65rem",
                    letterSpacing: "0.08em",
                    color: "rgba(255,255,255,0.7)",
                    textTransform: "uppercase",
                  }}
                >
                  Framer Pro Expert &amp; Partner
                </span>
              </div>
              <a
                href="#about"
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontWeight: 400,
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
              >
                Learn More →
              </a>
            </div>
          </div>

          {/* ── Col 3: Globe card ── */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Top text */}
            <div style={{ padding: "1.75rem 1.75rem 0" }}>
              <div
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                }}
              >
                Based in Quebec, Canada
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <div
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "#22C55E",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: '"PP Supply Mono", monospace',
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                  }}
                >
                  AVAILABLE WORLDWIDE
                </span>
              </div>
            </div>

            {/* Globe */}
            <div
              style={{
                flex: 1,
                position: "relative",
                overflow: "hidden",
                minHeight: "380px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: "-120px",
                  left: "50%",
                  transform: "translateX(-45%)",
                  lineHeight: 0,
                }}
              >
                <GlobeComponent />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: Jay photo | bio | unicorn */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2.8fr 2fr",
            gap: "0.75rem",
          }}
        >
          {/* Jay photo */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              minHeight: "400px",
            }}
          >
            <Image
              src="/images/jay-nadeau-orange.png"
              alt="Jay Nadeau"
              fill
              sizes="15vw"
              style={{ objectFit: "cover", objectPosition: "center top" }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "45%",
                background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))",
              }}
            />
            {/* Name label */}
            <div
              style={{
                position: "absolute",
                bottom: "1.25rem",
                left: "1.25rem",
                right: "1.25rem",
              }}
            >
              <div
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: "#ffffff",
                  marginBottom: "0.15rem",
                }}
              >
                Jay Nadeau
              </div>
              <div
                style={{
                  fontFamily: '"PP Supply Mono", monospace',
                  fontSize: "0.6rem",
                  letterSpacing: "0.1em",
                  color: "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                }}
              >
                Founder &amp; Creative Director of St&#333;kt
              </div>
            </div>
          </div>

          {/* Bio card */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "2.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                fontWeight: 600,
                fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                letterSpacing: "-0.02em",
                color: "#ffffff",
                lineHeight: 1.2,
                marginBottom: "1.25rem",
              }}
            >
              The Founder
            </h2>

            <p
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                marginBottom: "1rem",
              }}
            >
              Jay founded St&#333;kt in 2019 after spending the early part of his career in agencies.
              His ambition has always been to bring movement into traditionally static brand systems,
              a vision now fully aligned with today&apos;s digital landscape.
            </p>
            <p
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                marginBottom: "1rem",
              }}
            >
              His work blends art direction, motion, and web development, with a focus on cohesive,
              motion-driven brand systems. Working from concept to execution, Jay designs experiences
              guided by clarity, intent, and precision, believing aesthetics only matter when they
              serve a clear purpose.
            </p>
            <p
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.7,
                marginBottom: "1.75rem",
              }}
            >
              From small to large-scale projects, Jay leads independently or assembles tailored teams
              as needed. Through St&#333;kt, he partners closely with brands seeking meaningful growth,
              remaining deeply involved to ensure every decision is intentional and built to last.
            </p>

            {/* Snowflake divider */}
            <div style={{ marginBottom: "1.25rem" }}>
              <Image
                src="/images/logo-light.png"
                alt=""
                width={22}
                height={22}
                style={{ objectFit: "contain", opacity: 0.6 }}
              />
            </div>

            <a
              href="#cta"
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                fontWeight: 400,
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.3rem",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            >
              Work with Jay →
            </a>
          </div>

          {/* Unicorn Studio Expert card */}
          <div
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Product image fills top */}
            <div style={{ flex: 1, position: "relative", minHeight: "280px" }}>
              <Image
                src="/images/about-unicorn.png"
                alt="Unicorn Studio"
                fill
                sizes="25vw"
                style={{ objectFit: "contain", objectPosition: "center", padding: "1.5rem" }}
              />
            </div>

            {/* Bottom label */}
            <div
              style={{
                padding: "1.25rem 1.5rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "#ffffff",
                  marginBottom: "0.3rem",
                }}
              >
                Unicorn Studio Expert
              </div>
              <a
                href="https://contra.com/unicornstudio?view=people"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontWeight: 400,
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
              >
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
