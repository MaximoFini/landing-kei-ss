"use client"

import { m, useInView, useScroll, useTransform, type MotionValue } from "@/lib/motion"
import { useEffect, useRef, useState } from "react"
import { Puzzle, Brain, Heart, Globe, Lightbulb, type LucideIcon } from "lucide-react"
import { DiaTextReveal } from "@/components/ui/dia-text-reveal"
import { BorderBeam } from "@/components/ui/border-beam"
import { hexToRgba } from "@/lib/utils"

const HEADER_REVEAL_DURATION = 1.3

interface Service {
  num: string
  icon: LucideIcon
  title: string
  description: string
  /** Accent hex driving this card's icon, glow, spotlight and beam — each
   *  service gets its own instead of every card sharing the same blue. */
  accent: string
  accentLight: string
}

const services: Service[] = [
  {
    num: "01",
    icon: Puzzle,
    title: "Sistemas a tu medida",
    description:
      "Diseñamos el sistema exacto que tu negocio necesita, dejando atrás las soluciones genéricas que te hacen perder tiempo.",
    accent: "#8b5cf6",
    accentLight: "#ddd6fe",
  },
  {
    num: "02",
    icon: Brain,
    title: "IA que entiende tu negocio",
    description:
      "Consultá tu sistema como a tu mejor colaborador: te responde al instante con datos e ideas claras para decidir mejor.",
    accent: "#3f7dff",
    accentLight: "#bcdcff",
  },
  {
    num: "03",
    icon: Heart,
    title: "Plataformas que fidelizan",
    description:
      "El espacio digital donde tus clientes viven la experiencia con tu marca y eligen quedarse, sin que dependa de vos.",
    accent: "#fb7185",
    accentLight: "#fecdd3",
  },
  {
    num: "04",
    icon: Globe,
    title: "Sitios que convierten",
    description:
      "Una presencia web ágil y clara, diseñada para un solo objetivo: que te contacten.",
    accent: "#34d399",
    accentLight: "#a7f3d0",
  },
]

export function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  const gridRef = useRef(null)
  // Raw window scroll (a plain MotionValue read of `scrollY` — never touches
  // layout). We rebuild the 0–1 progress ourselves from the grid's geometry,
  // which is measured ONCE per resize below, so scrolling no longer forces a
  // synchronous layout the way `useScroll({ target })` did (it walked the
  // offsetParent chain on every scroll event — ~38 ms reflows in the trace).
  const { scrollY } = useScroll()

  // Measure each card's vertical slot within the grid (as a 0–1 fraction) so
  // its light wash can sync to the moment the traveling lamp passes over it.
  const [cardRanges, setCardRanges] = useState<{ start: number; end: number }[]>([])
  // Grid height in px — lets the lamp travel via a compositor-only `transform`
  // (translateY/scaleY) instead of animating `height`, which forces layout
  // on every scroll frame and was the source of the mobile jank.
  const [gridHeight, setGridHeight] = useState(0)
  // Window-scroll range that maps to progress 0→1, replicating framer's
  // offset ["start end", "end start"]: 0 when the grid's top reaches the
  // viewport bottom, 1 when the grid's bottom reaches the viewport top.
  const [scrollRange, setScrollRange] = useState<[number, number]>([0, 1])

  useEffect(() => {
    const grid = gridRef.current as HTMLElement | null
    if (!grid) return

    const measure = () => {
      const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-service-card]"))
      const height = grid.offsetHeight
      if (!height) return
      const gridTop = grid.getBoundingClientRect().top + window.scrollY
      const vh = window.innerHeight
      setGridHeight(height)
      setScrollRange([gridTop - vh, gridTop + height])
      setCardRanges(
        cards.map((el) => ({
          start: el.offsetTop / height,
          end: (el.offsetTop + el.offsetHeight) / height,
        }))
      )
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(grid)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [])

  const scrollYProgress = useTransform(scrollY, scrollRange, [0, 1], { clamp: true })
  const lampY = useTransform(scrollYProgress, [0, 1], [0, gridHeight])

  return (
    <section
      id="servicios"
      className="relative pt-12 pb-20 sm:pt-16 sm:pb-28 lg:pt-20 lg:pb-32 px-4 sm:px-6 overflow-hidden bg-background"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <m.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="font-google-sans text-4xl sm:text-5xl lg:text-6xl font-[450] text-foreground tracking-normal">
            <DiaTextReveal
              text="Servicios"
              colors={["#0b1a42", "#1a4fc0", "#3f7dff", "#bcdcff"]}
              duration={HEADER_REVEAL_DURATION}
            />
          </h2>
          <DiaTextReveal
            text="Lo que hacemos"
            colors={["#0b1a42", "#1a4fc0", "#3f7dff", "#bcdcff"]}
            duration={HEADER_REVEAL_DURATION}
            className="font-google-sans mt-2 block text-sm sm:text-base font-[450] tracking-normal"
          />
        </m.div>

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

          {/* Mobile — single lamp travels down through the stacked cards as you scroll.
              The line's fill and the bulb's position are both driven by `transform`
              (scaleY / translateY) so scrolling never triggers layout. */}
          <m.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 z-20 h-full w-px origin-top bg-[#3f7dff]/50 sm:hidden"
            style={{ scaleY: scrollYProgress, x: "-50%" }}
          />
          <m.div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 z-20 sm:hidden"
            style={{ y: lampY, x: "-50%" }}
          >
            <Lightbulb
              className="w-4 h-4 shrink-0 text-[#3f7dff]"
              style={{ filter: "drop-shadow(0 0 8px rgba(63,125,255,0.85))" }}
            />
          </m.div>
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
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const Icon = service.icon
  const { accent } = service

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

  // Desktop spotlight — tracks the cursor within the card via CSS vars mutated
  // directly on the node (no React re-render per mousemove), so the radial
  // gradient in the wash below can recenter on var(--spot-x/--spot-y).
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    ref.current!.style.setProperty("--spot-x", `${e.clientX - rect.left}px`)
    ref.current!.style.setProperty("--spot-y", `${e.clientY - rect.top}px`)
  }

  return (
    <m.div
      ref={ref}
      onPointerMove={handlePointerMove}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      data-service-card
      style={
        {
          "--accent": accent,
          "--accent-10": hexToRgba(accent, 0.1),
          "--accent-15": hexToRgba(accent, 0.15),
          "--accent-20": hexToRgba(accent, 0.2),
          "--accent-30": hexToRgba(accent, 0.3),
          "--accent-35": hexToRgba(accent, 0.35),
          "--accent-40": hexToRgba(accent, 0.4),
        } as React.CSSProperties
      }
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-[0_2px_16px_-8px_rgba(10,14,26,0.08)] dark:shadow-[0_2px_16px_-8px_rgba(0,0,0,0.5)] transition-[border-color,box-shadow] duration-300 hover:border-[var(--accent-35)] hover:shadow-[0_24px_60px_-20px_var(--accent-35)]"
    >
      <BorderBeam
        size={70}
        duration={7 + index}
        delay={index * 1.2}
        colorFrom={service.accentLight}
        colorTo={accent}
        borderWidth={1.5}
      />

      {/* Spotlight — desktop: a soft glow in this card's own accent color that
          follows the cursor (--spot-x/--spot-y), fading in on hover instead of
          the old fixed top-down reveal. */}
      <div
        aria-hidden="true"
        className="hidden sm:block absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background:
            "radial-gradient(260px circle at var(--spot-x, 50%) var(--spot-y, 0%), var(--accent-30) 0%, var(--accent-10) 45%, transparent 75%)",
        }}
      />

      {/* Light wash — mobile: same illumination, driven by the lamp's scroll position instead of hover.
          `will-change: opacity` keeps it on its own compositor layer so the
          scroll-driven opacity change composites instead of repainting the card. */}
      <m.div
        className="absolute inset-0 pointer-events-none sm:hidden"
        style={{
          background: `linear-gradient(to bottom, ${hexToRgba(accent, 0.28)} 0%, ${hexToRgba(accent, 0.16)} 50%, ${hexToRgba(accent, 0.1)} 100%)`,
          opacity: litOpacity,
          willChange: "opacity",
        }}
      />

      {/* Lamp — a cord drops down from the top edge with a bulb at its tip, lighting the card (desktop hover only; mobile uses the scroll-driven lamp in the grid) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 h-0 opacity-0 sm:group-hover:h-14 sm:group-hover:opacity-100 transition-[height,opacity] duration-500 ease-out overflow-visible pointer-events-none hidden sm:flex sm:flex-col sm:items-center">
        <div className="w-px flex-1 bg-[var(--accent-40)]" />
        <Lightbulb
          className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-[var(--accent)]"
          style={{ filter: `drop-shadow(0 0 8px ${hexToRgba(accent, 0.85)})` }}
        />
      </div>

      {/* Icon */}
      <div className="relative z-10 w-11 h-11 rounded-xl bg-[var(--accent-10)] border border-[var(--accent-20)] flex items-center justify-center mb-5 group-hover:bg-[var(--accent-15)] group-hover:border-[var(--accent-40)] group-hover:shadow-[0_0_20px_var(--accent-35)] transition-all duration-300">
        <Icon className="w-5 h-5 text-[var(--accent)]" />
      </div>

      {/* Content */}
      <h3 className="relative z-10 font-google-sans text-lg sm:text-xl font-[450] text-foreground mb-2">
        {service.title}
      </h3>
      <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">
        {service.description}
      </p>
    </m.div>
  )
}
