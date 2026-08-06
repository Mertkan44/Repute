'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/lib/LanguageContext'

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

const linkClass =
  'flex items-center gap-2 text-white/80 text-[11.5px] font-light tracking-[0.14em] uppercase leading-[2.1] hover:text-white transition-colors duration-200 cursor-pointer'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { lang, setLang } = useLanguage()
  const t = copy[lang]

  const navLeft = [{ label: t.home, href: '#home', active: true }, { label: t.work, href: '#work' }]
  const navCenter = [{ label: t.about, href: '#about' }, { label: t.contact, href: '#quote' }]

  /* Past the hero the header crosses both cream and black sections, so white
     type alone is unreadable. Fade in a dark blurred backdrop once scrolled. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const backdrop: React.CSSProperties = scrolled
    ? {
        backgroundColor: 'rgba(8,8,8,0.72)',
        backdropFilter: 'blur(14px) saturate(1.2)',
        WebkitBackdropFilter: 'blur(14px) saturate(1.2)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }
    : {
        backgroundColor: 'transparent',
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
        borderBottom: '1px solid transparent',
      }

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
        className="fixed top-0 left-0 right-0 z-50 hidden md:block px-6 md:px-10 lg:px-14"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          paddingTop: scrolled ? '1.1rem' : '1.75rem',
          paddingBottom: scrolled ? '0.9rem' : '0',
          transition:
            'background-color 0.35s ease, backdrop-filter 0.35s ease, padding 0.35s ease, border-color 0.35s ease',
          ...backdrop,
        }}
      >
        {/* Logo left, nav genuinely centred, language right. An equal 4-column
            grid left the two nav blocks stranded at arbitrary offsets. */}
        <div
          className="grid items-center gap-8"
          style={{ maxWidth: '1280px', margin: '0 auto', gridTemplateColumns: '1fr auto 1fr' }}
        >
          {/* Logo */}
          <a href="#home" onClick={(e) => handleClick(e, '#home')} className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/logo-repute-white.png"
              alt="RÉPUTÉ"
              width={338}
              height={78}
              priority
              style={{ width: '118px', height: 'auto', display: 'block' }}
            />
            <span className="text-white/25 font-thin select-none text-sm">|</span>
            <span className="text-white/55 text-[11px] font-light tracking-[0.22em] uppercase">agency</span>
          </a>

          {/* Both nav groups as one centred cluster */}
          <div className="flex items-center gap-12 shrink-0">
            <nav className="flex flex-col">
              {navLeft.map((item) => (
                <a key={item.label} href={item.href} className={linkClass} onClick={(e) => handleClick(e, item.href)}>
                  {item.active && <span className="text-white/50 text-[8px] leading-none">▶</span>}
                  {item.label}
                </a>
              ))}
            </nav>

            <nav className="flex flex-col">
              {navCenter.map((item) => (
                <a key={item.label} href={item.href} className={linkClass} onClick={(e) => handleClick(e, item.href)}>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Language toggle */}
          <div className="flex items-center justify-end shrink-0">
            <LangToggle />
          </div>
        </div>
      </header>

      {/* ─── Mobile header bar ─── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 md:hidden flex items-center justify-between px-5 pt-5 pb-4"
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
          transition: 'background-color 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease',
          ...(menuOpen ? { backgroundColor: 'transparent', backdropFilter: 'none', borderBottom: '1px solid transparent' } : backdrop),
        }}
      >
        <a href="#home" onClick={(e) => handleClick(e, '#home')} className="flex items-center gap-2.5">
          <Image
            src="/images/logo-repute-white.png"
            alt="RÉPUTÉ"
            width={338}
            height={78}
            priority
            style={{ width: '104px', height: 'auto', display: 'block' }}
          />
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
      </div>
    </>
  )
}
