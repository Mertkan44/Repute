"use client";

import { useState } from "react";
import Image from "next/image";
import { useLanguage, Lang } from "@/lib/LanguageContext";

const intro = {
  en: {
    tag: "[ Services & Expertise ]",
    heading: "Digital Marketing Powerhouse",
    body: "Marketing works best when every touchpoint tells the same story. We build strategic communication systems that make your brand feel consistent wherever people meet it. On social media, through creators, in ads, or in conversation. Different channels. Different formats. One clear message people remember, trust, and act on.",
    cta: "LEARN MORE →",
  },
  fr: {
    tag: "[ Nos Expertises ]",
    heading: "Là Où Les Marques Grandissent",
    body: "Le marketing est plus efficace lorsque chaque point de contact raconte la même histoire. Nous concevons des systèmes de communication stratégiques qui rendent votre marque cohérente, partout où elle rencontre son public. Sur les réseaux sociaux, à travers les créateurs de contenu, dans vos campagnes publicitaires ou au détour d'une conversation. Des canaux différents. Des formats différents. Un seul message, clair, que l'on retient, auquel on croit, et qui donne envie d'agir.",
    cta: "EN SAVOIR PLUS →",
  },
};

const servicesByLang = {
  en: [
    {
      id: "social",
      label: "Social Media Strategy",
      description:
        "We figure out who you're talking to, what they're actually interested in, and why they should care in the first place. Content pillars, brand positioning, platform strategy, customer psychology — we connect all the dots before a single post goes live. Because, well, let's be honest, random content gets random results.",
      items: [
        "Content Pillars",
        "Brand Positioning",
        "Platform Strategy",
        "Customer Psychology",
        "Channel Planning",
        "Editorial Calendar",
      ],
    },
    {
      id: "influencer",
      label: "Influencer Projects",
      description:
        "Consumers can smell a forced sponsorship from three scrolls away. We pair brands with creators who actually make sense, develop concepts people would watch even without the product, and oversee every detail from briefing to reporting. No awkward product placements. No scripted enthusiasm. Because attention is rented. Trust is earned. And sales come after both.",
      items: [
        "Creator Matching",
        "Concept Development",
        "Campaign Briefing",
        "Production Oversight",
        "Performance Reporting",
        "Full Project Management",
      ],
    },
    {
      id: "performance",
      label: "Performance Marketing",
      description:
        "Make every penny you spend go further. Turn your campaigns from \"meh\" to marvelous. More conversion and sales with lower cost of acquisition. Position on the right platform, know the hell out of your target audience, and get creative with, well, the campaign creatives. Test, analyze, and optimize. Ta-daa! That's what we call magic.",
      items: [
        "Platform Selection",
        "Audience Targeting",
        "Creative Testing",
        "Conversion Optimization",
        "Budget Efficiency",
        "Performance Analytics",
      ],
    },
  ],
  fr: [
    {
      id: "social",
      label: "Stratégie Social Media",
      description:
        "Avant de publier quoi que ce soit, on identifie à qui vous parlez, ce qui capte réellement son attention et pourquoi votre marque mérite qu'on s'y intéresse. Plateformes, positionnement, piliers de contenu, psychologie du consommateur : on relie tous les points avant que le premier post ne soit mis en ligne. Parce qu'au fond, soyons honnêtes : publier au hasard, c'est obtenir des résultats... tout aussi aléatoires.",
      items: [
        "Piliers de Contenu",
        "Positionnement de Marque",
        "Stratégie Plateforme",
        "Psychologie Consommateur",
        "Planification des Canaux",
        "Calendrier Éditorial",
      ],
    },
    {
      id: "influencer",
      label: "Projets d'Influence",
      description:
        "Les consommateurs repèrent un partenariat forcé en trois scrolls. Nous mettons les marques en relation avec des créateurs qui leur correspondent vraiment, imaginons des concepts que les gens regarderaient même sans le produit, et pilotons chaque étape du projet, du brief jusqu'au reporting. Pas de placement produit maladroit. Pas d'enthousiasme récité. Parce que l'attention s'achète. La confiance se mérite. Et les ventes viennent seulement après.",
      items: [
        "Sélection des Créateurs",
        "Développement de Concept",
        "Brief de Campagne",
        "Supervision Production",
        "Reporting de Performance",
        "Gestion de Projet Complète",
      ],
    },
    {
      id: "performance",
      label: "Marketing de la Performance",
      description:
        "Chaque euro mérite de faire mieux que simplement être dépensé. Transformez vos campagnes de « mouais » à mémorables. Plus de conversions, plus de ventes, moins de coût d'acquisition. Les bonnes plateformes, une audience que vous connaissez sur le bout des doigts, des créas qui attirent l'attention… puis on teste, on analyse et on optimise. Encore et encore. La magie ? Non. Juste une bonne stratégie.",
      items: [
        "Choix des Plateformes",
        "Ciblage d'Audience",
        "Test de Créas",
        "Optimisation Conversion",
        "Efficacité Budgétaire",
        "Analyse de Performance",
      ],
    },
  ],
};

const media = {
  social: {
    videoMov: "/videos/services-social.mov",
    videoWebm: "/videos/services-social.webm",
    image: "/images/services-social.png",
    imageAlt: "Social media strategy",
    accent: "#ffffff",
  },
  influencer: {
    videoMov: "/videos/services-influencer.mov",
    videoWebm: "/videos/services-influencer.webm",
    image: "/images/services-influencer.png",
    imageAlt: "Influencer collaboration",
    accent: "#ffffff",
  },
  performance: {
    videoMov: "/videos/services-performance.mov",
    videoWebm: "/videos/services-performance.webm",
    image: "/images/services-performance.png",
    imageAlt: "Performance marketing",
    accent: "#ffffff",
  },
};

function getServices(lang: Lang) {
  return servicesByLang[lang].map((svc) => ({ ...svc, ...media[svc.id as keyof typeof media] }));
}

export default function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  /* Which card's hover video has buffered enough to show */
  const [readyId, setReadyId] = useState<string | null>(null);
  const { lang } = useLanguage();
  const t = intro[lang];
  const services = getServices(lang);

  return (
    <section
      id="services"
      className="px-6 md:px-10 lg:px-14"
      style={{
        backgroundColor: "#000",
        paddingTop: "5rem",
        paddingBottom: "5rem",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
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
              {t.tag}
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
              {t.heading}
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
              {t.body}
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
              {t.cta}
            </a>
          </div>
        </div>

        {/* Desktop: Horizontal Accordion */}
        <div
          className="hidden md:flex"
          style={{
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
                  setHoveredId(svc.id);
                  if (!isActive) {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  }
                }}
                onMouseLeave={(e) => {
                  setHoveredId((h) => (h === svc.id ? null : h));
                  setReadyId((r) => (r === svc.id ? null : r));
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

                        {/* Hover preview — mounts only on hover, sits directly over
                            the still with identical geometry so there is no jump.
                            The opaque fill gives `screen` a backdrop to blend onto. */}
                        {hoveredId === svc.id && !isActive && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              backgroundColor: "#080808",
                              /* Held transparent until the video can actually play.
                                 The fill is opaque, so revealing it immediately hid
                                 the still and left the card blank while loading. */
                              opacity: readyId === svc.id ? 1 : 0,
                              transition: "opacity 0.25s ease",
                            }}
                          >
                            <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="auto"
                              key={`hover-${svc.id}`}
                              onCanPlay={() => setReadyId(svc.id)}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                objectPosition: "center",
                                padding: "1.5rem",
                                mixBlendMode: "screen",
                              }}
                            >
                              <source src={svc.videoMov} type="video/mp4; codecs=hvc1" />
                              <source src={svc.videoWebm} type="video/webm; codecs=vp9" />
                            </video>
                          </div>
                        )}
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
                            color: "#ffffff",
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
                          color: "rgba(255,255,255,0.65)",
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
                      /* Must match the card's effective colour exactly — the card is
                         rgba(255,255,255,0.03) over #000, i.e. rgb(8,8,8). This also
                         gives the video's `screen` blend a backdrop to work against:
                         the wrapper's z-index creates its own stacking context, so
                         without a fill here the blend has nothing to composite onto
                         and the footage's black stays black. */
                      backgroundColor: "#080808",
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
                          /* The footage carries a baked-in black background.
                             Screen blending drops pure black to nothing, so the
                             card shows through instead of a dark rectangle. */
                          mixBlendMode: "screen",
                        }}
                      >
                        <source src={svc.videoMov} type="video/mp4; codecs=hvc1" />
                        <source src={svc.videoWebm} type="video/webm; codecs=vp9" />
                      </video>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile: Vertical Accordion */}
        <div className="flex md:hidden flex-col gap-3">
          {services.map((svc) => {
            const isActive = activeId === svc.id;
            return (
              <div
                key={svc.id}
                onClick={() => setActiveId(isActive ? null : svc.id)}
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: `1px solid ${isActive ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.08)"}`,
                  borderRadius: "14px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {/* Header row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.25rem 1.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: '"PP Neue Montreal", sans-serif',
                      fontWeight: 500,
                      fontSize: "1rem",
                      color: "#ffffff",
                    }}
                  >
                    {svc.label}
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "1.3rem",
                      lineHeight: 1,
                      transform: isActive ? "rotate(45deg)" : "none",
                      transition: "transform 0.3s ease",
                      display: "block",
                    }}
                  >
                    +
                  </span>
                </div>

                {/* Expandable body */}
                {isActive && (
                  <div style={{ padding: "0 1.5rem 1.5rem" }}>
                    {/* Image */}
                    <div
                      style={{
                        position: "relative",
                        height: "200px",
                        marginBottom: "1.25rem",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={svc.image}
                        alt={svc.imageAlt}
                        fill
                        sizes="90vw"
                        style={{ objectFit: "contain", padding: "1rem" }}
                      />
                    </div>

                    <p
                      style={{
                        fontFamily: '"PP Neue Montreal", sans-serif',
                        fontSize: "0.85rem",
                        color: "rgba(255,255,255,0.5)",
                        lineHeight: 1.65,
                        marginBottom: "1.25rem",
                      }}
                    >
                      {svc.description}
                    </p>

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
                          style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
                        >
                          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", flexShrink: 0 }}>→</span>
                          <span
                            style={{
                              fontFamily: '"PP Neue Montreal", sans-serif',
                              fontSize: "0.8rem",
                              color: "rgba(255,255,255,0.7)",
                            }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
