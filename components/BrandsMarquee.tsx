'use client'

const brands = [
  { name: 'ARÇELİK',      cls: 'font-bold tracking-tight' },
  { name: 'Vakıfbank',    cls: 'font-light italic tracking-wide' },
  { name: 'TURKCELL',     cls: 'font-black tracking-[0.1em]' },
  { name: 'Migros',       cls: 'font-semibold tracking-tight' },
  { name: 'LC WAIKIKI',   cls: 'font-light tracking-[0.15em]' },
  { name: 'Garanti BBVA', cls: 'font-bold italic tracking-tight' },
  { name: 'KOTON®',       cls: 'font-black tracking-tight' },
  { name: 'Hepsiburada',  cls: 'font-light tracking-tight' },
  { name: 'PEGASUS',      cls: 'font-bold tracking-[0.2em]' },
  { name: 'Yemek Sepeti', cls: 'font-semibold italic' },
]

export default function BrandsMarquee() {
  const items = [...brands, ...brands]
  return (
    <div className="bg-[#f1ebe0] py-8 md:py-10 overflow-hidden">
      <div className="flex items-center whitespace-nowrap" style={{ animation: 'marquee 42s linear infinite' }}>
        {items.map((b, i) => (
          <span
            key={i}
            className={`flex-shrink-0 text-black text-[clamp(2rem,4.5vw,3.5rem)] leading-none mx-10 md:mx-16 select-none ${b.cls}`}
          >
            {b.name}
          </span>
        ))}
      </div>
    </div>
  )
}
