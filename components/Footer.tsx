"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage, Lang } from "@/lib/LanguageContext";
import GradientCanvas from "./GradientCanvas";

const footerLinksByLang: Record<
  Lang,
  Record<string, { title: string; links: { label: string; href: string; ext?: boolean }[] }>
> = {
  en: {
    index: {
      title: "Index",
      links: [
        { label: "Home", href: "#home" },
        { label: "What We Do", href: "#work" },
        { label: "Who We Are", href: "#about" },
        { label: "Let's Be Friends", href: "#quote" },
      ],
    },
    terms: {
      title: "Terms & Policies",
      links: [
        { label: "Terms of Service", href: "#" },
        { label: "Privacy Policy", href: "#" },
        { label: "Cookie Settings", href: "#" },
      ],
    },
    socials: {
      title: "Socials",
      links: [
        { label: "Instagram", href: "#", ext: true },
        { label: "Linked In", href: "#", ext: true },
        { label: "Behance", href: "#", ext: true },
        { label: "Awwwards", href: "#", ext: true },
      ],
    },
  },
  fr: {
    index: {
      title: "Index",
      links: [
        { label: "Accueil", href: "#home" },
        { label: "Expertises", href: "#work" },
        { label: "Le Studio", href: "#about" },
        { label: "Parlons De Votre Projet", href: "#quote" },
      ],
    },
    terms: {
      title: "Mentions Légales",
      links: [
        { label: "Conditions d'Utilisation", href: "#" },
        { label: "Politique de Confidentialité", href: "#" },
        { label: "Gestion des Cookies", href: "#" },
      ],
    },
    socials: {
      title: "Réseaux",
      links: [
        { label: "Instagram", href: "#", ext: true },
        { label: "Linked In", href: "#", ext: true },
        { label: "Behance", href: "#", ext: true },
        { label: "Awwwards", href: "#", ext: true },
      ],
    },
  },
};

const copy = {
  en: {
    brandBlurb:
      "Comprehensive digital marketing solutions mixing the emotional with the rational, seriousness with passion, action with creation.",
    address: "Bebek, Istanbul",
    copyright: "© 2026 RÉPUTÉ. All rights reserved.",
    localTime: "Istanbul",
  },
  fr: {
    brandBlurb:
      "Solutions de marketing digital complètes, à la croisée de l'émotion et de la raison, de la rigueur et de la passion, de la stratégie et de la création.",
    address: "Bebek, Istanbul",
    copyright: "© 2026 RÉPUTÉ. Tous droits réservés.",
    localTime: "Istanbul",
  },
};

/* Live Istanbul time — the clocks were pulled out of the header, and the footer
   is where they actually earn their place next to "Born in Istanbul". */
function IstanbulClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          timeZone: "Europe/Istanbul",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return <span style={{ fontFamily: "monospace", fontVariantNumeric: "tabular-nums" }}>{time}</span>;
}

export default function Footer() {
  const { lang } = useLanguage();
  const footerLinks = footerLinksByLang[lang];
  const t = copy[lang];

  return (
    <footer
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        backgroundColor: "#000",
      }}
    >
      {/* ── Animated gradient, same shader as the hero but darker and slower so
           the copy stays readable. Swap back to the video by restoring a <video>
           here with /videos/footer-swing.webm + .mp4. ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <GradientCanvas
          colors={["#000000", "#000000", "#3d0c00", "#8f2300", "#c2521a", "#000000", "#000000"]}
          speed={0.16}
        />
      </div>

      {/* ── Black gradient falling from the top: holds the copy area solid,
           then clears so the footage reads normally lower down ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.6) 22%, rgba(0,0,0,0.3) 42%, rgba(0,0,0,0.1) 62%, rgba(0,0,0,0) 78%)",
        }}
      />

      {/* ── Short scrim behind the copyright strip, so the legal line keeps
           enough contrast where the gradient is at its warmest. ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "16%",
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.28) 45%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* ── Oversized wordmark filling the empty lower half. `overlay` blending
           lets the gradient read through the letterforms instead of sitting
           flatly on top of it. ── */}
      <div
        aria-hidden
        className="hidden md:block footer-wordmark"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "-2.5vw",
          zIndex: 1,
          pointerEvents: "none",
          textAlign: "center",
          lineHeight: 0.8,
          fontFamily: '"PP Neue Montreal", sans-serif',
          fontWeight: 700,
          fontSize: "20vw",
          letterSpacing: "-0.04em",
          color: "rgba(255,255,255,0.30)",
          mixBlendMode: "overlay",
          userSelect: "none",
        }}
      >
        RÉPUTÉ
      </div>

      {/* ── Content overlay ── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "100vh",
        }}
      >
        {/* Top: footer links */}
        <div
          className="px-6 md:px-10 lg:px-14"
          style={{
            paddingTop: "3rem",
            paddingBottom: "2rem",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            {/* Brand column */}
            <div>
              <h2 style={{ marginBottom: "1.25rem", lineHeight: 0 }}>
                <Image
                  src="/images/logo-repute-white.png"
                  alt="RÉPUTÉ"
                  width={338}
                  height={78}
                  style={{ width: "170px", height: "auto", display: "block" }}
                />
              </h2>
              <p
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.6,
                  marginBottom: "1rem",
                  maxWidth: "360px",
                }}
              >
                {t.brandBlurb}
              </p>
              <p
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.6,
                  marginBottom: "0.3rem",
                }}
              >
                {t.address}
              </p>
              <a
                href="mailto:hello@wearerepute.com"
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                }}
              >
                hello@wearerepute.com
              </a>
            </div>

            {/* Link columns */}
            {Object.values(footerLinks).map((col) => (
              <div key={col.title}>
                <h4
                  style={{
                    fontFamily: '"PP Neue Montreal", sans-serif',
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    color: "#ffffff",
                    marginBottom: "1rem",
                  }}
                >
                  {col.title}
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.55rem",
                  }}
                >
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="footer-link"
                        style={{
                          fontFamily: '"PP Neue Montreal", sans-serif',
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.55)",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                        }}
                      >
                        {/* Arrow slides out of zero width on hover */}
                        <span className="footer-link-arrow" aria-hidden>
                          →
                        </span>
                        <span className="footer-link-label">{link.label}</span>
                        {"ext" in link && link.ext && (
                          <span style={{ fontSize: "0.7rem", marginLeft: "0.35rem" }}>↗</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: copyright */}
        <div
          className="px-6 md:px-10 lg:px-14"
          style={{
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
          }}
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            style={{ maxWidth: "1280px", margin: "0 auto" }}
          >
            <p
              style={{
                fontFamily: '"PP Supply Mono", monospace',
                fontSize: "0.7rem",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.68)",
              }}
            >
              {t.copyright}
            </p>

            <p
              style={{
                fontFamily: '"PP Supply Mono", monospace',
                fontSize: "0.7rem",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.68)",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                className="footer-live-dot"
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: "#22C55E",
                  display: "inline-block",
                  flexShrink: 0,
                }}
              />
              {t.localTime}
              <IstanbulClock />
            </p>
          </div>
        </div>
      </div>

      <style>{`
        footer .footer-link-arrow {
          display: inline-block;
          width: 0;
          opacity: 0;
          transform: translateX(-4px);
          overflow: hidden;
          font-size: 0.75rem;
          transition: width 0.25s ease, opacity 0.25s ease, transform 0.25s ease;
        }
        footer .footer-link:hover {
          color: #fff;
        }
        footer .footer-link:hover .footer-link-arrow {
          width: 1.05em;
          opacity: 0.7;
          transform: translateX(0);
        }
        footer .footer-link { transition: color 0.2s ease; }
        footer .footer-live-dot { animation: footerPulse 2.4s ease-in-out infinite; }
        @keyframes footerPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34,197,94,0.45); }
          50% { opacity: 0.7; box-shadow: 0 0 0 4px rgba(34,197,94,0); }
        }
        /* Very slow drift so the wordmark breathes against the gradient
           instead of sitting dead still. */
        footer .footer-wordmark { animation: footerDrift 18s ease-in-out infinite; }
        @keyframes footerDrift {
          0%, 100% { transform: translateX(-1.2%); }
          50%      { transform: translateX(1.2%); }
        }
        @media (prefers-reduced-motion: reduce) {
          footer .footer-link-arrow { transition: none; }
          footer .footer-live-dot { animation: none; }
          footer .footer-wordmark { animation: none; }
        }
      `}</style>
    </footer>
  );
}
