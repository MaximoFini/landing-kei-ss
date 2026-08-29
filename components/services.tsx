"use client"

import { motion, useInView, useScroll, useTransform, type MotionValue } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Globe, Brain, Zap, Database, Lightbulb, type LucideIcon } from "lucide-react"
import { DiaTextReveal } from "@/components/ui/dia-text-reveal"
import { BorderBeam } from "@/components/ui/border-beam"

const HEADER_REVEAL_DURATION = 1.3

interface Service {
  num: string
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  {
    num: "01",
    icon: Globe,
    title: "Desarrollo Web",
    description:
      "Aplicaciones modernas, escalables y de alto rendimiento. De 0 a 100.",
  },
  {
    num: "02",
    icon: Brain,
    title: "Soluciones IA",
    description:
      "Modelos de lenguaje y visión artificial integrados a tus procesos. Automatizamos lo complejo y añadimos inteligencia real a tus productos.",
  },
  {
    num: "03",
    icon: Zap,
    title: "Automatización",
    description:
      "Flujos que eliminan trabajo repetitivo y conectan tus herramientas. Más tiempo para lo que importa.",
  },
  {
    num: "04",
    icon: Database,
    title: "Sistemas a Medida",
    description:
      "ERPs, CRMs, dashboards y plataformas internas diseñadas exactamente para tu negocio, sin soluciones genéricas.",
  },
]

export function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  const gridRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  })
  const lampHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  // Measure each card's vertical slot within the grid (as a 0–1 fraction) so
  // its light wash can sync to the moment the traveling lamp passes over it.
  const [cardRanges, setCardRanges] = useState<{ start: number; end: number }[]>([])

  useEffect(() => {
    const grid = gridRef.current as HTMLElement | null
    if (!grid) return

    const measure = () => {
      const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-service-card]"))
      const gridHeight = grid.offsetHeight
      if (!gridHeight) return
      setCardRanges(
        cards.map((el) => ({
          start: el.offsetTop / gridHeight,
          end: (el.offsetTop + el.offsetHeight) / gridHeight,
        }))
      )
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(grid)
    return () => ro.disconnect()
  }, [])

  return (
    <section
      id="servicios"
      className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32 px-4 sm:px-6 overflow-hidden bg-white"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="font-google-sans text-4xl sm:text-5xl lg:text-6xl font-[450] text-[#0a0e1a] tracking-normal">
            <DiaTextReveal
              text="Servicios"
              colors={["#0b1a42", "#1a4fc0", "#3f7dff", "#bcdcff"]}
              textColor="#0a0e1a"
              duration={HEADER_REVEAL_DURATION}
            />
          </h2>
          <DiaTextReveal
            text="Lo que hacemos"
            colors={["#0b1a42", "#1a4fc0", "#3f7dff", "#bcdcff"]}
            textColor="#0a0e1a"
            duration={HEADER_REVEAL_DURATION}
            className="font-google-sans mt-2 block text-sm sm:text-base font-[450] tracking-normal"
          />
        </motion.div>

        {/* Cards grid */}
        <div ref={gridRef} className="relative grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.num}
              service={service}
              index={i}
              scrollYProgress={scrollYProgress}
              range={cardRanges[i]}
            />
          ))}

          {/* Mobile — single lamp travels down through the stacked cards as you scroll */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 z-20 flex flex-col items-center overflow-visible sm:hidden"
            style={{ height: lampHeight }}
          >
            <div className="w-px flex-1 bg-[#3f7dff]/50" />
            <Lightbulb
              className="w-4 h-4 shrink-0 text-[#3f7dff]"
              style={{ filter: "drop-shadow(0 0 8px rgba(63,125,255,0.85))" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  scrollYProgress,
  range,
}: {
  service: Service
  index: number
  scrollYProgress: MotionValue<number>
  range?: { start: number; end: number }
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const Icon = service.icon

  // Mobile — light wash is lit only while the lamp bulb is actually inside this
  // card's bounds: 0 the instant it's above or below, never bleeding into the
  // gap between cards. The tiny inner edge just softens the on/off snap.
  const edge = range ? Math.min(0.015, (range.end - range.start) / 2) : 0.015
  const litOpacity = useTransform(
    scrollYProgress,
    range
      ? [range.start, range.start + edge, range.end - edge, range.end]
      : [0, 0, 1, 1],
    [0, 1, 1, 0]
  )

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      data-service-card
      className="group relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-6 sm:p-8 shadow-[0_2px_16px_-8px_rgba(10,14,26,0.08)] transition-[border-color,box-shadow] duration-300 hover:border-[#3f7dff]/35 hover:shadow-[0_24px_60px_-20px_rgba(63,125,255,0.35)]"
    >
      <BorderBeam
        size={70}
        duration={7 + index}
        delay={index * 1.2}
        colorFrom="#bcdcff"
        colorTo="#3f7dff"
        borderWidth={1.5}
      />

      {/* Light wash — desktop: grows from a point at the top on hover, collapses back into it on leave */}
      <div
        className="hidden sm:block absolute inset-0 [clip-path:circle(0%_at_50%_0%)] group-hover:[clip-path:circle(150%_at_50%_0%)] transition-[clip-path] duration-700 ease-out pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(63,125,255,0.28) 0%, rgba(63,125,255,0.16) 50%, rgba(63,125,255,0.1) 100%)",
        }}
      />

      {/* Light wash — mobile: same illumination, driven by the lamp's scroll position instead of hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none sm:hidden"
        style={{
          background:
            "linear-gradient(to bottom, rgba(63,125,255,0.28) 0%, rgba(63,125,255,0.16) 50%, rgba(63,125,255,0.1) 100%)",
          opacity: litOpacity,
        }}
      />

      {/* Lamp — a cord drops down from the top edge with a bulb at its tip, lighting the card (desktop hover only; mobile uses the scroll-driven lamp in the grid) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 h-0 opacity-0 sm:group-hover:h-14 sm:group-hover:opacity-100 transition-[height,opacity] duration-500 ease-out overflow-visible pointer-events-none hidden sm:flex sm:flex-col sm:items-center">
        <div className="w-px flex-1 bg-[#3f7dff]/50" />
        <Lightbulb
          className="w-4 h-4 sm:w-5 sm:h-5 text-[#3f7dff] shrink-0"
          style={{ filter: "drop-shadow(0 0 8px rgba(63,125,255,0.85))" }}
        />
      </div>

      {/* Icon */}
      <div className="relative z-10 w-11 h-11 rounded-xl bg-[#3f7dff]/10 border border-[#3f7dff]/20 flex items-center justify-center mb-5 group-hover:bg-[#3f7dff]/15 group-hover:border-[#3f7dff]/40 group-hover:shadow-[0_0_20px_rgba(63,125,255,0.35)] transition-all duration-300">
        <Icon className="w-5 h-5 text-[#3f7dff]" />
      </div>

      {/* Content */}
      <h3 className="relative z-10 font-google-sans text-lg sm:text-xl font-[450] text-[#0a0e1a] mb-2">
        {service.title}
      </h3>
      <p className="relative z-10 text-sm text-black/55 leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  )
}
