"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { flushSync } from "react-dom"

import { Moon, Sun } from "lucide-react"

import { m, AnimatePresence } from "@/lib/motion"

import { cn } from "@/lib/utils"

type AnimatedThemeTogglerProps = {
  className?: string
}

const TIMED_OUT = Symbol("timed-out")

/** Resolves after `ms` if `promise` hasn't settled yet. A handful of mobile
 * browsers report `startViewTransition` support but never settle `.ready`
 * for a backgrounded tab, a dropped frame, or a page mid-navigation — without
 * this the toggle button would lock up (the click-lock below never clears)
 * on exactly the devices this pass is meant to protect. */
function withTimeout<T>(promise: Promise<T>, ms: number) {
  return Promise.race([
    promise,
    new Promise<typeof TIMED_OUT>((resolve) => setTimeout(() => resolve(TIMED_OUT), ms)),
  ])
}

/** Low-end devices (old Android phones, Data Saver, `deviceMemory <= 2`) pay
 * for the clip-path reveal in dropped frames on a page this visually heavy —
 * the theme still needs to flip instantly and reliably there, just without
 * the flourish. Mirrors the capability check `hero.tsx` uses for the WebGL
 * fluid sim, so both flourishes get gated the same way on the same devices. */
function shouldSkipReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true
  const nav = window.navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean; effectiveType?: string }
  }
  if (nav.connection?.saveData === true) return true
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2) return true
  const slowConnection = nav.connection?.effectiveType
  if (slowConnection === "slow-2g" || slowConnection === "2g") return true
  return false
}

export const AnimatedThemeToggler = ({ className }: AnimatedThemeTogglerProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isTransitioningRef = useRef(false)
  // Always start `false` so the server-rendered markup and the client's
  // first render match (the server has no way to know the persisted theme).
  // The real value is applied right after mount, below.
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const syncTheme = () =>
      setDarkMode(document.documentElement.classList.contains("dark"))

    syncTheme()
    const observer = new MutationObserver(syncTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })
    return () => observer.disconnect()
  }, [])

  const onToggle = useCallback(() => {
    if (!buttonRef.current || isTransitioningRef.current) return

    const toggleTheme = () => {
      const toggled = !darkMode
      setDarkMode(toggled)
      document.documentElement.classList.toggle("dark", toggled)
      try {
        localStorage.setItem("theme", toggled ? "dark" : "light")
      } catch {
        // Safari private mode / storage quota — the DOM class flip above is
        // what actually matters, persistence is a nice-to-have.
      }
    }

    if (typeof document.startViewTransition !== "function" || shouldSkipReveal()) {
      toggleTheme()
      return
    }

    // The button doesn't move when the theme flips, so read its position
    // once, up front.
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    )

    isTransitioningRef.current = true

    let transition: ReturnType<typeof document.startViewTransition>
    try {
      // The new (post-click) page sits underneath, fully visible and
      // unclipped — see globals.css. We shrink the OLD snapshot's clip-path
      // from full coverage down to nothing at the click point, so the new
      // theme is progressively uncovered from that point outward. Always
      // targeting the same pseudo-element with the same keyframe direction
      // keeps this identical for both light→dark and dark→light — there is
      // no per-direction branch to get backwards.
      transition = document.startViewTransition(() => flushSync(toggleTheme))
    } catch {
      // Some engines can throw synchronously here (e.g. a previous
      // transition hasn't fully settled). The toggle must still work.
      toggleTheme()
      isTransitioningRef.current = false
      return
    }

    withTimeout(transition.ready, 1500)
      .then((result) => {
        if (result === TIMED_OUT) return
        return withTimeout(
          document.documentElement.animate(
            {
              clipPath: [
                `circle(${maxRadius}px at ${x}px ${y}px)`,
                `circle(0px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 500,
              easing: "ease-in-out",
              pseudoElement: "::view-transition-old(root)",
            }
          ).finished,
          1500
        )
      })
      .catch(() => {
        // The theme itself was already applied via flushSync above — a
        // rejected/skipped transition (backgrounded tab, etc.) only means
        // the reveal animation didn't get to play.
      })
      .finally(() => {
        isTransitioningRef.current = false
      })
  }, [darkMode])

  return (
    <button
      ref={buttonRef}
      onClick={onToggle}
      aria-label="Cambiar tema"
      className={cn(
        "flex items-center justify-center p-2 rounded-full outline-none focus:outline-none active:outline-none focus:ring-0 cursor-pointer",
        className
      )}
      type="button"
    >
      <AnimatePresence mode="wait" initial={false}>
        {darkMode ? (
          <m.span
            key="sun-icon"
            initial={{ opacity: 0, scale: 0.55, rotate: 25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.33 }}
            className="text-white"
          >
            <Sun className="w-4 h-4" />
          </m.span>
        ) : (
          <m.span
            key="moon-icon"
            initial={{ opacity: 0, scale: 0.55, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.33 }}
            className="text-black"
          >
            <Moon className="w-4 h-4" />
          </m.span>
        )}
      </AnimatePresence>
    </button>
  )
}
