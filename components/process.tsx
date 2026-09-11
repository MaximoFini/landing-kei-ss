"use client"

import { m, useMotionValue, useSpring, useTransform, useReducedMotion } from "@/lib/motion"
import { useEffect, useRef, useState } from "react"
import {
  MessageSquare,
  FileCheck,
  Code,
  Rocket,
  ArrowRight,
  ArrowLeft,
  Layers,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

interface Step {
  num: string
  icon: LucideIcon
  title: string
  description: string
  /** Position along the blue ramp — each card glows a shade further down it. */
  glow: string
}

const steps: Step[] = [
  {
    num: "01",
    icon: MessageSquare,
    title: "Consulta gratuita",
    description:
      "Hablamos 30 minutos sin compromiso. Entendemos tu problema, tus objetivos y si podemos ayudarte.",
    glow: "#1a4fc0",
  },
  {
    num: "02",
    icon: FileCheck,
    title: "Propuesta clara",
    description:
      "Recibís un documento detallado con alcance, cronograma, tecnologías y precio fijo. Sin sorpresas.",
    glow: "#3f7dff",
  },
  {
    num: "03",
    icon: Code,
    title: "Desarrollo ágil",
    description:
      "Construimos en sprints cortos con demos semanales. Siempre sabés en qué estamos trabajando.",
    glow: "#6aa2ff",
  },
  {
    num: "04",
    icon: Rocket,
    title: "Entrega y soporte",
    description:
      "Lanzamos tu producto, te capacitamos y damos soporte técnico incluido durante el primer mes.",
    glow: "#8fc0ff",
  },
]

const TOTAL = steps.length

type View = "deck" | "grid"

/** Resting pose of a card by how deep it sits in the stack (0 = front). */
function poseFor(depth: number) {
  return {
    y: -depth * 18,
    scale: 1 - depth * 0.055,
    rotate: depth === 0 ? 0 : depth % 2 === 0 ? 1.8 : -1.8,
    opacity: depth > 2 ? 0.35 : 1 - depth * 0.12,
  }
}

/** Cursor-driven tilt, shared by both views. */
function useTilt(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 160, damping: 20, mass: 0.6 }
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [9, -9]), spring)
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), spring)

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const lx = e.clientX - r.left
    const ly = e.clientY - r.top
    px.set(lx / r.width - 0.5)
    py.set(ly / r.height - 0.5)
    // Written straight to the node so tracking the cursor costs no re-render.
    el.style.setProperty("--sx", `${lx}px`)
    el.style.setProperty("--sy", `${ly}px`)
  }

  const onPointerLeave = () => {
    px.set(0)
    py.set(0)
  }

  return {
    ref,
    rotateX,
    rotateY,
    onPointerMove: enabled ? onPointerMove : undefined,
    onPointerLeave,
  }
}

function ProcessCard({
  step,
  compact,
  interactive,
  onClick,
}: {
  step: Step
  compact: boolean
  interactive: boolean
  onClick?: () => void
}) {
  const reduced = useReducedMotion()
  const tilt = useTilt(interactive && !reduced)
  const Icon = step.icon

  return (
    <m.div
      ref={tilt.ref}
      onPointerMove={tilt.onPointerMove}
      onPointerLeave={tilt.onPointerLeave}
      onClick={onClick}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: "preserve-3d" }}
      className={cn(
        "group relative h-full w-full",
        interactive ? "cursor-pointer" : "pointer-events-none"
      )}
    >
      {/* Extruded side — a twin slab pushed back in Z, so tilting the card
          shows real thickness instead of a flat rectangle. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-[#2b63e0] to-[#0a183f] opacity-80",
          compact ? "rounded-[22px]" : "rounded-[30px]"
        )}
        style={{ transform: `translateZ(${compact ? -20 : -32}px)` }}
      />

      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[38px] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          transform: "translateZ(-60px)",
          background: `radial-gradient(56% 56% at 50% 62%, ${step.glow}55 0%, transparent 72%)`,
          filter: "blur(28px)",
        }}
      />

      <div
        className={cn("relative flex h-full w-full flex-col", compact ? "p-5" : "p-7 sm:p-9")}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Glass plate on its own layer: `backdrop-filter` forces
            `transform-style: flat` on its subtree, which would collapse the
            depth the icon and copy sit at. Same reason the clipped decoration
            lives here — `overflow: hidden` flattens too. */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 border border-[#3f7dff]/20 bg-white/75 shadow-[0_40px_80px_-40px_rgba(26,79,192,0.55)] backdrop-blur-xl transition-colors duration-500 group-hover:border-[#3f7dff]/45 dark:border-white/10 dark:bg-[#081026]/80",
            compact ? "rounded-[22px]" : "rounded-[30px]"
          )}
        />

        <div
          className={cn(
            "pointer-events-none absolute inset-0 overflow-hidden",
            compact ? "rounded-[22px]" : "rounded-[30px]"
          )}
        >
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(340px circle at var(--sx, 50%) var(--sy, 0%), rgba(120,170,255,0.26) 0%, rgba(63,125,255,0.07) 45%, transparent 72%)",
            }}
          />
          <div
            className={cn(
              "absolute top-0 h-px bg-gradient-to-r from-transparent via-[#bcdcff] to-transparent opacity-70",
              compact ? "inset-x-6" : "inset-x-10"
            )}
          />
          <span
            className={cn(
              "font-google-sans absolute select-none font-[800] leading-none tracking-tighter text-transparent",
              compact ? "-bottom-4 right-1 text-[4.5rem]" : "-bottom-7 right-2 text-[8rem]"
            )}
            style={{ WebkitTextStroke: `1.5px ${step.glow}2e` }}
          >
            {step.num}
          </span>
        </div>

        <div
          className="relative flex items-start justify-between"
          style={{ transform: `translateZ(${compact ? 36 : 56}px)` }}
        >
          <div
            className={cn(
              "flex items-center justify-center border border-[#3f7dff]/30 dark:border-white/15",
              compact ? "h-10 w-10 rounded-xl" : "h-14 w-14 rounded-2xl"
            )}
            style={{
              background: `linear-gradient(150deg, ${step.glow}30 0%, ${step.glow}0d 100%)`,
              boxShadow: `0 12px 26px -12px ${step.glow}aa, inset 0 1px 1px rgba(255,255,255,0.35)`,
            }}
          >
            <Icon className={compact ? "h-4 w-4" : "h-6 w-6"} style={{ color: step.glow }} />
          </div>
          <span
            className={cn(
              "font-mono uppercase tracking-[0.3em] text-[#3f7dff]/70",
              compact ? "text-[9px]" : "text-[10px]"
            )}
          >
            {compact ? step.num : `Paso ${step.num} / 0${TOTAL}`}
          </span>
        </div>

        {/* Centred in the space left over rather than pinned to the bottom —
            in the deck view that gap was most of the card. */}
        <div
          className="relative flex flex-1 flex-col justify-center"
          style={{ transform: `translateZ(${compact ? 20 : 30}px)` }}
        >
          <h3
            className={cn(
              "font-google-sans font-[550] tracking-tight text-foreground",
              compact ? "mb-1.5 text-base xl:text-lg" : "mb-3 text-2xl sm:text-3xl"
            )}
          >
            {step.title}
          </h3>
          <p
            className={cn(
              "leading-relaxed text-muted-foreground",
              compact ? "text-[11px] xl:text-xs" : "max-w-md text-sm sm:text-base"
            )}
          >
            {step.description}
          </p>
        </div>
      </div>
    </m.div>
  )
}

function DeckCard({
  step,
  depth,
  onAdvance,
}: {
  step: Step
  depth: number
  onAdvance: () => void
}) {
  const isFront = depth === 0

  // A card leaving the front doesn't cross the stack — it dips down, slips
  // under it and resurfaces at the back. Detected by comparing the pose it had
  // on the previous render with the one it is getting now.
  const prevDepth = useRef(depth)
  const isTucking = prevDepth.current === 0 && depth === TOTAL - 1
  useEffect(() => {
    prevDepth.current = depth
  })

  const pose = poseFor(depth)

  return (
    <m.div
      className="absolute inset-0"
      style={{ zIndex: TOTAL - depth }}
      animate={
        isTucking
          ? {
              y: [0, 120, pose.y],
              scale: [1, 0.82, pose.scale],
              rotate: [0, 7, pose.rotate],
              opacity: [1, 1, pose.opacity],
            }
          : pose
      }
      transition={
        isTucking
          ? { duration: 0.8, times: [0, 0.45, 1], ease: [0.65, 0, 0.35, 1] }
          : { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
      }
      aria-hidden={!isFront}
    >
      <ProcessCard step={step} compact={false} interactive={isFront} onClick={onAdvance} />
    </m.div>
  )
}

function ViewToggle({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  const options: { id: View; label: string; icon: LucideIcon }[] = [
    { id: "deck", label: "De a una", icon: Layers },
    { id: "grid", label: "Ver todas", icon: LayoutGrid },
  ]

  return (
    <div className="mx-auto mb-5 flex w-fit items-center gap-1 rounded-full border border-[#3f7dff]/20 bg-white/60 p-1 backdrop-blur-md dark:border-white/10 dark:bg-white/5">
      {options.map((o) => {
        const Icon = o.icon
        const isOn = view === o.id
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={isOn}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300",
              isOn
                ? "bg-[#3f7dff] text-white shadow-[0_10px_22px_-10px_rgba(63,125,255,0.9)]"
                : "text-muted-foreground hover:text-foreground"
            )}
            style={{ minHeight: 0, minWidth: 0 }}
          >
            <Icon className="h-3.5 w-3.5" />
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

export function Process() {
  const [view, setView] = useState<View>("deck")
  const [index, setIndex] = useState(0)

  const advance = () => setIndex((i) => (i + 1) % TOTAL)
  const rewind = () => setIndex((i) => (i - 1 + TOTAL) % TOTAL)

  // Exactly one viewport tall: this section is the floor of the pinned hero
  // stage, uncovered when the services card lifts away, so it has to fit the
  // screen without scrolling of its own.
  return (
    <section className="relative flex h-full w-full flex-col justify-center overflow-hidden bg-[#f4f8ff] px-4 py-6 sm:px-6 dark:bg-[#040a1c]">
      {/* Aurora field — two slow-drifting blue masses. Only their transform
          animates; the blur is static, so the layer stays composited. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <m.div
          className="absolute -top-40 left-[8%] h-[520px] w-[520px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(63,125,255,0.30) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
          animate={{ x: [0, 70, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="absolute -bottom-48 right-[5%] h-[600px] w-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(140,190,255,0.26) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{ x: [0, -60, 0], y: [0, -35, 0] }}
          transition={{ duration: 27, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeading
          eyebrow="Proceso"
          title="Cómo trabajamos"
          subtitle="De la idea al producto"
        />

        <ViewToggle view={view} onChange={setView} />

        {view === "deck" ? (
          <>
            <div
              className="relative mx-auto h-[min(36vh,300px)] w-full max-w-[600px]"
              style={{ perspective: "1700px" }}
            >
              {steps.map((step, i) => (
                <DeckCard
                  key={step.num}
                  step={step}
                  depth={(i - index + TOTAL) % TOTAL}
                  onAdvance={advance}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={rewind}
                aria-label="Paso anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#3f7dff]/25 text-[#3f7dff] transition-all duration-200 hover:border-[#3f7dff]/60 hover:bg-[#3f7dff]/10 active:scale-95 dark:border-white/12"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2.5">
                {steps.map((step, i) => (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Ir al paso ${step.num}`}
                    aria-current={i === index}
                    className="h-2.5 rounded-full transition-all duration-500"
                    style={{
                      width: i === index ? 28 : 10,
                      minWidth: 0,
                      minHeight: 0,
                      background: i === index ? step.glow : "rgba(63,125,255,0.22)",
                      boxShadow: i === index ? `0 0 14px ${step.glow}99` : "none",
                    }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={advance}
                aria-label="Siguiente paso"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3f7dff] text-white shadow-[0_14px_30px_-12px_rgba(63,125,255,0.95)] transition-all duration-200 hover:scale-105 hover:bg-[#2f6bec] active:scale-95"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        ) : (
          <div
            className="mx-auto grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4 xl:gap-5"
            style={{ perspective: "1700px" }}
          >
            {steps.map((step, i) => (
              <m.div
                key={step.num}
                initial={{ opacity: 0, y: 40, rotateY: -26 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                className="h-[min(30vh,240px)] xl:h-[min(38vh,290px)]"
              >
                <ProcessCard step={step} compact interactive />
              </m.div>
            ))}
          </div>
        )}

        <div className="mt-5 flex justify-center">
          <a
            href="#contacto"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#3f7dff] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_18px_40px_-16px_rgba(63,125,255,0.9)] transition-all duration-200 hover:scale-[1.03] hover:bg-[#2f6bec] active:scale-95"
          >
            Empezá - Primer consulta gratis
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
