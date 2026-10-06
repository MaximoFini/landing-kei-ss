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
    // Two strokes per layer: the line up to where it leaves on the right, and
    // from where it comes back in on the left. (One path with a second `M`
    // would restart the dash pattern there, so the re-entry would draw itself.)
    const [outs, ins] = [0, 1].map((i) => roots.map((r) => r.querySelectorAll("path")[i] as SVGPathElement))
    const paths = [...outs, ...ins]

    let total = 0
    let first = 0 // length of the stroke before the jump
    let ys: number[] = [] // running max of y per sample keeps the lookup monotonic
    let shown = 0 // drawn length on screen
    let target = 0
    let frame = 0
    let last = 0
    let hideY = Infinity // the tip waits here until the right-hand exit has scrolled out of view
    let backY = 0 // where it comes back in on the left

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
      const [ST, SV, RE, PR, , , TE, CL] = [0, 1, 2, 3, 4, 5, 6, 7]
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

      // Right margin → off the right edge beside the Reel, then back in from the
      // left edge lower down the same card.
      const turn = Math.max(56, margin * 0.9)
      const card = (s[RE].querySelector("a") ?? s[RE]).getBoundingClientRect()
      const cTop = card.top - base.top
      const out = cTop + card.height * 0.15
      const back = cTop + card.height * 0.6
      // Left margin → centre, in the gap between Team and the closing question.
      const g2a = bottom[TE] - pad * 0.85
      const g2b = top[CL] + pad * 0.6

      hideY = out + turn + stroke
      backY = back
      d.push(
        `L ${p(R, Math.max(laneY, out))}`,
        `C ${p(R, out + turn * 0.55)} ${p(R + turn * 0.45, out + turn)} ${p(W + stroke * 2, out + turn)}`,
      )
      const d2 = [
        `M ${p(-stroke * 2, back)}`,
        `C ${p(L - turn * 0.45, back)} ${p(L, back + turn * 0.45)} ${p(L, back + turn)}`,
        `L ${p(L, g2a)}`,
        cross(L, g2a, W / 2, g2b),
      ]

      roots.forEach((r) => r.setAttribute("viewBox", `0 0 ${W} ${H}`))
      const set = (els: SVGPathElement[], dStr: string) =>
        els.forEach((el) => {
          el.setAttribute("d", dStr)
          el.setAttribute("stroke-width", stroke.toFixed(1))
        })
      set(outs, d.join(" "))
      set(ins, d2.join(" "))
      // Inside the Statement the arc stays behind the headline; past it, on top of everything.
      roots[1].style.clipPath = `inset(${bottom[ST].toFixed(0)}px 0 0 0)`

      first = outs[0].getTotalLength()
      total = first + ins[0].getTotalLength()
      const at = (l: number) => (l <= first ? outs[0].getPointAtLength(l) : ins[0].getPointAtLength(l - first))
      const n = 900
      ys = []
      let max = -Infinity
      for (let i = 0; i <= n; i++) {
        max = Math.max(max, at((i / n) * total).y)
        ys.push(max)
      }
      paths.forEach((el) => {
        const len = el.getTotalLength()
        el.style.strokeDasharray = `${len} ${len}`
      })
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
      const vh = window.innerHeight
      const viewTop = -host.getBoundingClientRect().top
      const y = viewTop + vh * 0.62
      if (viewTop < hideY) {
        // Don't re-enter on the left while the exit on the right is still on screen.
        target = lenAt(Math.min(y, hideY - 1))
        return
      }
      // Once it's gone the reader is already past the entry: start the tip at the
      // entry and let it catch up with the reader over most of a screen, not in one jump.
      const release = hideY + vh * 0.62
      const lag = Math.max(0, release - backY)
      target = lenAt(y - lag * Math.max(0, 1 - (y - release) / (vh * 0.9)))
    }

    const paint = () => {
      const draw = (els: SVGPathElement[], len: number, l: number) =>
        els.forEach((el) => {
          el.style.strokeDashoffset = String(len - l)
          el.style.opacity = l > 1 ? "1" : "0" // the round cap would paint a lone dot at zero length
        })
      draw(outs, first, Math.min(shown, first))
      draw(ins, total - first, Math.max(0, shown - first))
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
