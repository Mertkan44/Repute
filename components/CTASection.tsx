"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const copy = {
  en: {
    label: "(READY WHEN YOU ARE)",
    headline: (
      <>
        LET&apos;S GET
        <br />
        TO WORK!
      </>
    ),
    subtitle:
      "Tell us what you're building, where you're stuck, or what keeps your marketing manager awake at night. We'll bring the strategy. You bring the coffee.",
    button: "START A PROJECT →",
  },
  fr: {
    label: "(PRÊT QUAND VOUS L'ÊTES)",
    headline: (
      <>
        ON S&apos;Y
        <br />
        MET&nbsp;?
      </>
    ),
    subtitle:
      "Parlez-nous de votre projet, de ce qui vous bloque, ou de ce qui empêche votre responsable marketing de dormir. Nous nous occupons de la stratégie. À vous d'apporter le café.",
    button: "DÉMARRER UN PROJET →",
  },
};

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { lang } = useLanguage();
  const t = copy[lang];

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
      id="cta"
      ref={sectionRef}
      className="px-6 md:px-10 lg:px-14"
      style={{
        backgroundColor: "transparent",
        paddingTop: "8rem",
        paddingBottom: "8rem",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Label */}
        <p
          className="fade-up"
          style={{
            fontFamily: '"PP Supply Mono", monospace',
            fontSize: "0.72rem",
            letterSpacing: "0.15em",
            color: "rgba(0,0,0,0.45)",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}
        >
          {t.label}
        </p>

        {/* Big headline */}
        <h2
          className="fade-up"
          style={{
            fontFamily: '"PP Neue Montreal", sans-serif',
            fontWeight: 700,
            fontSize: "clamp(3rem, 8vw, 7rem)",
            letterSpacing: "-0.03em",
            color: "#000000",
            lineHeight: 1.0,
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}
        >
          {t.headline}
        </h2>

        {/* Subtitle */}
        <p
          className="fade-up"
          style={{
            fontFamily: '"PP Neue Montreal", sans-serif',
            fontWeight: 400,
            fontSize: "1.1rem",
            color: "rgba(0,0,0,0.55)",
            lineHeight: 1.65,
            marginBottom: "3rem",
            maxWidth: "500px",
            margin: "0 auto 3rem",
          }}
        >
          {t.subtitle}
        </p>

        {/* CTA Button */}
        <div className="fade-up">
          <a
            href="#quote"
            style={{
              fontFamily: '"PP Neue Montreal", sans-serif',
              fontWeight: 600,
              fontSize: "1rem",
              letterSpacing: "0.03em",
              color: "#ffffff",
              textDecoration: "none",
              backgroundColor: "#111111",
              borderRadius: "2rem",
              padding: "1rem 2.5rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              transition: "background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 0 0 rgba(212, 65, 11, 0)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#333333";
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(212, 65, 11, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#111111";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 0 0 rgba(212, 65, 11, 0)";
            }}
          >
            {t.button}
          </a>
        </div>
      </div>
    </section>
  );
}
