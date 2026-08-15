"use client";

import Image from "next/image";
import GlobeComponent from "./GlobeComponent";
import { useLanguage } from "@/lib/LanguageContext";

const copy = {
  en: {
    sectionLabel: "[ WHO WE ARE ] ↓",
    stats: [
      { value: "5+", label: "Years of Experience" },
      { value: "35+", label: "Satisfied Clients" },
      { value: "100+", label: "Projects" },
    ],
    metaBadge: "Meta Expert & Partner",
    metaLearnMore: "Learn More →",
    basedIn: "Based in Istanbul",
    availableWorldwide: "AVAILABLE WORLDWIDE",
    founderName: "Rana",
    founderTitle: "Founder of RÉPUTÉ",
    founderHeading: (
      <>
        The Founder, <em style={{ fontStyle: "italic", opacity: 0.7 }}>a.k.a Rana</em>
      </>
    ),
    bio: [
      "RÉPUTÉ was born from a simple observation: the internet doesn't suffer from a lack of content. It suffers from a lack of meaning.",
      "After gaining experience with global brands including Koç, Eczacıbaşı, and McDonald's, Rana realized that the strongest brands aren't necessarily the loudest — they're the most consistent. The ones that know exactly what they stand for and communicate it relentlessly, across every channel.",
      "Her background in luxury marketing and psychology shaped an approach where strategy comes before execution, and creativity is never separated from purpose.",
      "As a content creator herself, Rana also understands the other side of the equation. She knows what people genuinely choose to watch, share, and connect with. Not because an algorithm rewards it, but because it resonates. That perspective allows her to bridge two worlds that often struggle to understand each other: the strategic world of brands, driven by KPIs, growth, and performance, and the creative world of creators, driven by authenticity, culture, and attention. The best campaigns happen where those two worlds meet.",
      "Today, she leads RÉPUTÉ with the same philosophy: building communication systems rather than isolated campaigns. Every strategy begins with a clear idea worth remembering, then comes to life through social media, creators, paid media, and content that all reinforce the same message. Because great marketing isn't about shouting louder. It's about making people care enough to remember.",
    ],
    workWith: "Work with Rana →",
  },
  fr: {
    sectionLabel: "[ LE STUDIO ] ↓",
    stats: [
      { value: "5+", label: "Années d'Expérience" },
      { value: "35+", label: "Clients Satisfaits" },
      { value: "100+", label: "Projets Réalisés" },
    ],
    metaBadge: "Expert & Partenaire Meta",
    metaLearnMore: "En Savoir Plus →",
    basedIn: "Basée à Istanbul",
    availableWorldwide: "PRÉSENTE DANS LE MONDE ENTIER",
    founderName: "Rana",
    founderTitle: "Fondatrice de RÉPUTÉ",
    founderHeading: (
      <>
        La Fondatrice, <em style={{ fontStyle: "italic", opacity: 0.7 }}>alias Rana</em>
      </>
    ),
    bio: [
      "RÉPUTÉ est née d'un constat simple : Internet ne manque pas de contenu. Il manque de sens.",
      "Après avoir accompagné des marques internationales telles que Koç, Eczacıbaşı et McDonald's, Rana a compris que les marques les plus fortes ne sont pas forcément les plus bruyantes. Ce sont celles qui savent exactement ce qu'elles représentent et qui le communiquent avec cohérence, sur chaque point de contact.",
      "Son parcours en marketing du luxe et en psychologie a façonné une approche où la stratégie précède toujours l'exécution, et où la créativité n'existe jamais sans intention.",
      "Créatrice de contenu elle-même, Rana connaît également l'autre côté du miroir. Elle sait ce que les gens choisissent réellement de regarder, de partager et avec quoi ils créent un véritable lien. Non pas parce que l'algorithme le favorise, mais parce que cela résonne. Cette double perspective lui permet de faire le lien entre deux univers qui peinent souvent à se comprendre : celui des marques, guidé par les KPI, la croissance et la performance, et celui des créateurs, porté par l'authenticité, la culture et l'attention. Les meilleures campagnes naissent précisément à la rencontre de ces deux mondes.",
      "Aujourd'hui, elle dirige RÉPUTÉ avec cette même conviction : construire des systèmes de communication plutôt que des campagnes isolées. Chaque stratégie commence par une idée forte, digne d'être retenue, puis prend vie à travers les réseaux sociaux, les créateurs, les campagnes publicitaires et des contenus qui portent tous le même message. Car un bon marketing ne consiste pas à parler plus fort. Il consiste à donner aux gens une bonne raison de se souvenir de vous.",
    ],
    workWith: "Travailler avec Rana →",
  },
};

export default function AboutSection() {
  const { lang } = useLanguage();
  const t = copy[lang];

  return (
    <section
      id="about"
      className="px-6 md:px-10 lg:px-14 py-14 md:py-20"
      style={{
        backgroundColor: "#000",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
          {t.sectionLabel}
        </p>

        {/* Top bento grid — 3 columns: stats | meta | globe */}
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr_4.2fr] gap-3 mb-3"
        >
          {/* ── Col 1: Stat cards ──
              One per row on phones with the number and label side by side. Three
              across at 375px left each card ~100px, so labels broke onto three
              lines beside an oversized figure. */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
            {t.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0 px-5 py-4 md:p-6"
                style={{
                  flex: 1,
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  className="text-[2.1rem] md:text-[clamp(2rem,3.5vw,3rem)] md:mb-[0.4rem]"
                  style={{
                    fontFamily: '"PP Neue Montreal", sans-serif',
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                    lineHeight: 1,
                    flexShrink: 0,
                    minWidth: "3.2rem",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: '"PP Neue Montreal", sans-serif',
                    fontWeight: 400,
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "0.02em",
                    lineHeight: 1.35,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Col 2: Meta Expert card ── */}
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
            {/* Wordmark */}
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
              {/* Wordmark recoloured white for dark backgrounds; the blue mark is
                  left untouched, per Meta's own dark-surface usage. */}
              <div style={{ position: "relative", width: "78%", aspectRatio: "1080 / 260" }}>
                <Image
                  src="/images/meta-logo.png"
                  alt="Meta"
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
                  {t.metaBadge}
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
                {t.metaLearnMore}
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
            {/* Top text — centred over the globe, matching the reference layout */}
            <div className="text-left md:text-center" style={{ padding: "1.75rem 1.75rem 0" }}>
              <div
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontWeight: 600,
                  fontSize: "1rem",
                  color: "#ffffff",
                  marginBottom: "0.5rem",
                }}
              >
                {t.basedIn}
              </div>
              <div className="flex items-center gap-[0.4rem] md:justify-center">
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
                  {t.availableWorldwide}
                </span>
              </div>
            </div>

            {/* Globe — matches the reference: horizontally centred, about 82% of
                the card's width, and cropped by the card's lower edge rather than
                bleeding out the sides. */}
            <div
              data-globe-frame
              className="min-h-[300px] md:min-h-[430px]"
              style={{
                flex: 1,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                className="absolute left-1/2 -translate-x-1/2 top-[14%] md:top-[8%]"
                style={{ lineHeight: 0 }}
              >
                <GlobeComponent ratio={0.82} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: Rana photo | bio */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-3">
          {/* Rana photo placeholder */}
          <div
            className="min-h-[300px] md:min-h-[400px]"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* TODO: swap for a real photo of Rana at /images/rana.png */}
            <span
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                fontWeight: 700,
                fontSize: "clamp(3rem, 6vw, 4.5rem)",
                color: "rgba(255,255,255,0.15)",
              }}
            >
              RY
            </span>
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
                {t.founderName}
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
                {t.founderTitle}
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
              {t.founderHeading}
            </h2>

            {t.bio.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
                  marginBottom: i === t.bio.length - 1 ? "1.75rem" : "1rem",
                }}
              >
                {paragraph}
              </p>
            ))}

            {/* Divider mark */}
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
              href="#quote"
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
              {t.workWith}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
