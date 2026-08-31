"use client"

import { useEffect, useState } from "react"
import { m, useReducedMotion } from "@/lib/motion"

interface LightAuroraProps {
  className?: string
  /** 0-1, overall strength of the colour wash. */
  intensity?: number
}

/**
 * Soft, slowly drifting blue aurora blobs for light sections — the white-theme
 * counterpart to the hero's deep-space ribbons.
 */
// Drift deltas as a fraction of the section (which is `absolute inset-0`, i.e.
// viewport-sized) — identical in direction/amplitude to the old left/top
// keyframes. Resolved to px against the viewport once on mount so framer-motion
// animates plain numeric `x`/`y` (compositor-only transforms).
const BLOBS = [
  {
    color: "rgba(63,125,255,0.20)",
    size: "46rem",
    base: { left: "-20%", top: "-30%" }, // unchanged from old `from`
    delta: { x: 0.25, y: 0.2 }, // old Δ (+25%, +20%) of section
    duration: 18,
  },
  {
    color: "rgba(188,220,255,0.35)",
    size: "38rem",
    base: { left: "70%", top: "0%" },
    delta: { x: -0.15, y: 0.25 }, // old Δ (-15%, +25%)
    duration: 22,
  },
  {
    color: "rgba(26,79,192,0.14)",
    size: "42rem",
    base: { left: "20%", top: "60%" },
    delta: { x: 0.2, y: -0.15 }, // old Δ (+20%, -15%)
    duration: 26,
  },
]

export function LightAurora({ className = "", intensity = 1 }: LightAuroraProps) {
  const prefersReducedMotion = useReducedMotion()
  const [viewport, setViewport] = useState<{ w: number; h: number } | null>(null)

  useEffect(() => {
    // The drift now animates `transform` only, so it stays on the compositor and
    // never triggers layout/paint. That's cheap enough for touch devices, so the
    // only guard left is reduced-m.
    if (prefersReducedMotion) return
    setViewport({ w: window.innerWidth, h: window.innerHeight })
  }, [prefersReducedMotion])

  const drift = viewport !== null

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: intensity }}
      aria-hidden="true"
    >
      {BLOBS.map((b, i) => {
        const dx = viewport ? viewport.w * b.delta.x : 0
        const dy = viewport ? viewport.h * b.delta.y : 0
        return (
          <m.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: b.size,
              height: b.size,
              left: b.base.left,
              top: b.base.top,
              background: `radial-gradient(circle at center, ${b.color} 0%, transparent 70%)`,
              filter: "blur(40px)",
              willChange: drift ? "transform" : undefined,
            }}
            initial={{ x: 0, y: 0 }}
            animate={drift ? { x: [0, dx, 0], y: [0, dy, 0] } : { x: 0, y: 0 }}
            transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        )
      })}
    </div>
  )
}
