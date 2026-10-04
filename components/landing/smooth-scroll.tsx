"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

/** Leaves room for the floating nav when landing on an anchor. */
const NAV_OFFSET = -24

let instance: Lenis | null = null

/**
 * Weighted smooth scroll for wheel and trackpad (Lenis). Touch keeps native
 * scrolling, and reduced-motion users get the plain browser scroll.
 */
export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const start = () => {
      if (instance || mq.matches) return
      instance = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false, autoRaf: true })
    }
    const stop = () => {
      instance?.destroy()
      instance = null
    }
    const sync = () => (mq.matches ? stop() : start())
    sync()
    mq.addEventListener("change", sync)
    return () => {
      mq.removeEventListener("change", sync)
      stop()
    }
  }, [])
  return null
}

export function setScrollLocked(locked: boolean) {
  if (instance) {
    if (locked) instance.stop()
    else instance.start()
  }
  document.documentElement.style.overflow = locked ? "hidden" : ""
}

export function scrollToHash(href: string) {
  const el = href === "#" ? document.body : document.querySelector<HTMLElement>(href)
  if (!el) return
  if (instance) {
    instance.scrollTo(el, { offset: href === "#" ? 0 : NAV_OFFSET, duration: 1.3 })
    return
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const y = href === "#" ? 0 : el.getBoundingClientRect().top + window.scrollY + NAV_OFFSET
  window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" })
}
