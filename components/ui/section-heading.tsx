"use client"

import { motion, useInView } from "framer-motion"
import { useRef, type ReactNode } from "react"
import { DiaTextReveal } from "@/components/ui/dia-text-reveal"

export const BRAND_COLORS = ["#0b1a42", "#1a4fc0", "#3f7dff", "#bcdcff"]
const REVEAL_DURATION = 1.3

interface SectionHeadingProps {
  /** Small mono eyebrow above the title. */
  eyebrow?: string
  /** Main title — animated with the diagonal gradient sweep. */
  title: string
  /** Optional smaller line under the title. */
  subtitle?: string
  /** Optional supporting paragraph. */
  description?: ReactNode
  align?: "center" | "left"
  className?: string
  subtitleClassName?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  description,
  align = "center",
  className = "",
  subtitleClassName = "mt-2",
}: SectionHeadingProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const centered = align === "center"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`mb-12 sm:mb-16 ${centered ? "text-center" : "text-left"} ${className}`}
    >
      {eyebrow && (
        <span className="mb-4 block font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#3f7dff]">
          {eyebrow}
        </span>
      )}

      <h2 className="font-google-sans text-4xl font-[450] tracking-normal text-foreground sm:text-5xl lg:text-6xl">
        <DiaTextReveal
          text={title}
          colors={BRAND_COLORS}
          duration={REVEAL_DURATION}
        />
      </h2>

      {subtitle && (
        <DiaTextReveal
          text={subtitle}
          colors={BRAND_COLORS}
          duration={REVEAL_DURATION}
          className={`block font-google-sans text-sm font-[450] tracking-normal sm:text-base ${subtitleClassName}`}
        />
      )}

      {description && (
        <p
          className={`mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base ${
            centered ? "mx-auto max-w-xl" : "max-w-xl"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
