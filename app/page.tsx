import type { Metadata } from "next"
import dynamic from 'next/dynamic'
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Desarrollo de Software a Medida, IA y Automatización | KEI Software",
}

// Lazy load below-the-fold components
// Placeholder min-heights approximate each section's real rendered height at
// desktop width, so hydrating the real section barely shifts layout (avoids CLS).
const Process = dynamic(() => import("@/components/process").then(mod => ({ default: mod.Process })), {
  loading: () => <div className="min-h-[700px]" />
})
const Portfolio = dynamic(() => import("@/components/portfolio").then(mod => ({ default: mod.Portfolio })), {
  loading: () => <div className="min-h-[860px]" />
})
const Clients = dynamic(() => import("@/components/clients").then(mod => ({ default: mod.Clients })), {
  loading: () => <div className="min-h-[240px] animate-pulse bg-surface/30" />
})
const Testimonials = dynamic(() => import("@/components/testimonials").then(mod => ({ default: mod.Testimonials })), {
  loading: () => <div className="min-h-[890px] animate-pulse bg-surface/30" />
})
const Team = dynamic(() => import("@/components/team").then(mod => ({ default: mod.Team })), {
  loading: () => <div className="min-h-[840px] animate-pulse bg-surface/30" />
})
const Contact = dynamic(() => import("@/components/contact").then(mod => ({ default: mod.Contact })), {
  loading: () => <div className="min-h-[730px] animate-pulse bg-surface/30" />
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
