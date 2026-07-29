import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Repute Agency — Yaratıcılığı Veriyle Birleştiriyoruz',
  description: 'İstanbul merkezli dijital pazarlama ve sosyal medya ajansı.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="h-full antialiased">
      <body className="min-h-full bg-black text-white">{children}</body>
    </html>
  )
}
