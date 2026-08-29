"use client"

import { motion } from "framer-motion"

interface LightAuroraProps {
  className?: string
  /** 0-1, overall strength of the colour wash. */
  intensity?: number
}

/**
 * Soft, slowly drifting blue aurora blobs for light sections — the white-theme
 * counterpart to the hero's deep-space ribbons.
 */
export function LightAurora({ className = "", intensity = 1 }: LightAuroraProps) {
  const blobs = [
    {
      color: "rgba(63,125,255,0.20)",
      size: "46rem",
      from: { x: "-20%", y: "-30%" },
      to: { x: "5%", y: "-10%" },
      duration: 18,
    },
    {
      color: "rgba(188,220,255,0.35)",
      size: "38rem",
      from: { x: "70%", y: "0%" },
      to: { x: "55%", y: "25%" },
      duration: 22,
    },
    {
      color: "rgba(26,79,192,0.14)",
      size: "42rem",
      from: { x: "20%", y: "60%" },
      to: { x: "40%", y: "45%" },
      duration: 26,
    },
  ]

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: intensity }}
      aria-hidden="true"
    >
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            background: `radial-gradient(circle at center, ${b.color} 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          initial={{ left: b.from.x, top: b.from.y }}
          animate={{
            left: [b.from.x, b.to.x, b.from.x],
            top: [b.from.y, b.to.y, b.from.y],
          }}
          transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  )
}
