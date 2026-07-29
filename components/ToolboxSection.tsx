"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ToolboxSection() {
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-up");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: "#000",
        padding: "5rem 0",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        className="fade-up"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 2rem",
          marginBottom: "3rem",
        }}
      >
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
          Everyday&apos;s Toolbox
        </p>
        <h2
          style={{
            fontFamily: '"PP Neue Montreal", sans-serif',
            fontWeight: 700,
            fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
            letterSpacing: "-0.02em",
            color: "#ffffff",
            lineHeight: 1.15,
          }}
        >
          Mastered for every project.
        </h2>
      </div>

      {/* Marquee strip */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Left fade */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to right, #000, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        {/* Right fade */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "120px",
            background: "linear-gradient(to left, #000, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Marquee content — duplicate for seamless loop */}
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "marquee 35s linear infinite",
          }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0",
              }}
            >
              <Image
                src="/images/toolbox-logos.png"
                alt="Tools we use"
                width={2000}
                height={80}
                style={{
                  height: "70px",
                  width: "auto",
                  objectFit: "contain",
                  opacity: 0.8,
                  flexShrink: 0,
                }}
              />
              <Image
                src="/images/toolbox-logos.png"
                alt=""
                width={2000}
                height={80}
                style={{
                  height: "70px",
                  width: "auto",
                  objectFit: "contain",
                  opacity: 0.8,
                  flexShrink: 0,
                  marginLeft: "2rem",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
