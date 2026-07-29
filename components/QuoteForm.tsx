"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const copy = {
  en: {
    tag: "[ Start A Project ]",
    heading: "Request A Quote",
    body: "Tell us about your brand and what you're trying to achieve. We'll get back to you within 1-2 business days.",
    fields: {
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      company: "Company",
      service: "Service",
      message: "Message (optional)",
    },
    servicePlaceholder: "Select a service",
    services: ["Social Media Strategy", "Influencer Projects", "Performance Marketing", "Other"],
    submit: "SEND REQUEST →",
    submitting: "SENDING…",
    successTitle: "Thanks — message sent.",
    successBody: "We'll be in touch shortly.",
  },
  fr: {
    tag: "[ Démarrer Un Projet ]",
    heading: "Demander Un Devis",
    body: "Parlez-nous de votre marque et de vos objectifs. Nous vous répondrons sous 1 à 2 jours ouvrés.",
    fields: {
      name: "Nom Complet",
      email: "E-mail",
      phone: "Téléphone",
      company: "Entreprise",
      service: "Service",
      message: "Message (facultatif)",
    },
    servicePlaceholder: "Sélectionnez un service",
    services: [
      "Stratégie Social Media",
      "Projets d'Influence",
      "Marketing de la Performance",
      "Autre",
    ],
    submit: "ENVOYER LA DEMANDE →",
    submitting: "ENVOI…",
    successTitle: "Merci — message envoyé.",
    successBody: "Nous vous répondrons rapidement.",
  },
};

const inputStyle: React.CSSProperties = {
  fontFamily: '"PP Neue Montreal", sans-serif',
  fontSize: "0.95rem",
  color: "#000",
  backgroundColor: "rgba(0,0,0,0.03)",
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: "10px",
  padding: "0.85rem 1rem",
  width: "100%",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const labelStyle: React.CSSProperties = {
  fontFamily: '"PP Supply Mono", monospace',
  fontSize: "0.68rem",
  letterSpacing: "0.08em",
  color: "rgba(0,0,0,0.5)",
  textTransform: "uppercase",
  marginBottom: "0.5rem",
  display: "block",
};

export default function QuoteForm() {
  const { lang } = useLanguage();
  const t = copy[lang];
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    // TODO: wire this up to a real submission endpoint (Vercel function / form service)
    // once the backend is connected. For now this just simulates a request.
    setTimeout(() => {
      setStatus("sent");
      e.currentTarget.reset();
    }, 600);
  };

  return (
    <section
      id="quote"
      style={{
        backgroundColor: "transparent",
        padding: "2rem 2rem 8rem",
      }}
    >
      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <p
          style={{
            fontFamily: '"PP Supply Mono", monospace',
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            color: "rgba(0,0,0,0.45)",
            textTransform: "uppercase",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          {t.tag}
        </p>
        <h2
          style={{
            fontFamily: '"PP Neue Montreal", sans-serif',
            fontWeight: 600,
            fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            letterSpacing: "-0.02em",
            color: "#000",
            lineHeight: 1.1,
            marginBottom: "0.9rem",
            textAlign: "center",
          }}
        >
          {t.heading}
        </h2>
        <p
          style={{
            fontFamily: '"PP Neue Montreal", sans-serif',
            fontSize: "1rem",
            color: "rgba(0,0,0,0.55)",
            lineHeight: 1.6,
            marginBottom: "2.5rem",
            textAlign: "center",
          }}
        >
          {t.body}
        </p>

        {status === "sent" ? (
          <div
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: "14px",
              padding: "2.5rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                fontWeight: 600,
                fontSize: "1.2rem",
                color: "#000",
                marginBottom: "0.5rem",
              }}
            >
              {t.successTitle}
            </p>
            <p
              style={{
                fontFamily: '"PP Neue Montreal", sans-serif',
                fontSize: "0.95rem",
                color: "rgba(0,0,0,0.55)",
              }}
            >
              {t.successBody}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label style={labelStyle} htmlFor="quote-name">{t.fields.name}</label>
                <input id="quote-name" name="name" type="text" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="quote-email">{t.fields.email}</label>
                <input id="quote-email" name="email" type="email" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="quote-phone">{t.fields.phone}</label>
                <input id="quote-phone" name="phone" type="tel" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="quote-company">{t.fields.company}</label>
                <input id="quote-company" name="company" type="text" style={inputStyle} />
              </div>
            </div>

            <div className="mb-4">
              <label style={labelStyle} htmlFor="quote-service">{t.fields.service}</label>
              <select id="quote-service" name="service" required defaultValue="" style={inputStyle}>
                <option value="" disabled>{t.servicePlaceholder}</option>
                {t.services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label style={labelStyle} htmlFor="quote-message">{t.fields.message}</label>
              <textarea id="quote-message" name="message" rows={4} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                disabled={status === "submitting"}
                style={{
                  fontFamily: '"PP Neue Montreal", sans-serif',
                  fontWeight: 600,
                  fontSize: "1rem",
                  letterSpacing: "0.03em",
                  color: "#ffffff",
                  backgroundColor: "#111111",
                  borderRadius: "2rem",
                  padding: "1rem 2.5rem",
                  border: "none",
                  cursor: status === "submitting" ? "default" : "pointer",
                  opacity: status === "submitting" ? 0.6 : 1,
                  transition: "background-color 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (status !== "submitting") e.currentTarget.style.backgroundColor = "#333333";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#111111";
                }}
              >
                {status === "submitting" ? t.submitting : t.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
