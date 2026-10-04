"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/lib/motion"

/**
 * The blue thread — Lusion's arc, carried through the whole page. It opens as
 * the Statement's sweep (behind the headline), then runs straight down the
 * page margins on top of everything, changing sides only in the empty gaps
 * between sections, and lands right above the closing question. Its tip eases
 * after the reader's line at ~62% of the viewport.
 */
export function Thread({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const back = useRef<SVGSVGElement>(null)
  const front = useRef<SVGSVGElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const host = wrap.current
    const body = content.current
    const svgs = [back.current, front.current]
    if (!host || !body || !svgs[0] || !svgs[1]) return
    const roots = svgs as SVGSVGElement[]
    const paths = roots.map((r) => r.querySelector("path") as SVGPathElement)

    let total = 0
    let ys: number[] = [] // running max of y per sample keeps the lookup monotonic
    let shown = 0 // drawn length on screen
    let target = 0
    let frame = 0
    let last = 0

    // Path length whose y still sits above `y` (interpolated so the tip moves continuously).
    const lenAt = (y: number) => {
      if (!total || y < ys[0]) return 0
      let lo = 0
      let hi = ys.length - 1
      while (lo < hi) {
        const mid = (lo + hi + 1) >> 1
        if (ys[mid] <= y) lo = mid
        else hi = mid - 1
      }
      const next = Math.min(lo + 1, ys.length - 1)
      const span = ys[next] - ys[lo]
      const f = span > 0 ? Math.min(1, Math.max(0, (y - ys[lo]) / span)) : 0
      return ((lo + f) / (ys.length - 1)) * total
    }

    const build = () => {
      const W = host.clientWidth
      const H = host.clientHeight
      const s = Array.from(body.children) as HTMLElement[]
      if (s.length < 8 || !W) return
      const [ST, SV, , PR, PC, , TE, CL] = [0, 1, 2, 3, 4, 5, 6, 7]
      const base = body.getBoundingClientRect()
      const rect = s.map((n) => n.getBoundingClientRect())
      const top = rect.map((r) => r.top - base.top)
      const bottom = rect.map((r) => r.bottom - base.top)
      const mobile = W < 768
      const pad = parseFloat(getComputedStyle(s[CL]).paddingTop) || 120

      // The lanes sit in the middle of the page margin, so content never covers the line.
      const wrapEl = s[SV].querySelector<HTMLElement>(".k-wrap")
      const margin = wrapEl
        ? wrapEl.getBoundingClientRect().left - base.left + parseFloat(getComputedStyle(wrapEl).paddingLeft)
        : 20
      const stroke = Math.min(50, Math.max(8, Math.min(W * 0.026, margin * 0.62)))
      const L = margin / 2
      const R = W - margin / 2

      const p = (x: number, y: number) => `${x.toFixed(1)} ${y.toFixed(1)}`
      // Vertical-tangent S-curve between two lanes.
      const cross = (fx: number, fy: number, tx: number, ty: number) => {
        const k = (ty - fy) * 0.55
        return `C ${p(fx, fy + k)} ${p(tx, ty - k)} ${p(tx, ty)}`
      }

      const d: string[] = []
      let laneY: number // where the right lane starts
      if (mobile) {
        // Phone: sweep in above the headline and fall straight into the right lane.
        const title = s[ST].querySelector("#statement-title")?.getBoundingClientRect()
        const tTop = title ? title.top - base.top : top[ST] + pad
        const tBot = title ? title.bottom - base.top : tTop + 160
        const y0 = tTop - Math.max(28, pad * 0.35)
        laneY = tBot + 24
        d.push(`M ${p(-30, y0 + 18)}`, `C ${p(W * 0.45, y0 - 14)} ${p(R, y0 + 6)} ${p(R, Math.min(laneY, y0 + (tBot - y0) * 0.7))}`)
      } else {
        // Desktop: the Statement arc behind the headline, then across to the
        // right margin in the gap above Services.
        const sh = bottom[ST] - top[ST]
        const box = { x: -0.06 * W, y: top[ST] + 0.02 * sh, w: 0.62 * W, h: 0.78 * sh }
        const P = (x: number, y: number) => [box.x + (x / 600) * box.w, box.y + (y / 520) * box.h] as const
        const q = (pt: readonly [number, number]) => p(pt[0], pt[1])
        const [ex, ey] = P(438, 490)
        const [tx, ty] = P(470, 370)
        const len = Math.hypot(ex - tx, ey - ty) || 1
        const dir = [(ex - tx) / len, (ey - ty) / len]
        laneY = Math.max(top[SV] + (top[SV] - ey), ey + 240)
        const k = (laneY - ey) * 0.55
        d.push(
          `M ${q(P(-20, 70))}`,
          `C ${q(P(140, 40))} ${q(P(320, 60))} ${q(P(410, 170))}`,
          `C ${q(P(480, 255))} ${q(P(470, 370))} ${p(ex, ey)}`,
          `C ${p(ex + dir[0] * k, ey + dir[1] * k)} ${p(R, laneY - k)} ${p(R, laneY)}`,
        )
      }

      // Right margin → left margin in the empty gap between Projects and Process.
      const g1a = bottom[PR] - pad * 0.9
      const g1b = top[PC] - 6
      // Left margin → centre, in the gap between Team and the closing question.
      const g2a = bottom[TE] - pad * 0.85
      const g2b = top[CL] + pad * 0.6

      d.push(
        `L ${p(R, Math.max(laneY, g1a))}`,
        cross(R, Math.max(laneY, g1a), L, g1b),
        `L ${p(L, g2a)}`,
        cross(L, g2a, W / 2, g2b),
      )

      const dStr = d.join(" ")
      roots.forEach((r) => r.setAttribute("viewBox", `0 0 ${W} ${H}`))
      paths.forEach((el) => {
        el.setAttribute("d", dStr)
        el.setAttribute("stroke-width", stroke.toFixed(1))
      })
      // Inside the Statement the arc stays behind the headline; past it, on top of everything.
      roots[1].style.clipPath = `inset(${bottom[ST].toFixed(0)}px 0 0 0)`

      total = paths[0].getTotalLength()
      const n = 900
      ys = []
      let max = -Infinity
      for (let i = 0; i <= n; i++) {
        max = Math.max(max, paths[0].getPointAtLength((i / n) * total).y)
        ys.push(max)
      }
      paths.forEach((el) => (el.style.strokeDasharray = `${total} ${total}`))
      measure()
      shown = target
      paint()
    }

    // Length of path above the reader's line.
    const measure = () => {
      if (!total) return
      if (reduce) {
        target = total
        return
      }
      target = lenAt(window.innerHeight * 0.62 - host.getBoundingClientRect().top)
    }

    const paint = () => {
      const off = String(total - shown)
      const op = shown > 1 ? "1" : "0" // the round cap would paint a lone dot at zero length
      paths.forEach((el) => {
        el.style.strokeDashoffset = off
        el.style.opacity = op
      })
    }

    // Critically damped follow: the tip keeps pace with the scroll but glides
    // through the horizontal crossings instead of jumping.
    const tick = (now: number) => {
      const dt = Math.min(64, now - (last || now))
      last = now
      asked = now
      measure()
      shown += (target - shown) * (1 - Math.exp(-dt / 70))
      if (Math.abs(target - shown) < 0.5) shown = target
      paint()
      frame = shown === target ? 0 : requestAnimationFrame(tick)
    }
    let asked = 0
    const wake = () => {
      const now = performance.now()
      if (frame) {
        // Frames stalled (throttled or unpainted tab): jump straight to the reader's line.
        if (now - asked > 250) {
          measure()
          shown = target
          paint()
        }
        return
      }
      asked = now
      last = 0
      frame = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(() => build())
    ro.observe(body)
    build()
    window.addEventListener("scroll", wake, { passive: true })
    window.addEventListener("resize", wake)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", wake)
      window.removeEventListener("resize", wake)
    }
  }, [reduce])

  const layer = (ref: React.RefObject<SVGSVGElement | null>, z: string) => (
    <svg ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${z}`} fill="none">
      <path stroke="var(--k-blue)" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0 }} />
    </svg>
  )

  return (
    <div ref={wrap} className="relative">
      {layer(back, "z-0")}
      <div ref={content} className="relative z-[1]">
        {children}
      </div>
      {layer(front, "z-[2]")}
    </div>
  )
}
