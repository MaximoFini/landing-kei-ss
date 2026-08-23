import dynamic from 'next/dynamic'
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Footer } from "@/components/footer"

// Lazy load below-the-fold components
const Process = dynamic(() => import("@/components/process").then(mod => ({ default: mod.Process })), {
  loading: () => <div className="min-h-screen" />
})
const Portfolio = dynamic(() => import("@/components/portfolio").then(mod => ({ default: mod.Portfolio })), {
  loading: () => <div className="min-h-screen" />
})
const Clients = dynamic(() => import("@/components/clients").then(mod => ({ default: mod.Clients })), {
  loading: () => <div className="min-h-screen animate-pulse bg-surface/30" />
})
const Testimonials = dynamic(() => import("@/components/testimonials").then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="min-h-screen animate-pulse bg-surface/30" />
})
const Team = dynamic(() => import("@/components/team").then(mod => ({ default: mod.Team })), {
  loading: () => <div className="min-h-screen animate-pulse bg-surface/30" />
})
const Contact = dynamic(() => import("@/components/contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="min-h-screen animate-pulse bg-surface/30" />
})
const WhatsAppButton = dynamic(() => import("@/components/whatsapp-button").then(mod => ({ default: mod.WhatsAppButton })), {
  loading: () => <div className="fixed bottom-6 right-6 w-14 h-14 rounded-full animate-pulse bg-surface/30" />
})

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Services />
      <Process />
      <Portfolio />
      <Clients />
      <Testimonials />
      <Team />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
