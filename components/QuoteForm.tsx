"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const ACCENT = "#D4410B";

const copy = {
  en: {
    sectionLabel: "[ START A PROJECT ] ↓",
    heading: "Let's build your growth.",
    body: "Tell us what you're working on and where you want to take it. No forms-into-the-void — a real person reads every one of these.",
    cards: {
      emailLabel: "Email",
      studioLabel: "Studio",
      studioValue: "Bebek, Istanbul",
      responseLabel: "Availability",
      responseValue: "Taking on new projects",
    },
    fields: {
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      service: "Service",
      message: "Message",
      optional: "Optional",
    },
    servicePlaceholder: "Select a service",
    services: ["Social Media Strategy", "Influencer Projects", "Performance Marketing", "Other"],
    submit: "Send Request",
    submitting: "Sending",
    successTitle: "Request received.",
    successBody: "Thanks — we'll be in touch within 1–2 business days.",
    successAgain: "Send another →",
  },
  fr: {
    sectionLabel: "[ DÉMARRER UN PROJET ] ↓",
    heading: "Construisons votre croissance.",
    body: "Dites-nous sur quoi vous travaillez et où vous voulez aller. Pas de formulaire dans le vide — une vraie personne lit chaque message.",
    cards: {
      emailLabel: "E-mail",
      studioLabel: "Studio",
      studioValue: "Bebek, Istanbul",
      responseLabel: "Disponibilité",
      responseValue: "Ouverts aux nouveaux projets",
    },
    fields: {
      name: "Nom Complet",
      email: "E-mail",
      phone: "Téléphone",
      company: "Entreprise",
      service: "Service",
      message: "Message",
      optional: "Facultatif",
    },
    servicePlaceholder: "Sélectionnez un service",
    services: [
      "Stratégie Social Media",
      "Projets d'Influence",
      "Marketing de la Performance",
      "Autre",
    ],
    submit: "Envoyer La Demande",
    submitting: "Envoi",
    successTitle: "Demande reçue.",
    successBody: "Merci — nous revenons vers vous sous 1 à 2 jours ouvrés.",
    successAgain: "Envoyer un autre →",
  },
};

const EMAIL = "hello@wearerepute.com";

const cardStyle: React.CSSProperties = {
  backgroundColor: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
};

const monoLabel: React.CSSProperties = {
  fontFamily: '"PP Supply Mono", monospace',
  fontSize: "0.62rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.4)",
};

const inputStyle: React.CSSProperties = {
  fontFamily: '"PP Neue Montreal", sans-serif',
  fontSize: "0.9rem",
  color: "#fff",
  backgroundColor: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  padding: "0.8rem 0.95rem",
  width: "100%",
  outline: "none",
  colorScheme: "dark",
  transition: "border-color 0.25s ease, background-color 0.25s ease, box-shadow 0.25s ease",
};

function Field({
  label,
  hint,
  htmlFor,
  children,
}: {
  label: string;
  hint?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "0.5rem",
          marginBottom: "0.5rem",
        }}
      >
        <span style={{ ...monoLabel, color: "rgba(255,255,255,0.5)" }}>{label}</span>
        {hint && (
          <span style={{ ...monoLabel, fontSize: "0.56rem", color: "rgba(255,255,255,0.22)" }}>
            ({hint})
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

export default function QuoteForm() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  /* Reveal on scroll — one staggered entrance, matching the site's restrained motion.
     Fail-safe: a timer always reveals the form even if the observer never fires,
     so this section can never be stranded invisible. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setRevealed(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    const failsafe = setTimeout(() => setRevealed(true), 2500);
    return () => {
      io.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  const focusOn = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(212,65,11,0.85)";
    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.055)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,65,11,0.13)";
  };
  const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.03)";
    e.currentTarget.style.boxShadow = "none";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("submitting");
    // TODO: wire to a real endpoint (Vercel function / form service) once the backend exists.
    setTimeout(() => {
      setStatus("sent");
      form.reset();
    }, 700);
  };

  /* Staggered reveal helper */
  const rise = (i: number): React.CSSProperties => ({
    opacity: revealed ? 1 : 0,
    transform: revealed ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`,
  });

  const infoCards = [
    {
      label: t.cards.emailLabel,
      value: EMAIL,
      href: `mailto:${EMAIL}`,
      dot: null as string | null,
    },
    { label: t.cards.studioLabel, value: t.cards.studioValue, href: null, dot: null },
    { label: t.cards.responseLabel, value: t.cards.responseValue, href: null, dot: "#22C55E" },
  ];

  return (
    <section
      ref={sectionRef}
      id="quote"
      className="px-6 md:px-10 lg:px-14"
      style={{
        backgroundColor: "#000",
        paddingTop: "1rem",
        paddingBottom: "5.5rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Section label */}
        <p
          style={{
            ...monoLabel,
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "2rem",
            ...rise(0),
          }}
        >
          {t.sectionLabel}
        </p>

        {/* Heading + intro */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between"
          style={{ gap: "1.5rem", marginBottom: "2rem", ...rise(1) }}
        >
          <h2
            style={{
              fontFamily: '"PP Neue Montreal", sans-serif',
              fontWeight: 500,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.025em",
              color: "#fff",
              lineHeight: 1.05,
              maxWidth: "12ch",
            }}
          >
            {t.heading}
          </h2>
          <p
            style={{
              fontFamily: '"PP Neue Montreal", sans-serif',
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.65,
              maxWidth: "420px",
            }}
          >
            {t.body}
          </p>
        </div>

        {/* Bento: info column + form card */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2.6fr] gap-3">
          {/* ── Info cards — echoes the stat-card rhythm above ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-3">
            {infoCards.map((c, i) => {
              const inner = (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", marginBottom: "0.55rem" }}>
                    {c.dot && (
                      <span
                        className="quote-dot"
                        style={{
                          width: "6px",
                          height: "6px",
                          borderRadius: "50%",
                          backgroundColor: c.dot,
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <span style={monoLabel}>{c.label}</span>
                  </div>
                  <div
                    style={{
                      fontFamily: '"PP Neue Montreal", sans-serif',
                      fontSize: "0.95rem",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.92)",
                      letterSpacing: "-0.01em",
                      lineHeight: 1.35,
                      wordBreak: "break-word",
                    }}
                  >
                    {c.value}
                  </div>
                </>
              );

              const boxStyle: React.CSSProperties = {
                ...cardStyle,
                padding: "1.35rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flex: 1,
                textDecoration: "none",
                transition: "border-color 0.25s ease, background-color 0.25s ease",
                ...rise(2 + i),
              };

              return c.href ? (
                <a
                  key={c.label}
                  href={c.href}
                  style={boxStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(212,65,11,0.5)";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                  }}
                >
                  {inner}
                </a>
              ) : (
                <div key={c.label} style={boxStyle}>
                  {inner}
                </div>
              );
            })}
          </div>

          {/* ── Form card ── */}
          <div
            style={{
              ...cardStyle,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.025) 100%)",
              padding: "2rem",
              position: "relative",
              overflow: "hidden",
              ...rise(3),
            }}
          >
            {status === "sent" ? (
              <div
                className="flex flex-col items-center justify-center text-center"
                style={{ minHeight: "340px", padding: "1rem" }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    border: `1px solid ${ACCENT}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5">
                    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p
                  style={{
                    fontFamily: '"PP Neue Montreal", sans-serif',
                    fontWeight: 600,
                    fontSize: "1.35rem",
                    letterSpacing: "-0.02em",
                    color: "#fff",
                    marginBottom: "0.6rem",
                  }}
                >
                  {t.successTitle}
                </p>
                <p
                  style={{
                    fontFamily: '"PP Neue Montreal", sans-serif',
                    fontSize: "0.92rem",
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.6,
                    maxWidth: "34ch",
                    marginBottom: "1.75rem",
                  }}
                >
                  {t.successBody}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  style={{
                    ...monoLabel,
                    fontSize: "0.68rem",
                    color: "rgba(255,255,255,0.6)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.4rem",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                >
                  {t.successAgain}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 mb-4">
                  <Field label={t.fields.name} htmlFor="quote-name">
                    <input id="quote-name" name="name" type="text" required autoComplete="name"
                      style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                  </Field>
                  <Field label={t.fields.email} htmlFor="quote-email">
                    <input id="quote-email" name="email" type="email" required autoComplete="email"
                      style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                  </Field>
                  <Field label={t.fields.phone} htmlFor="quote-phone">
                    <input id="quote-phone" name="phone" type="tel" required autoComplete="tel"
                      style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                  </Field>
                  <Field label={t.fields.company} hint={t.fields.optional} htmlFor="quote-company">
                    <input id="quote-company" name="company" type="text" autoComplete="organization"
                      style={inputStyle} onFocus={focusOn} onBlur={focusOff} />
                  </Field>
                </div>

                <div className="mb-4">
                  <Field label={t.fields.service} htmlFor="quote-service">
                    <select id="quote-service" name="service" required defaultValue=""
                      style={inputStyle} onFocus={focusOn} onBlur={focusOff}>
                      <option value="" disabled style={{ color: "#777", background: "#111" }}>
                        {t.servicePlaceholder}
                      </option>
                      {t.services.map((s) => (
                        <option key={s} value={s} style={{ color: "#fff", background: "#111" }}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="mb-6">
                  <Field label={t.fields.message} hint={t.fields.optional} htmlFor="quote-message">
                    <textarea id="quote-message" name="message" rows={4}
                      style={{ ...inputStyle, resize: "vertical", minHeight: "104px" }}
                      onFocus={focusOn} onBlur={focusOff} />
                  </Field>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  style={{
                    fontFamily: '"PP Supply Mono", monospace',
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#fff",
                    backgroundColor: ACCENT,
                    borderRadius: "2rem",
                    padding: "0.95rem 2.1rem",
                    border: "none",
                    cursor: status === "submitting" ? "wait" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease, opacity 0.2s ease",
                    opacity: status === "submitting" ? 0.75 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (status === "submitting") return;
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 14px 34px rgba(212,65,11,0.34)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {status === "submitting" ? t.submitting : t.submit}
                  <span className={status === "submitting" ? "quote-ellipsis" : undefined}>
                    {status === "submitting" ? "" : "→"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        #quote input::placeholder,
        #quote textarea::placeholder { color: rgba(255,255,255,0.25); }
        #quote .quote-dot { animation: quotePulse 2.4s ease-in-out infinite; }
        @keyframes quotePulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34,197,94,0.45); }
          50% { opacity: 0.75; box-shadow: 0 0 0 4px rgba(34,197,94,0); }
        }
        #quote .quote-ellipsis::after {
          content: "";
          animation: quoteDots 1.2s steps(4, end) infinite;
        }
        @keyframes quoteDots {
          0% { content: ""; }
          25% { content: "."; }
          50% { content: ".."; }
          75% { content: "..."; }
        }
        @media (prefers-reduced-motion: reduce) {
          #quote .quote-dot, #quote .quote-ellipsis::after { animation: none; }
        }
      `}</style>
    </section>
  );
}
