"use client"

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export interface AccordionGalleryItem {
  image: string
  label?: string
  meta?: string
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
}

function AccordionPanel({
  item,
  i,
  active,
  isStacked,
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
}: PanelProps) {
  const isActive = i === active
  const Tag = item.link ? "a" : "div"
  const rot = isActive ? 0 : i < active ? tilt : -tilt
  const drift = Math.max(-1.5, Math.min(1.5, active - i))

  const panelRef = useRef<HTMLAnchorElement & HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Floating cursor tooltip (React Bits Tilted Card style)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 380, damping: 28 })
  const springY = useSpring(mouseY, { stiffness: 380, damping: 28 })

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!panelRef.current) return
    const rect = panelRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const panelStyle: CSSProperties = {
    borderRadius: `${radius}px`,
    flexGrow: isStacked ? 1 : isActive ? grow : 1,
    flexBasis: 0,
    transition: `flex-grow ${duration}s cubic-bezier(0.22,1,0.36,1)`,
    minHeight: isStacked ? (isActive ? 320 : 88) : undefined,
    boxShadow: isActive
      ? `0 24px 60px -24px ${accentColor}66`
      : "0 10px 30px -20px rgba(5,11,28,0.6)",
  }

  return (
    <Tag
      ref={panelRef as any}
      key={i}
      {...(item.link
        ? { href: item.link, target: "_blank", rel: "noopener noreferrer" }
        : {})}
      role="listitem"
      tabIndex={0}
      aria-current={isActive ? "true" : undefined}
      aria-label={item.label}
      onMouseEnter={() => {
        setIsHovered(true)
        if (trigger === "hover") setActive(i)
      }}
      onMouseLeave={() => setIsHovered(false)}
      onPointerMove={handlePointerMove}
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
          className="absolute inset-0 block h-full w-full transition-[filter] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            filter: grayscale && !isActive ? "grayscale(0.85)" : "grayscale(0)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.image}
            alt={item.alt || item.label || ""}
            draggable={false}
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
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
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
      {items.map((item, i) => (
        <AccordionPanel
          key={i}
          item={item}
          i={i}
          active={active}
          isStacked={isStacked}
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
        />
      ))}
    </div>
  )
}
