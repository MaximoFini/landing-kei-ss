"use client"

import type { ReactNode } from "react"

interface LogoLoopProps {
  children: ReactNode[]
  /** Seconds for one full loop. */
  duration?: number
  gap?: number
  /** How many times to repeat the set before mirroring (fills wide screens). */
  repeat?: number
  direction?: "left" | "right"
  className?: string
}

/**
 * Seamless, infinitely scrolling row that pauses on hover and fades at both
 * edges. Renders two identical tracks and translates by -50% for a perfect loop.
 */
export function LogoLoop({
  children,
  duration = 28,
  gap = 56,
  repeat = 3,
  direction = "left",
  className = "",
}: LogoLoopProps) {
  const set = Array.from({ length: repeat }).flatMap((_, r) =>
    children.map((child, i) => (
      <li key={`${r}-${i}`} className="shrink-0">
        {child}
      </li>
    ))
  )

  return (
    <div
      className={`group relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
      }}
    >
      <div
        className="flex w-max [animation:logo-loop_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        <ul className="flex items-center" style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}>
          {set}
        </ul>
        <ul
          className="flex items-center"
          style={{ gap: `${gap}px`, paddingRight: `${gap}px` }}
          aria-hidden="true"
        >
          {set}
        </ul>
      </div>
    </div>
  )
}
