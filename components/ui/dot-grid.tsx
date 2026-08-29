"use client"

import { useEffect, useRef } from "react"

interface Dot {
  cx: number
  cy: number
  ox: number
  oy: number
  vx: number
  vy: number
}

interface DotGridProps {
  dotSize?: number
  gap?: number
  baseColor?: string
  activeColor?: string
  proximity?: number
  shockRadius?: number
  shockStrength?: number
  className?: string
}

function hexToRgb(hex: string) {
  const m = hex.replace("#", "")
  return {
    r: parseInt(m.slice(0, 2), 16),
    g: parseInt(m.slice(2, 4), 16),
    b: parseInt(m.slice(4, 6), 16),
  }
}

/**
 * Interactive dot grid — dots brighten near the cursor, scatter on a click
 * shockwave and spring back. Canvas 2D, no external animation libs.
 */
export function DotGrid({
  dotSize = 3,
  gap = 34,
  baseColor = "#d3ddf2",
  activeColor = "#3f7dff",
  proximity = 130,
  shockRadius = 220,
  shockStrength = 4,
  className = "",
}: DotGridProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const pointer = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const base = hexToRgb(baseColor)
    const active = hexToRgb(activeColor)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = 0
    let height = 0
    let dpr = 1
    let visible = true

    const build = () => {
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const cell = dotSize + gap
      const cols = Math.max(1, Math.floor((width + gap) / cell))
      const rows = Math.max(1, Math.floor((height + gap) / cell))
      const offX = (width - (cell * cols - gap)) / 2 + dotSize / 2
      const offY = (height - (cell * rows - gap)) / 2 + dotSize / 2

      const dots: Dot[] = []
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const cx = offX + x * cell
          const cy = offY + y * cell
          dots.push({ cx, cy, ox: 0, oy: 0, vx: 0, vy: 0 })
        }
      }
      dotsRef.current = dots
    }

    build()

    const proxSq = proximity * proximity
    let raf = 0

    const frame = () => {
      raf = requestAnimationFrame(frame)
      if (!visible) return
      ctx.clearRect(0, 0, width, height)
      const { x: px, y: py } = pointer.current

      for (const d of dotsRef.current) {
        if (!reduce) {
          // spring back to origin
          d.vx += -d.ox * 0.12
          d.vy += -d.oy * 0.12
          d.vx *= 0.82
          d.vy *= 0.82
          d.ox += d.vx
          d.oy += d.vy
        }

        const dx = d.cx - px
        const dy = d.cy - py
        const dsq = dx * dx + dy * dy

        let r = base.r
        let g = base.g
        let b = base.b
        let radius = dotSize / 2
        if (dsq <= proxSq) {
          const t = 1 - Math.sqrt(dsq) / proximity
          r = Math.round(base.r + (active.r - base.r) * t)
          g = Math.round(base.g + (active.g - base.g) * t)
          b = Math.round(base.b + (active.b - base.b) * t)
          radius = dotSize / 2 + t * 1.4
        }

        ctx.beginPath()
        ctx.fillStyle = `rgb(${r},${g},${b})`
        ctx.arc(d.cx + d.ox, d.cy + d.oy, radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    frame()

    const toLocal = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      return { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }

    const onMove = (e: MouseEvent) => {
      const p = toLocal(e)
      pointer.current = p
    }
    const onLeave = () => {
      pointer.current = { x: -9999, y: -9999 }
    }
    const onClick = (e: MouseEvent) => {
      if (reduce) return
      const { x: cx, y: cy } = toLocal(e)
      for (const d of dotsRef.current) {
        const dist = Math.hypot(d.cx - cx, d.cy - cy)
        if (dist < shockRadius) {
          const falloff = Math.max(0, 1 - dist / shockRadius)
          const ang = Math.atan2(d.cy - cy, d.cx - cx)
          d.vx += Math.cos(ang) * shockStrength * falloff * 6
          d.vy += Math.sin(ang) * shockStrength * falloff * 6
        }
      }
    }

    const ro = new ResizeObserver(build)
    ro.observe(wrap)
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting), {
      threshold: 0.01,
    })
    io.observe(wrap)
    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseleave", onLeave)
    window.addEventListener("click", onClick)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("click", onClick)
    }
  }, [dotSize, gap, baseColor, activeColor, proximity, shockRadius, shockStrength])

  return (
    <div ref={wrapRef} className={`pointer-events-none absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
