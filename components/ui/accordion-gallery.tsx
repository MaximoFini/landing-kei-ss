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

const STACKED_COLLAPSED_HEIGHT = 88
const STACKED_EXPANDED_HEIGHT = 340

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
  isStacked: boolean
  stackedTop: number
  grow: number
  tilt: number
  parallax: number
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
  isStacked,
  stackedTop,
  grow,
  tilt,
  parallax,
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

  // Floating cursor tooltip (Snappy, ultra-fluid spring physics)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 450, damping: 26 })
  const springY = useSpring(mouseY, { stiffness: 450, damping: 26 })

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!panelRef.current) return
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
    // If the user was scrolling/gliding with finger, cancel click navigation
    if (touchMoved.current) {
      touchMoved.current = false
      e.preventDefault()
      e.stopPropagation()
      return
    }

    // 1st click/tap on mobile: if card is not active, expand it and DO NOT open link
    if (!isActive) {
      e.preventDefault()
      e.stopPropagation()
      setActive(i)
      return
    }

    // 2nd click/tap: when already active, native link navigation proceeds to target="_blank"
  }

  const panelStyle: CSSProperties = isStacked
    ? {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        // Position via `transform` (compositor-only) rather than animating
        // `top`, and keep the layer hot + layout-isolated so the height tween
        // never reflows its neighbours. The accordion's total height never
        // changes (see stackedTops in the parent), so opening a card never
        // shifts the page's scroll position under the user.
        transform: `translate3d(0, ${stackedTop}px, 0)`,
        height: isActive ? STACKED_EXPANDED_HEIGHT : STACKED_COLLAPSED_HEIGHT,
        borderRadius: `${radius}px`,
        willChange: "transform, height",
        contain: "layout",
        transition: `transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1), height ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`,
        boxShadow: isActive
          ? `0 24px 60px -24px ${accentColor}66`
          : "0 10px 30px -20px rgba(5,11,28,0.6)",
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
        setIsHovered(true)
        if (trigger === "hover" && !isStacked) setActive(i)
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
      {/* Floating cursor tooltip (React Bits Tilted Card style) */}
      {item.link && (
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
            filter: grayscale && !isActive ? "grayscale(0.85)" : "grayscale(0)",
            // On mobile the desaturation resolves in lock-step with the panel
            // open instead of trailing it by ~200ms.
            transition: isStacked
              ? `filter ${duration}s cubic-bezier(0.16, 1, 0.3, 1)`
              : undefined,
          }}
        >
          <Image
            src={item.image}
            alt={item.alt || item.label || ""}
            fill
            draggable={false}
            unoptimized={item.image.startsWith("data:")}
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
        className={`pointer-events-none absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 z-[2] flex flex-col gap-1 transition-all duration-300 ${
          isActive || isStacked
            ? "translate-x-0 opacity-100"
            : "-translate-x-3 opacity-0 pointer-events-none"
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
 * Image accordion — panels expand on hover/click revealing parallax imagery and
 * a caption with React Bits Tilted Card style cursor tooltip.
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
  duration = 0.38,
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
  const panelElsRef = useRef<(HTMLElement | null)[]>([])
  const scrollRafRef = useRef<number | null>(null)

  useEffect(() => {
    const check = () => setIsStacked(window.innerWidth <= 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const registerPanelEl = (i: number, el: HTMLElement | null) => {
    panelElsRef.current[i] = el
  }

  // Mobile: the open card follows scroll position instead of tap/hover — the
  // panel whose center sits closest to a fixed "reading line" near the top
  // of the viewport becomes active, so the first project is already open on
  // arrival and each new one takes over (closing the previous) as it scrolls
  // into that line.
  useEffect(() => {
    if (!isStacked) return

    const READING_LINE = 0.38 // fraction of viewport height

    const computeActive = () => {
      scrollRafRef.current = null
      const targetY = window.innerHeight * READING_LINE
      let closest = 0
      let closestDist = Infinity
      panelElsRef.current.forEach((el, i) => {
        if (!el) return
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const dist = Math.abs(center - targetY)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      })
      setActive((prev) => (prev === closest ? prev : closest))
    }

    const onScroll = () => {
      if (scrollRafRef.current != null) return
      scrollRafRef.current = requestAnimationFrame(computeActive)
    }

    computeActive()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (scrollRafRef.current != null) cancelAnimationFrame(scrollRafRef.current)
    }
  }, [isStacked, count])

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

  // Cumulative top offset of each panel so the container's total height
  // (one expanded + the rest collapsed, plus gaps) never changes as `active`
  // moves — only individual panels reposition, so the page never jumps.
  let stackedTotalHeight = 0
  const stackedTops: number[] = []
  for (let i = 0; i < count; i++) {
    stackedTops.push(stackedTotalHeight)
    stackedTotalHeight +=
      (i === active ? STACKED_EXPANDED_HEIGHT : STACKED_COLLAPSED_HEIGHT) + gap
  }
  stackedTotalHeight -= count > 0 ? gap : 0

  return (
    <div
      ref={rootRef}
      role="list"
      aria-label="Galería de proyectos"
      className={`flex w-full max-w-full flex-col sm:flex-row ${className}`}
      style={{
        gap: isStacked ? 0 : `${gap}px`,
        position: isStacked ? "relative" : undefined,
        height: isStacked ? `${stackedTotalHeight}px` : `${height}px`,
        perspective: isStacked ? undefined : "1600px",
      }}
    >
      {items.map((item, i) => (
        <AccordionPanel
          key={i}
          item={item}
          i={i}
          active={active}
          isStacked={isStacked}
          stackedTop={stackedTops[i]}
          grow={grow}
          tilt={tilt}
          parallax={parallax}
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
