"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function HeroSection() {
  const [counter, setCounter] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCounter(Math.round(progress * 100));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background 3D X image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center", opacity: 0.35 }}
        />
      </div>

      {/* Foreground X image — right side */}
      <div
        style={{
          position: "absolute",
          right: "-5%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "55%",
          aspectRatio: "4480/3840",
          zIndex: 1,
        }}
      >
        <Image
          src="/images/hero-x.webp"
          alt="3D Copper X"
          fill
          priority
          sizes="55vw"
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Left gradient fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, #000 30%, transparent 70%)",
          zIndex: 2,
        }}
      />
      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30%",
          background: "linear-gradient(to bottom, transparent, #000)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 2rem",
          paddingTop: "72px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* Label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              fontFamily: '"PP Supply Mono", monospace',
              fontSize: "0.75rem",
              letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.6)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            [ WE ARE ST&#332;KT ]
          </span>
          <span
            style={{
              fontFamily: '"PP Supply Mono", monospace',
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            →
          </span>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontFamily: '"PP Neue Montreal", sans-serif',
            fontWeight: 700,
            fontSize: "clamp(3rem, 7vw, 6rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            color: "#ffffff",
            maxWidth: "700px",
            marginBottom: "1.75rem",
          }}
        >
          MOVING
          <br />
          BRANDS
          <br />
          FORWARD
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: '"PP Neue Montreal", sans-serif',
            fontWeight: 400,
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "420px",
            marginBottom: "2.5rem",
          }}
        >
          St&#333;kt builds motion-driven brand systems, unifying branding, web,
          and motion into a single evolving execution.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {/* Button 1: VIEW PROJECTS — outlined white */}
          <a
            href="#work"
            style={{
              fontFamily: '"PP Neue Montreal", sans-serif',
              fontWeight: 500,
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              color: "#ffffff",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.45)",
              borderRadius: "2rem",
              padding: "0.8rem 1.75rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: "transparent",
              transition: "border-color 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.75)";
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            VIEW PROJECTS →
          </a>

          {/* Button 2: GET A QUOTE — dark filled */}
          <a
            href="#cta"
            style={{
              fontFamily: '"PP Neue Montreal", sans-serif',
              fontWeight: 500,
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
              color: "#ffffff",
              textDecoration: "none",
              backgroundColor: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "2rem",
              padding: "0.8rem 1.75rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.16)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
            }}
          >
            GET A QUOTE →
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "2rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "48px",
              backgroundColor: "rgba(255,255,255,0.3)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "40%",
                backgroundColor: "rgba(255,255,255,0.8)",
                animation: "scrollIndicator 1.5s ease-in-out infinite",
              }}
            />
          </div>
          <span
            style={{
              fontFamily: '"PP Supply Mono", monospace',
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: "rotate(180deg)",
            }}
          >
            Scroll
          </span>
        </div>
      </div>

      {/* Top right counter */}
      <div
        style={{
          position: "absolute",
          top: "100px",
          right: "2rem",
          zIndex: 3,
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontFamily: '"PP Supply Mono", monospace',
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.4)",
            marginBottom: "0.25rem",
          }}
        >
          est. in 2019
        </div>
        <div
          style={{
            fontFamily: '"PP Supply Mono", monospace',
            fontSize: "1.5rem",
            fontWeight: 400,
            color: "rgba(255,255,255,0.15)",
            letterSpacing: "0.05em",
          }}
        >
          {counter}%
        </div>
      </div>

      <style>{`
        @keyframes scrollIndicator {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
      `}</style>
    </section>
  );
}
