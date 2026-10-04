"use client"

import { useEffect, useRef, type ReactNode, type ElementType, type ComponentPropsWithoutRef } from "react"
import { scrollToHash } from "@/components/landing/smooth-scroll"

/**
 * Marks an element with [data-in] the first time it scrolls into view.
 * The CSS in app/kei.css does the actual motion, so animations run off
 * the main thread and content is visible when JS is unavailable.
 */
export function useReveal<T extends HTMLElement>(margin = "0px 0px -12% 0px") {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "")
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: margin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin])
  return ref
}

/** Heading whose lines rise out of a mask, one after another. */
export function Lines({
  as: Tag = "h2",
  lines,
  className = "",
  id,
}: {
  as?: ElementType
  lines: ReactNode[]
  className?: string
  id?: string
}) {
  const ref = useReveal<HTMLElement>()
  return (
    <Tag ref={ref} id={id} className={`k-lines ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="k-line">
          <span style={{ "--i": i } as React.CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  )
}

/** Fades and lifts its child into place once. */
export function Fade({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: ElementType
}) {
  const ref = useReveal<HTMLElement>()
  return (
    <Tag ref={ref} className={`k-fade ${className}`} style={{ "--i": delay } as React.CSSProperties}>
      {children}
    </Tag>
  )
}

/** Label that rolls to a copy of itself on hover (Osmo). */
export function Roll({ children }: { children: string }) {
  return (
    <span className="k-roll">
      <span className="k-roll__a">{children}</span>
      <span className="k-roll__b" aria-hidden="true">
        {children}
      </span>
    </span>
  )
}

type PillProps = {
  href: string
  children: string
  variant?: "ink" | "light" | "ice" | "on-dark"
  size?: "md" | "sm"
  dot?: boolean
  className?: string
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children">

/** Pill link with a leading dot. In-page hashes scroll through Lenis. */
export function Pill({ href, children, variant = "ink", size = "md", dot = true, className = "", onClick, ...rest }: PillProps) {
  const variantClass = variant === "ink" ? "" : `k-pill--${variant}`
  const external = /^https?:/.test(href)
  return (
    <a
      href={href}
      className={`k-pill ${variantClass} ${size === "sm" ? "k-pill--sm" : ""} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={(e) => {
        onClick?.(e)
        if (!e.defaultPrevented && href.startsWith("#")) {
          e.preventDefault()
          scrollToHash(href)
        }
      }}
      {...rest}
    >
      {dot && <span className="k-pill__dot" aria-hidden="true" />}
      <Roll>{children}</Roll>
    </a>
  )
}

/** Small uppercase tags joined by bullets: "WEB • DISEÑO • DESARROLLO". */
export function Tags({ items, className = "" }: { items: string[]; className?: string }) {
  return <p className={`k-tag ${className}`}>{items.join(" • ")}</p>
}
