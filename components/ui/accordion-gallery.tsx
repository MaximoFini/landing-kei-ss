"use client"

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react"

export interface AccordionGalleryItem {
  image: string
  label?: string
  meta?: string
  link?: string
  alt?: string
}

interface AccordionGalleryProps {
  items: AccordionGalleryItem[]
  defaultIndex?: number
  accentColor?: string
  overlayColor?: string
  textColor?: string
  height?: number
  gap?: number
  radius?: number
  expandRatio?: number
  duration?: number
  tilt?: number
  parallax?: number
  trigger?: "hover" | "click"
  grayscale?: boolean
  className?: string
}

/**
 * Image accordion — panels expand on hover/click revealing parallax imagery and
 * a caption. Pure CSS transitions (flex-grow + transform), no animation libs.
 * Adapted from the React Bits "Accordion Gallery" pattern.
 */
export function AccordionGallery({
  items,
  defaultIndex = 0,
  accentColor = "#3f7dff",
  overlayColor = "#050b1c",
  textColor = "#ffffff",
  height = 460,
  gap = 10,
  radius = 20,
  expandRatio = 0.55,
  duration = 0.6,
  tilt = 6,
  parallax = 40,
  trigger = "click",
  grayscale = true,
  className = "",
}: AccordionGalleryProps) {
  const count = items.length
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(
    Math.min(Math.max(defaultIndex, 0), count - 1)
  )
  const [isStacked, setIsStacked] = useState(false)

  useEffect(() => {
    const check = () => setIsStacked(window.innerWidth <= 640)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const r = Math.min(Math.max(expandRatio, 0.2), 0.9)
  const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1

  const handleKey = (i: number, e: KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i + 1) % count)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i - 1 + count) % count)
    }
  }

  const overlayBg = `linear-gradient(180deg, transparent 35%, ${overlayColor}e6 100%)`

  return (
    <div
      ref={rootRef}
      role="list"
      aria-label="Galería de proyectos"
      className={`flex w-full max-w-full flex-col sm:flex-row ${className}`}
      style={{
        gap: `${gap}px`,
        height: isStacked ? "auto" : `${height}px`,
        perspective: isStacked ? undefined : "1600px",
      }}
    >
      {items.map((item, i) => {
        const isActive = i === active
        const Tag = item.link ? "a" : "div"
        const rot = isActive ? 0 : i < active ? tilt : -tilt
        const drift = Math.max(-1.5, Math.min(1.5, active - i))

        const panelStyle: CSSProperties = {
          borderRadius: `${radius}px`,
          flexGrow: isStacked ? 1 : isActive ? grow : 1,
          flexBasis: 0,
          transform: isStacked ? undefined : `rotateY(${rot}deg)`,
          transformOrigin: "center",
          transformStyle: "preserve-3d",
          transition: `flex-grow ${duration}s cubic-bezier(0.22,1,0.36,1), transform ${duration}s cubic-bezier(0.22,1,0.36,1)`,
          minHeight: isStacked ? (isActive ? 320 : 88) : undefined,
          boxShadow: isActive
            ? `0 24px 60px -24px ${accentColor}66`
            : "0 10px 30px -20px rgba(5,11,28,0.6)",
        }

        return (
          <Tag
            key={i}
            {...(item.link ? { href: item.link } : {})}
            role="listitem"
            tabIndex={0}
            aria-current={isActive ? "true" : undefined}
            aria-label={item.label}
            onMouseEnter={trigger === "hover" ? () => setActive(i) : undefined}
            onFocus={() => setActive(i)}
            onClick={(e) => {
              if (!isActive) {
                e.preventDefault()
                setActive(i)
              }
            }}
            onKeyDown={(e) => handleKey(i, e)}
            className="group relative block min-h-0 min-w-0 cursor-pointer overflow-hidden bg-[#0a0713] no-underline outline-none focus-visible:ring-2 focus-visible:ring-[#3f7dff]"
            style={panelStyle}
          >
            {/* Media + parallax */}
            <span className="absolute inset-0 overflow-hidden [border-radius:inherit]">
              <span
                className="absolute inset-0 transition-[transform,filter] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: isStacked
                    ? undefined
                    : `translateX(${isActive ? 0 : drift * parallax * 0.5}px) scale(1.08)`,
                  filter: grayscale && !isActive ? "grayscale(1)" : "grayscale(0)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.alt || item.label || ""}
                  draggable={false}
                  className="h-full w-full select-none object-cover"
                />
              </span>
              <span
                className="pointer-events-none absolute inset-0"
                style={{ background: overlayBg }}
                aria-hidden="true"
              />
            </span>

            {/* Caption */}
            <span
              className={`pointer-events-none absolute bottom-5 left-5 right-5 z-[2] flex flex-col gap-1 transition-all duration-500 ${
                isActive || isStacked
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-3 opacity-0"
              }`}
            >
              {item.meta && (
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
                  {item.meta}
                </span>
              )}
              <span className="flex items-center gap-2.5">
                <span
                  className="h-6 w-[3px] flex-none rounded-full"
                  style={{
                    background: accentColor,
                    boxShadow: `0 0 12px ${accentColor}99`,
                  }}
                />
                <span
                  className="truncate font-google-sans text-[clamp(1rem,1.5vw,1.4rem)] font-[450]"
                  style={{ color: textColor }}
                >
                  {item.label}
                </span>
              </span>
            </span>
          </Tag>
        )
      })}
    </div>
  )
}
