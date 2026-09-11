"use client"

import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Hero } from "./hero"
import { ServicesCard } from "./services"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Hero + services card as one pinned stage. The hero holds still while the
 * services card flies up into it and takes the screen over — the card comes to
 * the viewer rather than the viewer scrolling down to the card.
 */
export function HeroStage({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile = window.innerWidth < 768

    // Gates the `.kei-overlap` margin that lets the page below slide over this
    // stage: only correct while the stage is genuinely pinned.
    if (!reduced) document.documentElement.dataset.keiStage = "pinned"

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(".kei-card", {
          yPercent: 0,
          width: "100%",
          height: "100%",
          borderRadius: 0,
          autoAlpha: 1,
        })
        gsap.set([".kei-head", ".kei-item", ".kei-visual"], { autoAlpha: 1, x: 0, y: 0, scale: 1 })
        return
      }

      gsap.set(".kei-card", { yPercent: 118, autoAlpha: 1 })
      gsap.set([".kei-head", ".kei-item", ".kei-visual"], { autoAlpha: 0 })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top top",
            end: isMobile ? "+=4400" : "+=5800",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })
        // The hero recedes in place instead of scrolling away. No blur filter:
        // it would repaint the WebGL fluid canvas underneath every frame.
        .to(".kei-hero-layer", { scale: 1.12, opacity: 0.25, ease: "power2.inOut", duration: 2.4 }, 0)
        .to(".kei-card", { yPercent: 0, ease: "power3.inOut", duration: 2 }, 0)
        .to(".kei-card", {
          width: "100%",
          height: "100%",
          borderRadius: "0px",
          ease: "power3.inOut",
          duration: 1.5,
        })
        .fromTo(
          ".kei-head",
          { y: 40, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, ease: "power3.out", duration: 1.2 },
          "-=0.7"
        )
        .fromTo(
          ".kei-item",
          { x: -60, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, stagger: 0.18, ease: "power4.out", duration: 1.3 },
          "-=0.8"
        )
        .fromTo(
          ".kei-visual",
          { scale: 0.6, rotationY: -28, z: -400, autoAlpha: 0 },
          { scale: 1, rotationY: 0, z: 0, autoAlpha: 1, ease: "expo.out", duration: 2.2 },
          "<0.1"
        )
        // Tail hold so the finished card stays put for a beat before release.
        .to({}, { duration: 2.5 })

        // Exit, in two beats. First the content drops away and the card pulls
        // back into a rounded slab — with the dark floor still up, so it pulls
        // back against black rather than against Proceso's pale background.
        .to([".kei-visual", ".kei-item", ".kei-head"], {
          autoAlpha: 0,
          y: -30,
          stagger: 0.07,
          ease: "power2.in",
          duration: 1,
        })
        .addLabel("pullback")
        .to(".kei-hero-layer", { autoAlpha: 0, ease: "power2.inOut", duration: 1.4 }, "pullback")
        .to(
          ".kei-card",
          {
            width: isMobile ? "88vw" : "82vw",
            height: isMobile ? "72vh" : "78vh",
            borderRadius: isMobile ? "32px" : "40px",
            ease: "expo.inOut",
            duration: 1.7,
          },
          "pullback"
        )
        // Then the slab lifts off the top edge while the floor dissolves under
        // it, so Proceso is what comes out from beneath the rising card.
        .addLabel("lift")
        .to(".kei-floor", { autoAlpha: 0, ease: "power2.in", duration: 1.2 }, "lift")
        .to(".kei-card", { yPercent: -135, ease: "power2.in", duration: 1.6 }, "lift")
        // Hold on Proceso. Without this the pin released the moment the card
        // cleared the top edge, so the section it had just uncovered scrolled
        // straight off with the stage and was never really on screen. This
        // keeps it parked for about a viewport and a half of scroll, which is
        // also the room needed to click through the deck.
        .to({}, { duration: 3.5 })
    }, outerRef)

    // ScrollTrigger measures on its first animation frame, and a browser that
    // loaded this page in a background tab never fires one — the pin would then
    // stay uninitialised (no spacer, no travel) even after the tab is opened.
    const refresh = () => {
      if (!document.hidden) ScrollTrigger.refresh()
    }
    document.addEventListener("visibilitychange", refresh)

    // Pinning inserts a multi-thousand pixel spacer, which moves every section
    // below it. Anything caching document positions — the navbar's scrollspy —
    // has to re-read once that lands, and it lands asynchronously.
    const announce = () => window.dispatchEvent(new Event("kei:layout"))
    ScrollTrigger.addEventListener("refresh", announce)

    return () => {
      document.removeEventListener("visibilitychange", refresh)
      ScrollTrigger.removeEventListener("refresh", announce)
      delete document.documentElement.dataset.keiStage
      ctx.revert()
    }
  }, [])

  return (
    <div ref={outerRef} className="relative z-0">
      <div ref={stageRef} className="relative w-full h-screen overflow-hidden">
        {/* Bottom of the stack — already rendered and running while the hero
            and the card cover it, so the card's exit uncovers a live section
            instead of an empty floor. It is exactly one viewport tall and
            scrolls away with the stage once the pin releases. */}
        <div className="absolute inset-0 z-0 overflow-hidden">{children}</div>

        {/* Deep-space floor, on its own layer so it can outlast the hero: it is
            what the card pulls back against, and it only dissolves once the
            card starts lifting. */}
        <div className="kei-floor absolute inset-0 z-[5] bg-[#030816]" aria-hidden="true" />

        <div className="kei-hero-layer absolute inset-0 z-10 will-change-transform">
          <Hero />
        </div>

        <ServicesCard />
      </div>

      {/* Nav anchors. Both are zero-size markers inside this wrapper, whose
          height is the pin-spacer's, so their offsetTop maps to a scroll
          position in the pinned timeline — which is what the navbar's
          scrollspy reads. `#servicios` lands on the assembled card, `#proceso`
          at the end of the pin, where the card has finished leaving. */}
      <div id="servicios" aria-hidden="true" className="absolute left-0 top-[40%] w-px h-px" />
      <div id="proceso" aria-hidden="true" className="absolute left-0 top-[74%] w-px h-px" />
    </div>
  )
}
