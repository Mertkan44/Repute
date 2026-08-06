"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";

const label = {
  en: "( Partners In Crime )",
  fr: "( De Mèche )",
};

const logos = [
  {
    name: "KIMFU",
    src: "/images/client-kimfu.png",
    width: 80,
    height: 34,
    filter: "invert(1)",
    href: "https://www.kimfuagence.com/",
  },
  {
    name: "Enzo Drew",
    src: "/images/client-enzo.png",
    width: 73,
    height: 44,
    filter: "invert(1)",
    href: "https://www.enzodrew.com",
  },
  {
    name: "SLASH Media House",
    src: "/images/client-slash.png",
    width: 130,
    height: 30,
    filter: "brightness(0)",
    href: "https://www.slashmediahouse.com/",
  },
  {
    name: "Boombox",
    src: "/images/client-boombox.svg",
    width: 130,
    height: 16,
    filter: "invert(1)",
    href: "https://www.boomboxgroup.com/",
  },
  {
    name: "FHG",
    src: "/images/client-fhg.png",
    width: 149,
    height: 38,
    filter: "brightness(0)",
    href: "#",
  },
  {
    name: "Major",
    src: "/images/client-glyf.svg",
    width: 96,
    height: 74,
    filter: "brightness(0)",
    href: "https://thiswasmajor.com",
  },
  {
    name: "Red Bull Media House",
    src: "/images/client-redbull.png",
    width: 95,
    height: 44,
    filter: "none",
    href: "https://www.redbullmediahouse.com/en/",
  },
  {
    name: "Workisplay",
    src: "/images/client-workisplay.svg",
    width: 169,
    height: 30,
    filter: "none",
    href: "https://workisplay.studio/",
  },
  {
    name: "Kastle",
    src: "/images/client-mom.svg",
    width: 150,
    height: 21,
    filter: "brightness(0)",
    href: "https://www.kastle.ai/",
  },
  {
    name: "ORKESTRA",
    src: "/images/client-orkestra.png",
    width: 149,
    height: 47,
    filter: "brightness(0)",
    href: "https://orkestra.ca/en/",
  },
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
        {/* Left fade mask */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "200px",
            background:
              "linear-gradient(to right, #f5f0e9 0%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        {/* Right fade mask */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            bottom: 0,
            width: "200px",
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
            animation: "marquee-scroll 35s linear infinite",
          }}
        >
          {/* First set */}
          {logos.map((logo) => (
            <a
              key={logo.name}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: logo.width,
                  height: logo.height,
                  filter: logo.filter !== "none" ? logo.filter : undefined,
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
            </a>
          ))}

          {/* Duplicate set for seamless loop */}
          {logos.map((logo) => (
            <a
              key={`${logo.name}-dup`}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: logo.width,
                  height: logo.height,
                  filter: logo.filter !== "none" ? logo.filter : undefined,
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
            </a>
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
