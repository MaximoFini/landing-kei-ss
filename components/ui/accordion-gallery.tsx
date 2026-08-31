"use client"

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react"
import Image from "next/image"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export interface AccordionGalleryItem {
  image: string
  label?: string
  meta?: string
  tags?: string[]
  link?: string
  alt?: string
  position?: string
}

interface AccordionGalleryProps {
  items: AccordionGalleryItem[]
  defaultIndex?: number
  accentColor?: string
  overlayColor?: string
  textColor?: string
  height?: number
  /** Fixed height of each card in the mobile stack (px). */
  mobileCardHeight?: number
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

interface PanelProps {
  item: AccordionGalleryItem
  i: number
  active: number
  isMobile: boolean
  mobileCardHeight: number
  eagerImage: boolean
  grow: number
  duration: number
  radius: number
  accentColor: string
  overlayColor: string
  textColor: string
  grayscale: boolean
  trigger: "hover" | "click"
  setActive: (index: number) => void
  handleKey: (i: number, e: KeyboardEvent) => void
  registerPanelEl: (i: number, el: HTMLElement | null) => void
}

function AccordionPanel({
  item,
  i,
  active,
  isMobile,
  mobileCardHeight,
  eagerImage,
  grow,
  duration,
  radius,
  accentColor,
  overlayColor,
  textColor,
  grayscale,
  trigger,
  setActive,
  handleKey,
  registerPanelEl,
}: PanelProps) {
  const isActive = i === active
  const Tag = item.link ? "a" : "div"

  const panelRef = useRef<HTMLAnchorElement & HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const touchMoved = useRef(false)
  const touchStartPos = useRef<{ x: number; y: number } | null>(null)

  // Floating cursor tooltip (desktop only) — snappy spring physics.
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 450, damping: 26 })
  const springY = useSpring(mouseY, { stiffness: 450, damping: 26 })

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isMobile || !panelRef.current) return
    const rect = panelRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchMoved.current = false
    const touch = e.touches[0]
    if (touch) {
      touchStartPos.current = { x: touch.clientX, y: touch.clientY }
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (touch && touchStartPos.current) {
      const dx = Math.abs(touch.clientX - touchStartPos.current.x)
      const dy = Math.abs(touch.clientY - touchStartPos.current.y)
      if (dx > 10 || dy > 10) {
        touchMoved.current = true
      }
    }
  }

  const handleClick = (e: React.MouseEvent) => {
    // If the finger was scrolling/gliding, cancel click navigation.
    if (touchMoved.current) {
      touchMoved.current = false
      e.preventDefault()
      e.stopPropagation()
      return
    }

    // Desktop: first click on a collapsed panel expands it instead of navigating.
    if (!isMobile && !isActive) {
      e.preventDefault()
      e.stopPropagation()
      setActive(i)
      return
    }

    // Otherwise the native <a target="_blank"> navigation proceeds.
  }

  const panelStyle: CSSProperties = isMobile
    ? {
        // Fixed height — nothing about the layout changes as the active card
        // moves, so the reveal never reflows the page. The "activation" is
        // done purely with opacity + transform inside the card.
        position: "relative",
        height: mobileCardHeight,
        borderRadius: `${radius}px`,
        transition: "box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        boxShadow: isActive
          ? `0 22px 55px -26px ${accentColor}66`
          : "0 12px 30px -20px rgba(5,11,28,0.55)",
      }
    : {
        borderRadius: `${radius}px`,
        flexGrow: isActive ? grow : 1,
        flexBasis: 0,
        willChange: "flex-grow",
        transform: "translateZ(0)",
        transition: `flex-grow ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
        boxShadow: isActive
          ? `0 24px 60px -24px ${accentColor}66`
          : "0 10px 30px -20px rgba(5,11,28,0.6)",
      }

  return (
    <Tag
      ref={(el: (HTMLAnchorElement & HTMLDivElement) | null) => {
        panelRef.current = el
        registerPanelEl(i, el)
      }}
      key={i}
      data-index={i}
      {...(item.link
        ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      role="listitem"
      tabIndex={0}
      aria-current={isActive ? "true" : undefined}
      aria-label={item.label}
      onMouseEnter={() => {
        if (isMobile) return
        setIsHovered(true)
        if (trigger === "hover") setActive(i)
      }}
      onMouseLeave={() => setIsHovered(false)}
      onPointerMove={handlePointerMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onFocus={() => setActive(i)}
      onClick={handleClick}
      onKeyDown={(e) => handleKey(i, e)}
      className="group relative block min-h-0 min-w-0 cursor-pointer overflow-hidden bg-[#0a0713] no-underline outline-none focus-visible:ring-2 focus-visible:ring-[#3f7dff]"
      style={panelStyle}
    >
      {/* Floating cursor tooltip — desktop only */}
      {item.link && !isMobile && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute z-30 hidden sm:flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold tracking-wider text-[#050b1c] shadow-[0_12px_32px_rgba(0,0,0,0.4)] backdrop-blur-md border border-white/40 uppercase"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-135%",
            opacity: isHovered && isActive ? 1 : 0,
            scale: isHovered && isActive ? 1 : 0.7,
            transition: "opacity 0.2s ease, scale 0.2s ease",
          }}
        >
          <span>CONOCÉ MÁS</span>
          <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5] text-[#1a4fc0]" />
        </motion.div>
      )}

      {/* Media + image */}
      <div className="absolute inset-0 block h-full w-full overflow-hidden [border-radius:inherit]">
        <div
          className="absolute inset-0 block h-full w-full sm:transition-[filter] sm:duration-[600ms] sm:ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            filter:
              grayscale && !isActive && !isMobile
                ? "grayscale(0.85)"
                : "grayscale(0)",
            // Mobile: the cover eases from a slight zoom to rest as the card
            // becomes active — a compositor-only transform, no repaint.
            transform: isMobile
              ? isActive
                ? "scale(1)"
                : "scale(1.06)"
              : undefined,
            transition: isMobile
              ? "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
              : undefined,
            willChange: isMobile ? "transform" : undefined,
          }}
        >
          <Image
            src={item.image}
            alt={item.alt || item.label || ""}
            fill
            draggable={false}
            unoptimized={item.image.startsWith("data:")}
            loading={eagerImage ? "eager" : "lazy"}
            sizes="(max-width: 640px) 100vw, 60vw"
            className="block h-full w-full select-none object-cover"
            style={{
              width: "100%",
              height: "100%",
              minHeight: "100%",
              maxHeight: "100%",
              objectFit: "cover",
              objectPosition: item.position || "center center",
            }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            background: isActive
              ? `linear-gradient(180deg, transparent 40%, ${overlayColor}ee 100%)`
              : `linear-gradient(180deg, transparent 65%, ${overlayColor}77 100%)`,
          }}
          aria-hidden="true"
        />
      </div>

      {/* Caption */}
      <span
        className={`pointer-events-none absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-[2] flex flex-col gap-1 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive
            ? "translate-x-0 translate-y-0 opacity-100"
            : "translate-y-2 opacity-0 pointer-events-none sm:translate-y-0 sm:-translate-x-3"
        }`}
      >
        {item.meta && (
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
            {item.meta}
          </span>
        )}
        <span className="flex items-center justify-between gap-2.5">
          <span className="flex items-center gap-2.5 min-w-0">
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

          {item.link && (
            <span
              className={`inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white/90 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 transition-all duration-300 ${
                isActive
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
            >
              <span>CONOCÉ MÁS</span>
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5] text-[#3f7dff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          )}
        </span>
      </span>
    </Tag>
  )
}

/**
 * Image accordion.
 *
 * Desktop (>768px): panels expand on hover/click via a compositor-friendly
 * `flex-grow` tween, with a React-Bits-style floating cursor tooltip.
 *
 * Mobile (<=768px): fixed-height card stack. Cards never change size, so the
 * page never reflows while scrolling. The card crossing a thin "reading band"
 * near the viewport centre becomes active — tracked with an IntersectionObserver
 * (browser-scheduled, no scroll listener, no per-frame getBoundingClientRect) —
 * and its activation is a pure opacity + transform transition (caption rises in,
 * cover eases out of a slight zoom, gradient deepens). 60fps scroll, and the
 * "cards open as you scroll" feel is kept.
 */
export function AccordionGallery({
  items,
  defaultIndex = 0,
  accentColor = "#3f7dff",
  overlayColor = "#050b1c",
  textColor = "#ffffff",
  height = 460,
  mobileCardHeight = 300,
  gap = 10,
  radius = 20,
  expandRatio = 0.55,
  duration = 0.38,
  trigger = "click",
  grayscale = true,
  className = "",
}: AccordionGalleryProps) {
  const count = items.length
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(
    Math.min(Math.max(defaultIndex, 0), count - 1)
  )
  // null until measured, so SSR/first paint doesn't assume a layout.
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const panelElsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const registerPanelEl = (i: number, el: HTMLElement | null) => {
    panelElsRef.current[i] = el
  }

  // Render the mobile stack until proven desktop — avoids a flash of the
  // desktop row on phones.
  const mobile = isMobile !== false

  // Mobile: the active card follows scroll position. An IntersectionObserver
  // with a thin root band (~6% of the viewport, a little above centre) means
  // exactly one card is "intersecting" at a time, and the browser schedules the
  // callbacks itself — no scroll handler, no rAF loop, no layout reads.
  useEffect(() => {
    if (!mobile || count === 0 || typeof IntersectionObserver === "undefined") {
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const idx = Number((entry.target as HTMLElement).dataset.index)
          if (!Number.isNaN(idx)) {
            setActive((prev) => (prev === idx ? prev : idx))
          }
        }
      },
      { rootMargin: "-44% 0px -50% 0px", threshold: 0 }
    )

    const els = panelElsRef.current.slice(0, count)
    els.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [mobile, count])

  const r = Math.min(Math.max(expandRatio, 0.2), 0.9)
  const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1

  const handleKey = (i: number, e: KeyboardEvent) => {
    if (mobile) return
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault()
      setActive((i + 1) % count)
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault()
      setActive((i - 1 + count) % count)
    }
  }

  return (
    <div
      ref={rootRef}
      role="list"
      aria-label="Galería de proyectos"
      className={`flex w-full max-w-full flex-col sm:flex-row ${className}`}
      style={{
        gap: `${gap}px`,
        height: mobile ? "auto" : `${height}px`,
        perspective: mobile ? undefined : "1600px",
      }}
    >
      {items.map((item, i) => (
        <AccordionPanel
          key={i}
          item={item}
          i={i}
          active={active}
          isMobile={mobile}
          mobileCardHeight={mobileCardHeight}
          eagerImage={false}
          grow={grow}
          duration={duration}
          radius={radius}
          accentColor={accentColor}
          overlayColor={overlayColor}
          textColor={textColor}
          grayscale={grayscale}
          trigger={trigger}
          setActive={setActive}
          handleKey={handleKey}
          registerPanelEl={registerPanelEl}
        />
      ))}
    </div>
  )
}
