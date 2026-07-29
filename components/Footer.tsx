"use client";

import { useLanguage, Lang } from "@/lib/LanguageContext";

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
  },
  fr: {
    brandBlurb:
      "Solutions de marketing digital complètes, à la croisée de l'émotion et de la raison, de la rigueur et de la passion, de la stratégie et de la création.",
    address: "Bebek, Istanbul",
    copyright: "© 2026 RÉPUTÉ. Tous droits réservés.",
  },
};

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
      }}
    >
      {/* ── Full-bleed background video ── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/videos/footer-golf.webm" type="video/webm" />
      </video>

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
          style={{
            padding: "3rem 2rem 2rem",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "2.5fr 1fr 1fr 1fr",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            {/* Brand column */}
            <div>
              <h2
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontWeight: 600,
                  fontSize: "clamp(1.4rem, 2vw, 1.75rem)",
                  color: "#ffffff",
                  letterSpacing: "-0.02em",
                  marginBottom: "1.25rem",
                  lineHeight: 1.2,
                }}
              >
                RÉPUTÉ
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
                        style={{
                          fontFamily: '"PP Neue Montreal", sans-serif',
                          fontSize: "0.85rem",
                          color: "rgba(255,255,255,0.55)",
                          textDecoration: "none",
                          transition: "color 0.2s ease",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.35rem",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#ffffff";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                        }}
                      >
                        {link.label}
                        {"ext" in link && link.ext && (
                          <span style={{ fontSize: "0.7rem" }}>↗</span>
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
          style={{
            padding: "1.5rem 2rem",
          }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <p
              style={{
                fontFamily: '"PP Supply Mono", monospace',
                fontSize: "0.7rem",
                letterSpacing: "0.06em",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              {t.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
