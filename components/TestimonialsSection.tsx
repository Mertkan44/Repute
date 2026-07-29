"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const testimonials = [
  {
    name: "LZ Granderson",
    role: "Creative Producer",
    text: "Everyone at this level has technical competence, but Jay's actual superpowers are the care he takes to understand the goal, collaborate on solutions, communicate, and, yes, bring the vision to life. He was worth every penny and then some.",
    avatar: "/images/testimonial-1.jpeg",
  },
  {
    name: "Rishi Choudhary",
    role: "CEO & Co-Founder",
    text: "Jay is a beast!! High quality work in a short timeframe. His motion and graphic work is truly gamechanging. Can't recommend him enough!",
    avatar: "/images/testimonial-2.jpeg",
  },
  {
    name: "Dinesh Dave",
    role: "Co-Founder & Creative Director",
    text: "Jay's the real deal. Not only a Framer pro, but he truly cares—bringing ideas, polish, and extra miles we didn't even ask for. On Lorikeet, he turned loose homepage hero concepts into a live staging link in just a day, completely reshaping what we thought was possible.",
    avatar: "/images/testimonial-3.jpeg",
  },
  {
    name: "Max Trudel",
    role: "Director / DOP",
    text: "Jay is a one-of-a-kind creative mind (in the best way possible!). He's always coming up with mind-blowing ideas...",
    avatar: "/images/testimonial-4.jpeg",
  },
  {
    name: "Tj Walker",
    role: "Head of Production",
    text: "The man's a chameleon, minus the clichés. While many designers get stuck in a 'house style'... Jay's range is nothing short of extraordinary.",
    avatar: "/images/testimonial-5.jpg",
  },
  {
    name: "Max Gilberg",
    role: "Founding Partner & Creative Director, Major Media Agency",
    text: "Jay is truly in a league of his own. Not only is he incredibly talented and creative, but he's also easy and fun to work with. The final result is hands down the best agency website I've ever seen.",
    avatar: "/images/testimonial-6.jpeg",
  },
  {
    name: "Charles Lacasse",
    role: "Founder",
    text: "Working with Jay was an absolute pleasure. He has a masterful understanding of design...",
    avatar: "/images/testimonial-7.jpg",
  },
  {
    name: "Jeremie Bouchard",
    role: "Director + Editor",
    text: "Working with Jay Nadeau was an absolute game-changer for my website...",
    avatar: "/images/testimonial-8.jpeg",
  },
  {
    name: "Sofya Leonova",
    role: "Co-Founder + Operations Director",
    text: "Working with Jay has been an absolute pleasure. He's a true Framer expert—fast, precise, and collaborative.",
    avatar: "/images/testimonial-9.jpg",
  },
  {
    name: "Lorenzo Belassen",
    role: "Strategy & Creative Director",
    text: "Pleasure to work w/ Jay! We were first-time clients w/ no prior connection, but he treated us like long-time collaborators.",
    avatar: null,
  },
  {
    name: "Charles Vinette",
    role: "Founder, React Native Engineer",
    text: "What a great find Jay was for us. He knew exactly what we needed in a matter of minutes.",
    avatar: null,
  },
];

const StarRating = () => (
  <div style={{ display: "flex", gap: "2px", marginBottom: "1rem" }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="#D4410B"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
        padding: "6rem 0",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Header */}
      <div
        className="fade-up"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 2rem",
          marginBottom: "3.5rem",
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
          (TESTIMONIALS)
        </p>
        <h2
          style={{
            fontFamily: '"PP Neue Montreal", sans-serif',
            fontWeight: 700,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            letterSpacing: "-0.02em",
            color: "#ffffff",
            lineHeight: 1.1,
          }}
        >
          Don&apos;t take our word for it *<br />
          <span
            style={{
              fontFamily: '"PP Neue Montreal", sans-serif',
              fontStyle: "italic",
              fontWeight: 600,
              color: "rgba(255,255,255,0.6)",
            }}
          >
            *Take theirs
          </span>
        </h2>
      </div>

      {/* Horizontal scroll */}
      <div
        ref={scrollRef}
        className="hide-scrollbar"
        style={{
          display: "flex",
          gap: "1.25rem",
          overflowX: "auto",
          padding: "0 2rem",
          paddingRight: "2rem",
          cursor: "grab",
          userSelect: "none",
        }}
        onMouseDown={(e) => {
          const el = scrollRef.current;
          if (!el) return;
          const startX = e.pageX - el.offsetLeft;
          const scrollLeft = el.scrollLeft;
          el.style.cursor = "grabbing";

          const onMouseMove = (e: MouseEvent) => {
            const x = e.pageX - el.offsetLeft;
            el.scrollLeft = scrollLeft - (x - startX);
          };
          const onMouseUp = () => {
            el.style.cursor = "grab";
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
          };
          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
        }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            style={{
              flexShrink: 0,
              width: "360px",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "1rem",
              padding: "1.75rem",
              backgroundColor: "rgba(255,255,255,0.03)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "240px",
            }}
          >
            <div>
              <StarRating />
              <p
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontWeight: 400,
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.65,
                  marginBottom: "1.5rem",
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              {/* Avatar */}
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  backgroundColor: "rgba(255,255,255,0.1)",
                  position: "relative",
                }}
              >
                {t.avatar ? (
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    sizes="38px"
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: '"PP Neue Montreal", sans-serif',
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.6)",
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: '"PP Neue Montreal", sans-serif',
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    color: "#ffffff",
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontFamily: '"PP Supply Mono", monospace',
                    fontSize: "0.68rem",
                    letterSpacing: "0.06em",
                    color: "rgba(255,255,255,0.45)",
                    marginTop: "0.25rem",
                  }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
