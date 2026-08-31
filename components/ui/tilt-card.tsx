"use client"

import {
  m,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionStyle,
} from "@/lib/motion"
import { useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: ReactNode
  className?: string
  /** Max tilt in degrees. */
  max?: number
  /** Show the cursor-following spotlight glow. */
  spotlight?: boolean
  spotlightColor?: string
  style?: MotionStyle
}

/**
 * Pointer-reactive card: subtle 3D tilt toward the cursor plus an optional
 * radial spotlight that follows the pointer. Springy, disables cleanly on
 * touch (no hover) and respects reduced motion via framer defaults.
 */
export function TiltCard({
  children,
  className,
  max = 7,
  spotlight = true,
  spotlightColor = "rgba(63,125,255,0.14)",
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), {
    stiffness: 220,
    damping: 20,
  })
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), {
    stiffness: 220,
    damping: 20,
  })

  const spotlightBg = useTransform(
    [px, py],
    ([x, y]: number[]) =>
      `radial-gradient(220px circle at ${x * 100}% ${y * 100}%, ${spotlightColor}, transparent 65%)`
  )

  const handleMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }

  const reset = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <m.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        transformPerspective: 900,
        ...style,
      }}
      className={cn("group/tilt relative", className)}
    >
      {spotlight && (
        <m.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: spotlightBg }}
        />
      )}
      {children}
    </m.div>
  )
}
