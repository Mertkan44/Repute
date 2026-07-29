import Header from '@/components/Header'
import Hero from '@/components/Hero'
import ClientLogosSection from '@/components/ClientLogosSection'
import FeaturedWorkStokt from '@/components/FeaturedWorkStokt'
import ServicesSection from '@/components/ServicesSection'
import AboutSection from '@/components/AboutSection'
import CTASection from '@/components/CTASection'
import QuoteForm from '@/components/QuoteForm'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative min-h-screen" style={{ backgroundColor: '#f5f0e9' }}>
      <Header />
      <div id="home">
        <Hero />
      </div>
      <ClientLogosSection />
      <div id="work">
        <FeaturedWorkStokt />
      </div>

      <div className="px-3 md:px-5 pb-3">
        <div className="rounded-2xl overflow-hidden">
          <ServicesSection />
          <AboutSection />
        </div>
      </div>

      <CTASection />
      <QuoteForm />
      <div className="px-3 md:px-5 pb-3">
        <div className="rounded-2xl overflow-hidden">
          <Footer />
        </div>
      </div>
    </main>
  )
}
