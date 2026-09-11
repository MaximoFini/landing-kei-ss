"use client"

import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Puzzle, Brain, Heart, Globe, type LucideIcon } from "lucide-react"
import { cn, hexToRgba } from "@/lib/utils"

interface Service {
  num: string
  /** Title broken into the two display lines of the big menu type. */
  lines: [string, string]
  description: string
  icon: LucideIcon
  /** Accent hex driving this service's number, glow and icon panel. */
  accent: string
  accentLight: string
  clipId: string
}

const services: Service[] = [
  {
    num: "01",
    lines: ["Sistemas", "a tu medida"],
    description:
      "Diseñamos el sistema exacto que tu negocio necesita, dejando atrás las soluciones genéricas que te hacen perder tiempo.",
    icon: Puzzle,
    accent: "#8b5cf6",
    accentLight: "#ddd6fe",
    clipId: "kei-clip-grid",
  },
  {
    num: "02",
    lines: ["IA que entiende", "tu negocio"],
    description:
      "Consultá tu sistema como a tu mejor colaborador: te responde al instante con datos e ideas claras para decidir mejor.",
    icon: Brain,
    accent: "#3f7dff",
    accentLight: "#bcdcff",
    clipId: "kei-clip-bars",
  },
  {
    num: "03",
    lines: ["Plataformas", "que fidelizan"],
    description:
      "El espacio digital donde tus clientes viven la experiencia con tu marca y eligen quedarse, sin que dependa de vos.",
    icon: Heart,
    accent: "#fb7185",
    accentLight: "#fecdd3",
    clipId: "kei-clip-mosaic",
  },
  {
    num: "04",
    lines: ["Sitios", "que convierten"],
    description:
      "Una presencia web ágil y clara, diseñada para un solo objetivo: que te contacten.",
    icon: Globe,
    accent: "#34d399",
    accentLight: "#a7f3d0",
    clipId: "kei-clip-columns",
  },
]

/**
 * The deep-blue services card. It renders as a full-bleed overlay layer and is
 * driven entirely from the outside: `HeroStage` owns the ScrollTrigger that
 * flies it up into the pinned hero, targeting the `kei-*` classes below.
 */
export function ServicesCard() {
  const rootRef = useRef<HTMLDivElement>(null)
  const loopRef = useRef<gsap.core.Timeline | null>(null)
  const reducedRef = useRef(false)
  const [active, setActive] = useState(0)

  // Shatter-reveal loop for the icon panel: the active service's clip cells pop
  // in, breathe, then pop out, on repeat. Restarted whenever the hovered
  // service changes so each one reveals through its own cell pattern.
  const playReveal = (index: number) => {
    const selector = `#${services[index].clipId} .kei-path`
    loopRef.current?.kill()
    if (reducedRef.current) {
      gsap.set(selector, { scale: 1, transformOrigin: "50% 50%" })
      return
    }
    gsap.set(selector, { scale: 0, transformOrigin: "50% 50%" })
    loopRef.current = gsap
      .timeline({ repeat: -1, repeatDelay: 1 })
      .to(selector, {
        scale: 1,
        duration: 0.8,
        stagger: { amount: 0.4, from: "random" },
        ease: "expo.out",
      })
      .to(selector, {
        scale: 1.04,
        duration: 1.5,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
        stagger: { amount: 0.2, from: "center" },
      })
      .to(selector, {
        scale: 0,
        duration: 0.6,
        stagger: { amount: 0.3, from: "edges" },
        ease: "expo.in",
      })
  }

  useLayoutEffect(() => {
    reducedRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const ctx = gsap.context(() => playReveal(0), rootRef)
    return () => {
      loopRef.current?.kill()
      ctx.revert()
    }
  }, [])

  const handleHover = (index: number) => {
    if (index === active) return
    setActive(index)
    playReveal(index)
  }

  const activeService = services[active]

  return (
    <section
      ref={rootRef}
      aria-label="Servicios"
      className="dark absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
      style={{ perspective: "1500px" }}
    >
      <div
            className="kei-card kei-depth-card invisible relative flex items-center justify-center overflow-hidden pointer-events-auto w-[92vw] h-[86vh] md:w-[86vw] md:h-[86vh] rounded-[32px] md:rounded-[40px]"
          >
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-14 py-10 lg:py-0 flex flex-col lg:grid lg:grid-cols-2 lg:gap-10 items-center justify-center gap-6">
              {/* LEFT — heading + the big interactive service menu */}
              <div className="w-full">
                <div className="kei-head invisible mb-6 lg:mb-8">
                  <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#bcdcff]/55">
                    Lo que hacemos
                  </span>
                  <h2 className="font-google-sans mt-2 text-3xl sm:text-4xl lg:text-5xl font-[550] tracking-tight text-white">
                    Servicios
                  </h2>
                </div>

                <nav>
                  <ul className="flex flex-col gap-4 sm:gap-7 lg:gap-8">
                    {services.map((service, index) => {
                      const isActive = index === active
                      return (
                        <li
                          key={service.num}
                          className="kei-item invisible group cursor-pointer"
                          onMouseEnter={() => handleHover(index)}
                          onFocus={() => handleHover(index)}
                          onClick={() => handleHover(index)}
                          tabIndex={0}
                        >
                          <div className="flex items-start gap-4 sm:gap-6">
                            <span
                              className="font-mono text-base sm:text-xl font-bold mt-1.5 sm:mt-2 transition-all duration-500"
                              style={{
                                color: isActive ? service.accent : "rgba(188,220,255,0.3)",
                                transform: isActive ? "scale(1.1)" : "scale(1)",
                              }}
                            >
                              {service.num}
                            </span>
                            <h3
                              className={cn(
                                "font-google-sans text-[1.45rem] sm:text-4xl lg:text-[2.9rem] font-[800] uppercase tracking-tighter leading-[1.02] transition-all duration-700",
                                isActive
                                  ? "text-white translate-x-3"
                                  : "translate-x-0 text-transparent"
                              )}
                              // Inactive titles are outline only. The alpha lives in the
                              // stroke colour rather than on the element: fading the whole
                              // node washed the hairline out into a smudge instead of
                              // leaving a clean frame.
                              style={
                                isActive
                                  ? undefined
                                  : { WebkitTextStroke: "1px rgba(188,220,255,0.5)" }
                              }
                            >
                              {service.lines[0]}
                              <br />
                              {service.lines[1]}
                            </h3>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </nav>
              </div>

              {/* RIGHT — the icon shattering in through its clip cells */}
              <div className="kei-visual invisible relative w-full flex flex-col items-center justify-center">
                <div
                  aria-hidden="true"
                  className="absolute w-[110%] h-[110%] rounded-full blur-[110px] transition-colors duration-700"
                  style={{ background: hexToRgba(activeService.accent, 0.14) }}
                />

                <svg
                  viewBox="0 0 500 500"
                  className="relative z-10 w-full max-w-[170px] sm:max-w-[300px] lg:max-w-[460px] h-auto"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="kei-panel" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor={hexToRgba(activeService.accent, 0.32)} />
                      <stop offset="100%" stopColor={hexToRgba(activeService.accent, 0.08)} />
                    </linearGradient>

                    {/* 01 — 3x3 grid of squares */}
                    <clipPath id="kei-clip-grid">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <rect
                          key={i}
                          className="kei-path"
                          x={(i % 3) * 160 + 20}
                          y={Math.floor(i / 3) * 160 + 20}
                          width="140"
                          height="140"
                          rx="4"
                        />
                      ))}
                    </clipPath>

                    {/* 02 — stacked horizontal bars */}
                    <clipPath id="kei-clip-bars">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <rect
                          key={i}
                          className="kei-path"
                          x="20"
                          y={i * 96 + 20}
                          width="460"
                          height="76"
                          rx="10"
                        />
                      ))}
                    </clipPath>

                    {/* 03 — asymmetric mosaic */}
                    <clipPath id="kei-clip-mosaic">
                      <rect className="kei-path" x="20" y="20" width="200" height="280" rx="12" />
                      <rect className="kei-path" x="20" y="320" width="200" height="160" rx="12" />
                      <rect className="kei-path" x="240" y="20" width="240" height="140" rx="12" />
                      <rect className="kei-path" x="240" y="180" width="110" height="160" rx="12" />
                      <rect className="kei-path" x="370" y="180" width="110" height="160" rx="12" />
                      <rect className="kei-path" x="240" y="360" width="240" height="120" rx="12" />
                    </clipPath>

                    {/* 04 — vertical columns */}
                    <clipPath id="kei-clip-columns">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <rect
                          key={i}
                          className="kei-path"
                          x={i * 120 + 20}
                          y="20"
                          width="100"
                          height="460"
                          rx="10"
                        />
                      ))}
                    </clipPath>
                  </defs>

                  <g clipPath={`url(#${activeService.clipId})`}>
                    <rect x="0" y="0" width="500" height="500" fill="url(#kei-panel)" />
                    <g transform="translate(105 105) scale(12.083)">
                      <activeService.icon
                        width={24}
                        height={24}
                        strokeWidth={0.9}
                        color={activeService.accentLight}
                      />
                    </g>
                  </g>
                </svg>

                <p
                  key={active}
                  className="relative z-10 mt-4 lg:mt-10 max-w-md text-center text-xs sm:text-sm lg:text-base leading-relaxed text-[#bcdcff]/70 animate-in fade-in slide-in-from-bottom-2 duration-500"
                >
                  {activeService.description}
                </p>
              </div>
        </div>
      </div>
    </section>
  )
}
