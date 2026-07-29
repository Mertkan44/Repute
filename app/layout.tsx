import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/lib/LanguageContext'

export const metadata: Metadata = {
  title: 'RÉPUTÉ — Your Creative Growth Partner',
  description: 'Social media, strategy & content factory. Born in Istanbul, working worldwide.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-black text-white">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
