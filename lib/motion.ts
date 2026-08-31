"use client"

/**
 * Central Framer Motion entrypoint.
 *
 * Every animated component imports `m` (never `motion`) from here, and the tree
 * is wrapped once in `<LazyMotion features={domAnimation} strict>` — see
 * components/lazy-motion-provider.tsx. That keeps the full ~34 kB `motion`
 * feature bundle out of every chunk: only the ~5 kB `m` proxy ships per
 * component and the ~17 kB DOM-animation feature set (animations, variants,
 * exit, hover/tap/focus gestures) loads a single time. `strict` makes any stray
 * `motion.*` throw, so the optimisation can't silently regress.
 *
 * `domAnimation` is enough because the codebase uses no `drag`, `layout`,
 * `layoutId` or `Reorder` — if that changes, swap it for `domMax` in the
 * provider.
 */
export { LazyMotion, domAnimation, m } from "framer-motion"
export {
  AnimatePresence,
  animate,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"
export type {
  HTMLMotionProps,
  MotionStyle,
  MotionValue,
  Transition,
} from "framer-motion"

// Reusable animation variants
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay },
  }),
}

export const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay },
  }),
}
