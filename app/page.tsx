import type { Metadata } from "next"
import dynamic from 'next/dynamic'
import { Navbar } from "@/components/navbar"
import { HeroStage } from "@/components/hero-stage"
import { StoryHandoff } from "@/components/ui/story-scroll"
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
      <HeroStage>
        <Process />
      </HeroStage>

      {/* Proceso → Proyectos handoff. Proceso is the last thing the pinned
          stage shows, and it stays perfectly still while this block slides up
          over it: `kei-overlap` starts the rest of the page a viewport early,
          inside the stage's pinned runway, and the z-index puts it on top. No
          extra scroll library needed — the stacking is the effect. */}
      <div className="kei-overlap relative z-10">
        {/* Nav anchor outside the sticky panel below: a stuck element is
            visually offset from its flow position, so measuring it while the
            handoff is mid-flight would report the wrong place. */}
        <div id="proyectos" aria-hidden="true" className="h-0" />

        {/* Proyectos (with the "Confían en nosotros" strip) parks at the bottom
            of the viewport while Clientes hinges up over it. */}
        <StoryHandoff
          outgoing={
            <>
              <Portfolio />
              <Clients />
            </>
          }
          incoming={<Testimonials />}
        />

        <Team />
        <Contact />
        <Footer />
      </div>

      <WhatsAppButton />
    </main>
  )
}
