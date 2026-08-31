"use client"

import { LazyMotion, domAnimation } from "@/lib/motion"

/**
 * Wraps the app in Framer Motion's lazy feature loader. Every animated
 * component renders the lightweight `m` proxy; the DOM animation + gesture
 * features are injected here, once. `strict` throws on any `motion.*` so a
 * regression back to the full feature bundle is caught immediately.
 */
export function LazyMotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
