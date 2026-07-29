'use client'
import Link from 'next/link'

type Work = {
  title: string
  tags: string[]
  bg: string
}

const works: Work[] = [
  {
    title: 'Vakıfbank',
    tags: ['Sosyal Medya', 'İçerik Üretimi'],
    bg: 'linear-gradient(135deg, #1a1f3a 0%, #0d1024 100%)',
  },
  {
    title: 'Turkcell',
    tags: ['Marka Kimliği'],
    bg: 'linear-gradient(135deg, #2a1010 0%, #1a0808 100%)',
  },
  {
    title: 'Migros',
    tags: ['Dijital Pazarlama', 'Web'],
    bg: 'linear-gradient(135deg, #1a2e1a 0%, #0a180a 100%)',
  },
  {
    title: 'LC Waikiki',
    tags: ['Sosyal Medya', 'Kampanya'],
    bg: 'linear-gradient(135deg, #3a2a1a 0%, #1a1008 100%)',
  },
]

function WorkCard({ work, className = '' }: { work: Work; className?: string }) {
  return (
    <div
      className={`group relative overflow-hidden cursor-pointer rounded-sm ${className}`}
      style={{ background: work.bg }}
    >
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '180px 180px',
          mixBlendMode: 'overlay',
        }}
      />
      {/* Hover lighten */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500" />

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
        <h3 className="text-white text-xl md:text-2xl font-light tracking-tight mb-4">
          {work.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="text-white/80 text-[11px] font-light tracking-[0.08em] backdrop-blur-sm bg-white/10 border border-white/15 px-3.5 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function FeaturedWork() {
  return (
    <section className="bg-[#f1ebe0] px-6 md:px-10 py-20 md:py-28">
      {/* Header row */}
      <div className="flex items-start justify-between mb-12 md:mb-16">
        <h2 className="text-black text-[clamp(2.5rem,6vw,5rem)] font-display font-semibold tracking-tight leading-none flex items-center gap-4">
          Öne Çıkan İşler
          <span className="text-black/80 text-[0.7em]">↓</span>
        </h2>
        <Link
          href="/work"
          className="text-black/70 text-[11px] font-light tracking-[0.18em] uppercase flex items-center gap-2 hover:text-black transition-colors duration-200 mt-4"
        >
          TÜM İŞLER <span>→</span>
        </Link>
      </div>

      {/* Row 1: wide left (2fr) + narrow right (1fr) */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <WorkCard work={works[0]} className="col-span-2 h-[440px] md:h-[560px]" />
        <WorkCard work={works[1]} className="col-span-1 h-[440px] md:h-[560px]" />
      </div>

      {/* Row 2: narrow left (1fr) + wide right (2fr) — mirror */}
      <div className="grid grid-cols-3 gap-3">
        <WorkCard work={works[2]} className="col-span-1 h-[440px] md:h-[560px]" />
        <WorkCard work={works[3]} className="col-span-2 h-[440px] md:h-[560px]" />
      </div>
    </section>
  )
}
