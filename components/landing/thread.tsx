"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "@/lib/motion"

/** Strokes per layer: the line is cut into one stroke between each pair of edge wraps. */
const MAX_SEGS = 4
/** Section-title nodes on desktop. */
const MAX_NODES = 5

type Wrap = { dir: "R" | "L"; out: number; back: number }

/**
 * The blue thread — Lusion's arc, carried through the whole page. It opens as
 * the Statement's sweep (behind the headline), then runs straight down the
 * page margins on top of everything, changing sides only in the empty gaps
 * between sections, and lands right above the closing question. Its tip eases
 * after the reader's line at ~62% of the viewport.
 *
 * It also plays snake: it leaves through one edge and comes back through the
 * opposite one (three times on a phone, twice on desktop), with straight runs
 * between. On desktop it also sweeps across the page behind the testimonials
 * headline, and swells into a node beside each section title it reaches.
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
    // One stroke per run between edge wraps, on both layers. (One path with a
    // second `M` would restart the dash pattern there, so the re-entry would
    // draw itself.)
    const layers = roots.map((r) => Array.from(r.querySelectorAll("path")) as SVGPathElement[])

    const nodeEls = Array.from(roots[1].querySelectorAll<SVGGElement>("g[data-node]"))
    let nodes: { len: number }[] = []
    let nodeR = 0

    let total = 0
    let nSegs = 0
    let segLen: number[] = [] // length of each stroke
    let segAt: number[] = [] // where each stroke starts along the whole line
    let ys: number[] = [] // running max of y per sample keeps the lookup monotonic
    let shown = 0 // drawn length on screen
    let target = 0
    let frame = 0
    let last = 0
    // Per wrap: the tip waits at `hideY` until the exit has scrolled out of view, then resumes at `backY`.
    let gates: { hideY: number; backY: number }[] = []

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
      const [ST, SV, RE, PR, , VO, TE, CL] = [0, 1, 2, 3, 4, 5, 6, 7]
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

      // Each wrap flips the side: out through the right edge and in on the left,
      // then out through the left edge and in on the right, and so on.
      const wraps: Wrap[] = [{ dir: "R", out, back }]
      const cards = Array.from(s[PR].querySelector("ul")?.children ?? [])
      if (cards.length >= 3) {
        const c = cards[2].getBoundingClientRect()
        const o2 = c.top - base.top + c.height * 0.35
        wraps.push({ dir: "L", out: o2, back: o2 + turn + 90 })
        // A phone gets a third wrap; desktop sweeps behind the testimonials headline instead.
        if (mobile) {
          const o3 = top[VO] + (bottom[VO] - top[VO]) * 0.42
          wraps.push({ dir: "R", out: o3, back: o3 + turn + 90 })
        }
      }
      // Desktop: cross the whole page behind the testimonials headline.
      const head = mobile ? null : s[VO].querySelector<HTMLElement>("#voces-title")?.getBoundingClientRect()
      const swoop = head ? { y0: head.top - base.top - 30, y1: head.bottom - base.top + 50 } : null
      const laneOf = (dir: "R" | "L") => (dir === "R" ? R : L)
      // Down the lane to `y`, then round the corner and off the edge.
      const exit = (dir: "R" | "L", y: number, to: number) => {
        const x = laneOf(dir)
        const sign = dir === "R" ? 1 : -1
        const edge = dir === "R" ? W + stroke * 2 : -stroke * 2
        return `L ${p(x, y)} C ${p(x, to + turn * 0.55)} ${p(x + sign * turn * 0.45, to + turn)} ${p(edge, to + turn)}`
      }
      // In from the opposite edge, round the corner and into the other lane.
      const enter = (dir: "R" | "L", y: number) => {
        const x = laneOf(dir === "R" ? "L" : "R")
        const sign = dir === "R" ? -1 : 1
        const edge = dir === "R" ? -stroke * 2 : W + stroke * 2
        return `M ${p(edge, y)} C ${p(x + sign * turn * 0.45, y)} ${p(x, y + turn * 0.45)} ${p(x, y + turn)}`
      }

      const segs = [[...d, exit("R", Math.max(laneY, out), out)].join(" ")]
      wraps.forEach((w, i) => {
        const next = wraps[i + 1]
        let lane = laneOf(w.dir === "R" ? "L" : "R")
        if (next) {
          segs.push(`${enter(w.dir, w.back)} ${exit(next.dir, next.out, next.out)}`)
          return
        }
        let tail = enter(w.dir, w.back)
        if (swoop) {
          const to = lane === R ? L : R
          tail += ` L ${p(lane, swoop.y0)} ${cross(lane, swoop.y0, to, swoop.y1)}`
          lane = to
        }
        segs.push(`${tail} L ${p(lane, g2a)} ${cross(lane, g2a, W / 2, g2b)}`)
      })
      gates = wraps.map((w) => ({ hideY: w.out + turn + stroke, backY: w.back }))

      nSegs = segs.length
      roots.forEach((r) => r.setAttribute("viewBox", `0 0 ${W} ${H}`))
      layers.forEach((els) =>
        els.forEach((el, i) => {
          el.setAttribute("d", segs[i] ?? "")
          el.setAttribute("stroke-width", stroke.toFixed(1))
        }),
      )
      // Inside the Statement the arc stays behind the headline; past it, on top of everything.
      roots[1].style.clipPath = `inset(${bottom[ST].toFixed(0)}px 0 0 0)`
      // Across the testimonials headline only the back layer shows, so the line passes behind the text.
      const mask = swoop
        ? `linear-gradient(to bottom, #000 ${swoop.y0.toFixed(0)}px, transparent ${swoop.y0.toFixed(0)}px, transparent ${swoop.y1.toFixed(0)}px, #000 ${swoop.y1.toFixed(0)}px)`
        : "none"
      roots[1].style.maskImage = mask
      roots[1].style.setProperty("-webkit-mask-image", mask)

      segLen = layers[0].map((el, i) => (i < nSegs ? el.getTotalLength() : 0))
      segAt = segLen.map((_, i) => segLen.slice(0, i).reduce((a, b) => a + b, 0))
      total = segAt[nSegs - 1] + segLen[nSegs - 1]
      const at = (l: number) => {
        let i = nSegs - 1
        while (i > 0 && l < segAt[i]) i--
        return layers[0][i].getPointAtLength(Math.min(segLen[i], l - segAt[i]))
      }
      const n = 1200
      ys = []
      let max = -Infinity
      for (let i = 0; i <= n; i++) {
        max = Math.max(max, at((i / n) * total).y)
        ys.push(max)
      }
      layers.forEach((els) =>
        els.forEach((el, i) => {
          el.style.strokeDasharray = `${segLen[i]} ${segLen[i]}`
        }),
      )

      // Desktop: a node on the lane beside each section title; it swells as the tip reaches it.
      nodes = []
      nodeR = Math.min(stroke * 0.85, margin * 0.42)
      const titles = mobile ? [] : ["servicios-title", "proyectos-title", "proceso-title", "equipo-title"]
      const nodeAt: { x: number; y: number; len: number }[] = []
      titles.forEach((id) => {
        const el = body.querySelector<HTMLElement>(`#${id}`)
        if (!el) return
        const fs = parseFloat(getComputedStyle(el).fontSize) || 48
        const y = el.getBoundingClientRect().top - base.top + fs * 0.5
        const len = lenAt(y)
        const pt = at(len)
        // Only where the line is running straight down a lane, not mid-curve.
        const x = Math.abs(pt.x - L) < 3 ? L : Math.abs(pt.x - R) < 3 ? R : null
        if (x !== null) nodeAt.push({ x, y, len })
      })
      nodes = nodeAt.map((n) => ({ len: n.len }))
      nodeEls.forEach((g, i) => {
        const n = nodeAt[i]
        g.style.transformBox = "fill-box"
        g.style.transformOrigin = "center"
        const [ring, dot] = Array.from(g.querySelectorAll("circle"))
        if (!n) return
        ;[ring, dot].forEach((c) => {
          c.setAttribute("cx", n.x.toFixed(1))
          c.setAttribute("cy", n.y.toFixed(1))
        })
        ring.setAttribute("r", nodeR.toFixed(1))
        dot.setAttribute("r", (nodeR * 0.4).toFixed(1))
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
      let y = viewTop + vh * 0.62
      // The wrap the reader has most recently scrolled past, if any.
      let j = -1
      gates.forEach((g, i) => {
        if (viewTop >= g.hideY) j = i
      })
      if (j >= 0) {
        // Once it's gone the reader is already past the entry: start the tip at the
        // entry and let it catch up with the reader over most of a screen, not in one jump.
        const release = gates[j].hideY + vh * 0.62
        const lag = Math.max(0, release - gates[j].backY)
        y -= lag * Math.max(0, 1 - (y - release) / (vh * 0.9))
      }
      // Don't re-enter on the far side while the next exit is still on screen.
      const next = gates[j + 1]
      target = lenAt(next ? Math.min(y, next.hideY - 1) : y)
    }

    const paint = () => {
      layers.forEach((els) =>
        els.forEach((el, i) => {
          const l = i < nSegs ? Math.min(segLen[i], Math.max(0, shown - segAt[i])) : 0
          el.style.strokeDashoffset = String(segLen[i] - l)
          el.style.opacity = l > 1 ? "1" : "0" // the round cap would paint a lone dot at zero length
        }),
      )
      nodeEls.forEach((g, i) => {
        const n = nodes[i]
        const t = n ? Math.min(1, Math.max(0, (shown - n.len) / (nodeR * 3))) : 0
        g.style.opacity = t > 0 ? "1" : "0"
        g.style.transform = `scale(${1 - (1 - t) ** 3})`
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

  const layer = (ref: React.RefObject<SVGSVGElement | null>, z: string, withNodes = false) => (
    <svg ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${z}`} fill="none">
      {Array.from({ length: MAX_SEGS }, (_, i) => (
        <path key={i} stroke="var(--k-blue)" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0 }} />
      ))}
      {withNodes &&
        Array.from({ length: MAX_NODES }, (_, i) => (
          <g key={i} data-node="" style={{ opacity: 0 }}>
            <circle fill="var(--k-blue)" />
            <circle fill="var(--k-ground)" />
          </g>
        ))}
    </svg>
  )

  return (
    <div ref={wrap} className="relative">
      {layer(back, "z-0")}
      <div ref={content} className="relative z-[1]">
        {children}
      </div>
      {layer(front, "z-[2]", true)}
    </div>
  )
}
