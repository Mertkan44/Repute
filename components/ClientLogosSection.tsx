"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

const label = {
  en: "( Partners In Crime )",
  fr: "( De Mèche )",
};

// Cut from the RE:PUTE 2026 deck (white-on-black), rendered black here via
// brightness(0). Heights are tuned per logo so they read at a similar weight.
const logos = [
  { name: "Acun Medya Akademi", src: "/images/clients/acunmedya.png", width: 92, height: 64 },
  { name: "TikTok", src: "/images/clients/tiktok.png", width: 113, height: 30 },
  { name: "Beylikdüzü Belediyesi", src: "/images/clients/beylikduzu.png", width: 60, height: 58 },
  { name: "Roberto Bravo", src: "/images/clients/roberto-bravo.png", width: 113, height: 40 },
  { name: "ASUS", src: "/images/clients/asus.png", width: 111, height: 28 },
  { name: "Garanti BBVA", src: "/images/clients/garanti-bbva.png", width: 133, height: 28 },
  { name: "The NewLab", src: "/images/clients/newlab.png", width: 118, height: 40 },
  { name: "Kebo", src: "/images/clients/kebo.png", width: 77, height: 52 },
  { name: "Kolektif House", src: "/images/clients/kolektif-house.png", width: 133, height: 18 },
  { name: "PIN Drinks", src: "/images/clients/pin-drinks.png", width: 104, height: 48 },
  { name: "hypers", src: "/images/clients/hypers.png", width: 107, height: 38 },
  { name: "Hilltown Cyprus", src: "/images/clients/hilltown.png", width: 72, height: 62 },
  { name: "Månensøl", src: "/images/clients/manensol.png", width: 117, height: 22 },
  { name: "RAICA", src: "/images/clients/raica.png", width: 114, height: 40 },
  { name: "meet2talk", src: "/images/clients/meet2talk.png", width: 137, height: 28 },
];

export default function ClientLogosSection() {
  const { lang } = useLanguage();
  return (
    <section
      id="logo-client"
      style={{
        backgroundColor: "#f5f0e9",
        padding: "80px 0",
        overflow: "hidden",
      }}
    >
      {/* Section header */}
      <div
        className="px-6 md:px-10 lg:px-14"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <p
            style={{
              fontFamily: '"PP Supply Mono", monospace',
              fontSize: "0.72rem",
              letterSpacing: "0.1em",
              color: "rgb(153, 153, 153)",
              margin: 0,
            }}
          >
            {label[lang]}
          </p>
          {/* Down arrow */}
          <svg
            width="15"
            height="12"
            viewBox="0 0 15 12"
            fill="none"
            style={{ flexShrink: 0 }}
          >
            <path
              d="M 3.44 0.149 L 1.85 1.655 C 1.64 1.854 1.64 2.177 1.85 2.376 L 4.711 5.085 C 4.823 5.192 4.743 5.374 4.584 5.374 L 0.538 5.374 C 0.241 5.374 0 5.602 0 5.884 L 0 8.014 C 0 8.296 0.241 8.524 0.538 8.524 L 4.584 8.524 C 4.744 8.524 4.823 8.706 4.711 8.813 L 1.85 11.522 C 1.64 11.721 1.64 12.044 1.85 12.243 L 3.441 13.749 C 3.651 13.948 3.992 13.948 4.202 13.749 L 10.99 7.321 C 11.2 7.122 11.2 6.8 10.991 6.601 L 4.202 0.15 C 3.992 -0.05 3.65 -0.05 3.44 0.149 Z"
              transform="translate(1.579 -1.315) rotate(90 5.5 7)"
              fill="rgb(153, 153, 153)"
            />
          </svg>
        </div>
      </div>

      {/* Marquee ticker */}
      <div
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Left fade mask — narrow on phones so it doesn't wash out the strip */}
        <div
          className="w-12 md:w-[200px]"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            background:
              "linear-gradient(to right, #f5f0e9 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        {/* Right fade mask — narrow on phones so it doesn't wash out the strip */}
        <div
          className="w-12 md:w-[200px]"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            background:
              "linear-gradient(to left, #f5f0e9 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        {/* Scrolling track */}
        <div
          className="marquee-track"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "150px",
            width: "max-content",
            animation: "marquee-scroll 51s linear infinite",
          }}
        >
          {/* First set */}
          {logos.map((logo) => (
            <div
              key={logo.name}
              style={{
                position: "relative",
                width: logo.width,
                height: logo.height,
                flexShrink: 0,
                filter: "brightness(0)",
              }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                style={{ objectFit: "contain" }}
                sizes={`${logo.width}px`}
              />
            </div>
          ))}

          {/* Duplicate set for seamless loop */}
          {logos.map((logo) => (
            <div
              key={`${logo.name}-dup`}
              aria-hidden
              style={{
                position: "relative",
                width: logo.width,
                height: logo.height,
                flexShrink: 0,
                filter: "brightness(0)",
              }}
            >
              <Image
                src={logo.src}
                alt=""
                fill
                style={{ objectFit: "contain" }}
                sizes={`${logo.width}px`}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
