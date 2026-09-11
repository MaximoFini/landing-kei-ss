"use client"

import { useLayoutEffect, useRef, type ReactNode } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Hands one section over to the next: the outgoing block parks itself against
 * the bottom of the viewport while the incoming one swings up over it, hinged
 * on its bottom-left corner.
 *
 * The hold is a ScrollTrigger pin with `pinSpacing: false`, so the incoming
 * panel scrolls straight over the parked one instead of being pushed below it.
 * Safe for the navbar's scrollspy only because the `#proyectos` anchor lives
 * outside this component — a pinned element is `position: fixed` and would
 * otherwise report a moving document position.
 */
export function StoryHandoff({
  outgoing,
  incoming,
  angle = 26,
}: {
  outgoing: ReactNode
  incoming: ReactNode
  /** Degrees the incoming panel is hinged open by before it swings shut. */
  angle?: number
}) {
  const rootRef = useRef<HTMLDivElement>(null)
  const parkRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: parkRef.current,
        start: "bottom bottom",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      })

      gsap.set(panelRef.current, { rotation: angle, transformOrigin: "bottom left" })
      gsap.to(panelRef.current, {
        rotation: 0,
        ease: "none",
        scrollTrigger: {
          trigger: panelRef.current,
          start: "top bottom",
          end: "top 25%",
          scrub: true,
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [angle])

  return (
    <div ref={rootRef} className="relative">
      <div ref={parkRef}>{outgoing}</div>

      {/* Clipped to its own box so the hinge reads as a clean diagonal edge,
          with the parked section showing through the gap it leaves behind. */}
      <div className="relative z-10 overflow-hidden">
        <div ref={panelRef} className="kei-hinge will-change-transform">
          {incoming}
        </div>
      </div>
    </div>
  )
}
