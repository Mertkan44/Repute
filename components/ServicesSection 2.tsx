"use client";

import { useState } from "react";
import Image from "next/image";

const services = [
  {
    id: "branding",
    label: "Branding Identity",
    description:
      "We design brands, systems, and experiences that feel intentional from the first tap to the last interaction.",
    videoMov: "/videos/services-branding.mov",
    videoWebm: "/videos/services-branding.webm",
    image: "/images/services-branding.png",
    imageAlt: "Keyboard with STŌKT key",
    items: [
      "Identity Branding",
      "UX Design / Research",
      "UI Design",
      "UX Copywriting",
      "Art Direction",
      "Creative Direction",
      "Interactive Design",
    ],
    accent: "#ffffff",
  },
  {
    id: "web",
    label: "Web Design & Dev",
    description:
      "We build fast, responsive, and future-ready digital products using modern tools and frameworks.",
    videoMov: "/videos/services-web.mov",
    videoWebm: "/videos/services-web.webm",
    image: "/images/services-web.png",
    imageAlt: "Robotic mechanical arm",
    items: [
      "Creative Development",
      "CMS Building",
      "Website Responsiveness",
      "Web Application",
      "E-Commerce",
      "AI Workflow Integration",
      "Web Development",
    ],
    accent: "#ffffff",
  },
  {
    id: "motion",
    label: "Motion Systems",
    description:
      "We design bold, scalable visuals—built for impact, movement, and modern storytelling. Whether crafted by hand or powered by AI, these systems bring your brand to life.",
    videoMov: "/videos/services-motion.mov",
    videoWebm: "/videos/services-motion.webm",
    image: "/images/services-motion.png",
    imageAlt: "Skateboard bearing wheel",
    items: [
      "3D Design & Rendering",
      "Custom Icon Systems",
      "Motion Design",
      "AI-Generated Video",
      "AI-Powered VFX",
      "AI Imagery & Compositing",
      "Motion Systems",
    ],
    accent: "#D4410B",
  },
];

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section
      id="services"
      style={{
        backgroundColor: "#000",
        padding: "6rem 2rem",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div style={{ flex: 1, minWidth: "280px", maxWidth: "640px" }}>
            <p
              style={{
                fontFamily: '"PP Supply Mono", monospace',
                fontSize: "0.72rem",
                letterSpacing: "0.12em",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              [ Services &amp; Expertise ]
            </p>
            <h2
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                fontWeight: 500,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                letterSpacing: "-0.02em",
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "1.25rem",
              }}
            >
              Digital Design Powerhouse
            </h2>
            <p
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                fontWeight: 400,
                fontSize: "1rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.65,
                maxWidth: "520px",
              }}
            >
              Over the last decade, we&apos;ve refined a wide range of skills in
              digital design, offering services mastered to perfection and always
              driven by the purpose of motion.
            </p>
          </div>

          <div style={{ flexShrink: 0, paddingTop: "0.5rem" }}>
            <a
              href="#cta"
              style={{
                fontFamily: '"PP Supply Mono", monospace',
                fontWeight: 400,
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                color: "#ffffff",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "2rem",
                padding: "0.65rem 1.4rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.65)";
                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              LEARN MORE →
            </a>
          </div>
        </div>

        {/* Horizontal Accordion */}
        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            height: "520px",
          }}
        >
          {services.map((svc) => {
            const isActive = activeId === svc.id;
            const someActive = activeId !== null;
            const isCollapsed = someActive && !isActive;

            return (
              <div
                key={svc.id}
                onClick={() => setActiveId(isActive ? null : svc.id)}
                style={{
                  position: "relative",
                  flex: isActive ? "5 0 0" : isCollapsed ? "0 0 72px" : "1 0 0",
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "14px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition:
                    "flex 0.55s cubic-bezier(0.4,0,0.2,1), border-color 0.3s ease",
                  minWidth: 0,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = isActive
                      ? "rgba(255,255,255,0.14)"
                      : "rgba(255,255,255,0.08)";
                  }
                }}
              >
                {/* ── DEFAULT STATE: image + label at bottom ── */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    // Delay appearance so expanded content fades out first
                    opacity: isActive ? 0 : 1,
                    transition: isActive
                      ? "opacity 0.15s ease 0s"
                      : "opacity 0.3s ease 0.25s",
                    pointerEvents: isActive ? "none" : "auto",
                    zIndex: 1,
                  }}
                >
                  {!isCollapsed ? (
                    <>
                      {/* Static image (default, no video) */}
                      <div
                        style={{
                          flex: 1,
                          position: "relative",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "1.5rem",
                        }}
                      >
                        <Image
                          src={svc.image}
                          alt={svc.imageAlt}
                          fill
                          sizes="33vw"
                          style={{
                            objectFit: "contain",
                            objectPosition: "center",
                            padding: "1.5rem",
                          }}
                        />
                      </div>
                      {/* Label at bottom */}
                      <div
                        style={{
                          padding: "1.25rem 1.5rem",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: '"PP Neue Montreal", sans-serif',
                            fontWeight: 500,
                            fontSize: "1rem",
                            color: svc.id === "motion" ? "#D4410B" : "#ffffff",
                          }}
                        >
                          {svc.label}
                        </span>
                      </div>
                    </>
                  ) : (
                    /* COLLAPSED: rotated label only */
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: '"PP Neue Montreal", sans-serif',
                          fontWeight: 500,
                          fontSize: "0.9rem",
                          color:
                            svc.id === "motion"
                              ? "#D4410B"
                              : "rgba(255,255,255,0.65)",
                          whiteSpace: "nowrap",
                          transform: "rotate(-90deg)",
                          display: "block",
                        }}
                      >
                        {svc.label}
                      </span>
                    </div>
                  )}
                </div>

                {/* ── EXPANDED STATE: content left + video right ── */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    // Delay appearance so default content fades out first
                    opacity: isActive ? 1 : 0,
                    transition: isActive
                      ? "opacity 0.35s ease 0.2s"
                      : "opacity 0.15s ease 0s",
                    pointerEvents: isActive ? "auto" : "none",
                    zIndex: 2,
                  }}
                >
                  {/* Left: text */}
                  <div
                    style={{
                      flex: "1 1 0",
                      padding: "2.25rem 2.5rem",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      minWidth: 0,
                      overflow: "hidden",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: '"PP Neue Montreal", sans-serif',
                        fontWeight: 600,
                        fontSize: "clamp(1.3rem, 1.8vw, 1.75rem)",
                        letterSpacing: "-0.02em",
                        color: "#ffffff",
                        lineHeight: 1.15,
                        marginBottom: "0.75rem",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {svc.label}
                    </h3>

                    <p
                      style={{
                        fontFamily: '"PP Neue Montreal", sans-serif',
                        fontSize: "0.85rem",
                        color: "rgba(255,255,255,0.5)",
                        lineHeight: 1.65,
                        marginBottom: "1.75rem",
                        maxWidth: "340px",
                      }}
                    >
                      {svc.description}
                    </p>

                    {/* 2-col items */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        rowGap: "0.45rem",
                        columnGap: "0.75rem",
                      }}
                    >
                      {svc.items.map((item) => (
                        <div
                          key={item}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.4rem",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.75rem",
                              color: "rgba(255,255,255,0.35)",
                              flexShrink: 0,
                            }}
                          >
                            →
                          </span>
                          <span
                            style={{
                              fontFamily: '"PP Neue Montreal", sans-serif',
                              fontSize: "0.8rem",
                              color: "rgba(255,255,255,0.7)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: video (plays only when expanded) */}
                  <div
                    style={{
                      flex: "0 0 44%",
                      position: "relative",
                      overflow: "hidden",
                      backgroundColor: "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {isActive && (
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        key={svc.id}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      >
                        {/* Safari: HEVC with alpha channel */}
                        <source src={svc.videoMov} type="video/mp4; codecs=hvc1" />
                        {/* Chrome/Firefox: VP9 WebM with alpha */}
                        <source src={svc.videoWebm} type="video/webm; codecs=vp9" />
                      </video>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
