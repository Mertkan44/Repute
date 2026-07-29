'use client'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/lib/LanguageContext'

function LiveClock({ timezone }: { timezone: string }) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      )
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [timezone])
  return <>{time}</>
}

function scrollTo(href: string) {
  if (!href.startsWith('#')) return
  const el = document.querySelector(href)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const copy = {
  en: {
    home: 'HOME',
    work: 'WHAT WE DO',
    about: 'WHO WE ARE',
    contact: "LET'S BE FRIENDS",
    menuAria: 'Toggle menu',
  },
  fr: {
    home: 'ACCUEIL',
    work: 'EXPERTISES',
    about: 'LE STUDIO',
    contact: 'PARLONS DE VOTRE PROJET',
    menuAria: 'Basculer le menu',
  },
}

const clocks = [
  { timezone: 'Europe/Istanbul', label: 'IST', active: true },
  { timezone: 'Europe/London', label: 'LON' },
  { timezone: 'America/New_York', label: 'NYC' },
]

const linkClass =
  'flex items-center gap-2 text-white/80 text-[11.5px] font-light tracking-[0.14em] uppercase leading-[2.1] hover:text-white transition-colors duration-200 cursor-pointer'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang } = useLanguage()
  const t = copy[lang]

  const navLeft = [{ label: t.home, href: '#home', active: true }, { label: t.work, href: '#work' }]
  const navCenter = [{ label: t.about, href: '#about' }, { label: t.contact, href: '#quote' }]

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    scrollTo(href)
    setMenuOpen(false)
  }

  const LangToggle = ({ className = '' }: { className?: string }) => (
    <div className={`flex items-center gap-1.5 text-[11px] font-light tracking-[0.14em] ${className}`}>
      <button
        onClick={() => setLang('en')}
        className={`transition-colors duration-200 cursor-pointer ${lang === 'en' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
      >
        EN
      </button>
      <span className="text-white/25">/</span>
      <button
        onClick={() => setLang('fr')}
        className={`transition-colors duration-200 cursor-pointer ${lang === 'fr' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
      >
        FR
      </button>
    </div>
  )

  return (
    <>
      {/* ─── Desktop header ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 hidden md:grid grid-cols-4 px-10 pt-7 pb-0 items-start"
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      >
        {/* Logo */}
        <a href="#home" onClick={(e) => handleClick(e, '#home')} className="flex items-center gap-2.5 pt-px">
          <span className="text-white text-[13px] font-light tracking-[0.14em] uppercase">Repute</span>
          <span className="text-white/25 font-thin select-none text-sm">|</span>
          <span className="text-white/55 text-[11px] font-light tracking-[0.22em] uppercase">agency</span>
        </a>

        {/* Primary nav */}
        <nav className="flex flex-col">
          {navLeft.map((item) => (
            <a key={item.label} href={item.href} className={linkClass} onClick={(e) => handleClick(e, item.href)}>
              {item.active && <span className="text-white/50 text-[8px] leading-none">▶</span>}
              {item.label}
            </a>
          ))}
        </nav>

        {/* Secondary nav */}
        <nav className="flex flex-col">
          {navCenter.map((item) => (
            <a key={item.label} href={item.href} className={linkClass} onClick={(e) => handleClick(e, item.href)}>
              {item.label}
            </a>
          ))}
        </nav>

        {/* Clocks + language toggle */}
        <div className="flex flex-col items-end gap-2">
          {clocks.map((c) => (
            <span key={c.timezone} className={linkClass}>
              {c.active && <span className="text-white/50 text-[8px] leading-none">▶</span>}
              <span className="font-mono tabular-nums">
                <LiveClock timezone={c.timezone} />
              </span>
            </span>
          ))}
          <LangToggle className="mt-1" />
        </div>
      </header>

      {/* ─── Mobile header bar ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-5 pt-5 pb-4"
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      >
        <a href="#home" onClick={(e) => handleClick(e, '#home')} className="flex items-center gap-2.5">
          <span className="text-white text-[13px] font-light tracking-[0.14em] uppercase">Repute</span>
          <span className="text-white/25 font-thin select-none text-sm">|</span>
          <span className="text-white/55 text-[11px] font-light tracking-[0.22em] uppercase">agency</span>
        </a>

        <div className="flex items-center gap-4">
          <LangToggle />
          {/* Hamburger button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex flex-col justify-center gap-[5px] w-8 h-8 -mr-1"
            aria-label={t.menuAria}
          >
            <span
              className="block h-px bg-white origin-center transition-all duration-300"
              style={{
                width: '20px',
                transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none',
              }}
            />
            <span
              className="block h-px bg-white transition-all duration-300"
              style={{
                width: '20px',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px bg-white origin-center transition-all duration-300"
              style={{
                width: '20px',
                transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none',
              }}
            />
          </button>
        </div>
      </header>

      {/* ─── Mobile full-screen menu ─── */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col transition-all duration-300"
        style={{
          background: '#000',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
        }}
      >
        {/* Nav links */}
        <nav className="flex flex-col flex-1 justify-center px-6 gap-1">
          {[...navLeft, ...navCenter].map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="py-3 border-b border-white/10 last:border-none transition-colors duration-200 hover:text-white"
              style={{
                fontFamily: '"PP Neue Montreal", "Neue Montreal", -apple-system, sans-serif',
                fontSize: 'clamp(1.4rem, 6vw, 2.2rem)',
                fontWeight: 300,
                letterSpacing: '0.06em',
                color: i === 0 ? '#fff' : 'rgba(255,255,255,0.65)',
                textTransform: 'uppercase',
                transitionDelay: menuOpen ? `${i * 40}ms` : '0ms',
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Clocks row at bottom */}
        <div className="flex gap-8 px-6 pb-10 pt-4 border-t border-white/10">
          {clocks.map((c) => (
            <div key={c.timezone}>
              <div
                style={{
                  fontFamily: '"PP Supply Mono", monospace',
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  marginBottom: '2px',
                }}
              >
                {c.label}
              </div>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                <LiveClock timezone={c.timezone} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
