'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import GradientCanvas from './GradientCanvas'
import { useLanguage } from '@/lib/LanguageContext'

type Segment = { text: string; weight: 'light' | 'semi' }
type Phrase = { en: Segment[][]; fr: Segment[][] }

const phrases: Phrase[] = [
  {
    en: [
      [{ text: 'We mix the ', weight: 'light' }, { text: 'emotional', weight: 'semi' }],
      [{ text: 'with the ', weight: 'light' }, { text: 'rational.', weight: 'semi' }],
    ],
    fr: [
      [{ text: 'À la croisée de ', weight: 'light' }, { text: "l'émotion", weight: 'semi' }],
      [{ text: 'et de la ', weight: 'light' }, { text: 'raison.', weight: 'semi' }],
    ],
  },
  {
    en: [
      [{ text: 'We make your', weight: 'light' }],
      [{ text: 'story ', weight: 'semi' }, { text: 'stand out.', weight: 'light' }],
    ],
    fr: [
      [{ text: 'Nous donnons à votre', weight: 'light' }],
      [{ text: 'histoire ', weight: 'semi' }, { text: 'son attention.', weight: 'light' }],
    ],
  },
  {
    en: [
      [{ text: 'Grow where', weight: 'light' }],
      [{ text: 'attention ', weight: 'semi' }, { text: 'goes.', weight: 'light' }],
    ],
    fr: [
      [{ text: "Là où va l'", weight: 'light' }, { text: 'attention,', weight: 'semi' }],
      [{ text: 'la ', weight: 'light' }, { text: 'croissance suit.', weight: 'semi' }],
    ],
  },
]

const bottomBar = {
  en: [
    ['Born in Istanbul', 'Working worldwide.'],
    ['Your creative', 'growth partner.'],
    ['Social media, strategy', '& content factory.'],
  ],
  fr: [
    ['Basée à Istanbul', 'Présente dans le monde entier.'],
    ['Votre partenaire', 'en croissance créative.'],
    ['Réseaux sociaux, stratégie', '& production de contenus.'],
  ],
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function Hero() {
  const { lang } = useLanguage()
  const [index, setIndex] = useState(0)
  const cursorRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.72 : 900,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.42 : 340,
  })
  const lensRef = useRef({ x: 0, y: 0 })
  const [, forceTick] = useState(0)
  const nowRef = useRef(0)
  const [hasMouse, setHasMouse] = useState(false)
  const [viewport, setViewport] = useState({ w: 1280, h: 800 })
  const [isHeroVisible, setIsHeroVisible] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }
      if (!hasMouse) setHasMouse(true)
    }
    const resize = () => setViewport({ w: window.innerWidth, h: window.innerHeight })
    resize()
    window.addEventListener('mousemove', move)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('resize', resize)
    }
  }, [hasMouse])

  useEffect(() => {
    let raf = 0
    let lastScrollY = -1
    let lastVisible: boolean | null = null
    let inViewport = true
    const run = (t: number) => {
      nowRef.current = t
      const c = cursorRef.current
      const l = lensRef.current
      const nx = l.x + (c.x - l.x) * 0.30
      const ny = l.y + (c.y - l.y) * 0.30
      const dx = nx - l.x
      const dy = ny - l.y
      lensRef.current = { x: nx, y: ny }

      const sy = window.scrollY
      const scrollChanged = Math.abs(sy - lastScrollY) > 0.5
      const lensChanged = Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15

      let visibleChanged = false
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        const visible = rect.bottom > window.innerHeight * 0.5
        if (visible !== lastVisible) {
          lastVisible = visible
          visibleChanged = true
          setIsHeroVisible(visible)
        }
      }

      if (scrollChanged) {
        lastScrollY = sy
        setScrollY(sy)
      } else if (lensChanged && !visibleChanged) {
        forceTick((n) => (n + 1) % 1000000)
      }

      if (inViewport) raf = requestAnimationFrame(run)
      else raf = 0
    }

    const start = () => {
      if (!raf) raf = requestAnimationFrame(run)
    }

    let io: IntersectionObserver | null = null
    if (sectionRef.current) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            inViewport = e.isIntersecting
            if (inViewport) start()
            else if (lastVisible !== false) {
              lastVisible = false
              setIsHeroVisible(false)
            }
          }
        },
        { threshold: 0 }
      )
      io.observe(sectionRef.current)
    }

    raf = requestAnimationFrame(run)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      io?.disconnect()
    }
  }, [])

  const x = cursorRef.current.x
  const y = cursorRef.current.y
  const lx = lensRef.current.x
  const ly = lensRef.current.y
  const t = nowRef.current


  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), 10000)
    return () => clearInterval(id)
  }, [])


  const LENS_SIZE = 260
  const LENS_ZOOM = 1.16

  /* The lens is a translation window: it reveals the phrase in the *other*
     language, so EN shows FR underneath and FR shows EN. */
  const altLang = lang === 'en' ? 'fr' : 'en'

  /* The 2rem floor is the ceiling in practice: at 375px the longest French line
     ("À la croisée de l'émotion") needs 327px of the 327px available, so anything
     larger wraps it to a third line. Above ~533px the vw term takes over. */
  const lineClass = 'text-white text-[clamp(2rem,6vw,5.6rem)] font-display leading-[1.02] tracking-[-0.02em]'
  const renderPhrase = (lines: Phrase['en'], color = 'white') =>
    lines.map((line, li) => (
      <div key={li} className={lineClass} style={color !== 'white' ? { color } : undefined}>
        {line.map((seg, si) => (
          <span key={si} className={seg.weight === 'semi' ? 'font-semibold' : 'font-light'}>
            {seg.text}
          </span>
        ))}
      </div>
    ))

  /* The lens is a pointer-driven effect; on touch it either never fires or
     sticks wherever the last tap landed, so it is off below the md breakpoint. */
  const lensActive =
    viewport.w >= 768 &&
    isHeroVisible &&
    hasMouse &&
    y > 110 &&
    y < viewport.h - 220 &&
    x > 40 &&
    x < viewport.w - 40

  // Cursor always visible

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden bg-black flex flex-col">
      {/* WebGL gradient canvas */}
      <GradientCanvas mouseRef={cursorRef} />

      {/* Grain — overlay pass */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
          opacity: 0.60,
          mixBlendMode: 'overlay',
        }}
      />
      {/* Grain — screen pass (highlights) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n2)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '140px 140px',
          opacity: 0.11,
          mixBlendMode: 'screen',
        }}
      />

      {/* Layout spacer — pushes bottom bar down */}
      <div className="flex-1" />

      {/* Bottom bar */}
      <div className="relative z-20 px-6 md:px-10 lg:px-14 pb-8 pt-6">
        <div
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
          style={{ maxWidth: '1280px', margin: '0 auto' }}
        >
          <div>
            <p className="text-white/90 text-sm tracking-tight font-medium">{bottomBar[lang][0][0]}</p>
            <p className="text-white/50 text-sm tracking-tight">{bottomBar[lang][0][1]}</p>
          </div>
          <div className="hidden md:block text-center">
            <p className="text-white/90 text-sm tracking-tight font-medium">{bottomBar[lang][1][0]}</p>
            <p className="text-white/50 text-sm tracking-tight">{bottomBar[lang][1][1]}</p>
          </div>
          <div className="text-right">
            <p className="text-white/90 text-sm tracking-tight font-medium">{bottomBar[lang][2][0]}</p>
            <p className="text-white/50 text-sm tracking-tight">{bottomBar[lang][2][1]}</p>
          </div>
        </div>
      </div>

      {/* Base headline — absolute overlay, viewport-aligned */}
      <div
        className="absolute inset-0 flex items-center justify-center px-4 md:px-6 pt-28 pb-32 z-10 pointer-events-none"
        style={
          lensActive
            ? {
                WebkitMaskImage: `radial-gradient(circle ${LENS_SIZE / 2}px at ${lx}px ${ly + scrollY}px, transparent 99%, black 100%)`,
                maskImage: `radial-gradient(circle ${LENS_SIZE / 2}px at ${lx}px ${ly + scrollY}px, transparent 99%, black 100%)`,
              }
            : undefined
        }
      >
        <div key={`${lang}-${index}`} className="text-center phrase-enter">
          {renderPhrase(phrases[index][lang])}
        </div>
      </div>

      {/* Magnifying lens — crisp white center + chromatic aberration ring at lens edge */}
      {lensActive && (() => {
        const LENS_R = LENS_SIZE / 2
        const ringInner = LENS_R * 0.80
        const ringFade = LENS_R * 0.93
        const circleClip = `circle(${LENS_R}px at ${lx}px ${ly + scrollY}px)`
        const ringMask = `radial-gradient(circle ${LENS_R}px at ${lx}px ${ly + scrollY}px, transparent 0px, transparent ${ringInner}px, black ${ringFade}px, black ${LENS_R}px)`

        const renderLines = (color: string) => renderPhrase(phrases[index][altLang], color)

        const fringeLayer = (dx: number, color: string) => (
          <div
            className="absolute inset-0 flex items-center justify-center px-4 md:px-6 pt-28 pb-32 z-20 pointer-events-none"
            style={{
              clipPath: circleClip,
              WebkitClipPath: circleClip,
              WebkitMaskImage: ringMask,
              maskImage: ringMask,
            }}
          >
            <div
              className="text-center"
              style={{
                transform: `scale(${LENS_ZOOM}) translateX(${dx}px)`,
                mixBlendMode: 'screen',
              }}
            >
              {renderLines(color)}
            </div>
          </div>
        )

        return (
          <>
            {/* Base white text inside full lens circle */}
            <div
              className="absolute inset-0 flex items-center justify-center px-4 md:px-6 pt-28 pb-32 z-20 pointer-events-none"
              style={{ clipPath: circleClip, WebkitClipPath: circleClip }}
            >
              <div className="text-center" style={{ transform: `scale(${LENS_ZOOM})` }}>
                {renderLines('white')}
              </div>
            </div>

            {/* RGB chromatic fringes — only visible at the lens edge ring */}
            {fringeLayer(-3, 'rgb(255, 50, 80)')}
            {fringeLayer(-1.5, 'rgb(255, 200, 0)')}
            {fringeLayer(2, 'rgb(0, 240, 180)')}
            {fringeLayer(4, 'rgb(80, 140, 255)')}
          </>
        )
      })()}

      {/* Scroll arrow */}
      <div className="absolute bottom-8 right-8 z-10 pointer-events-none">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="text-white/60 text-2xl font-light"
        >
          ↓
        </motion.div>
      </div>

      {/* Glass lens visual (glassmorphism) */}
      {lensActive && (
        <div
          className="pointer-events-none fixed z-40 rounded-full"
          style={{
            left: lx - LENS_SIZE / 2,
            top: ly - LENS_SIZE / 2,
            width: LENS_SIZE,
            height: LENS_SIZE,
            border: '1.5px solid rgba(255,255,255,0.30)',
            boxShadow:
              '0 18px 60px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3), inset 0 0 18px rgba(0,0,0,0.28), inset 0 0 1px rgba(255,255,255,0.7)',
            backdropFilter: 'blur(0.3px) brightness(1.06) contrast(1.08) saturate(1.1)',
            WebkitBackdropFilter: 'blur(0.3px) brightness(1.06) contrast(1.08) saturate(1.1)',
            background:
              'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 35%, transparent 55%), radial-gradient(circle at 50% 50%, transparent 65%, rgba(0,0,0,0.22) 90%, rgba(0,0,0,0.35) 100%)',
            overflow: 'hidden',
          }}
        >
          {/* Glass highlight (top-left shine) */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              top: '7%',
              left: '12%',
              width: '42%',
              height: '28%',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)',
              filter: 'blur(3px)',
              transform: 'rotate(-25deg)',
            }}
          />
          {/* Secondary highlight (bottom-right subtle) */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              bottom: '12%',
              right: '18%',
              width: '22%',
              height: '14%',
              background:
                'radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%)',
              filter: 'blur(4px)',
            }}
          />
        </div>
      )}
    </section>
  )
}
