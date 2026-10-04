"use client"

import Image from "next/image"
import { Lines, Pill } from "@/components/landing/primitives"

function Chip({ children, i = 0 }: { children: string; i?: number }) {
  return (
    <span className="k-mark" style={{ "--i": i } as React.CSSProperties}>
      {children}
    </span>
  )
}

/**
 * Backdrop: KEI's isotipo, huge and cropped by the right edge, at very low
 * opacity, so the first screen isn't an empty white sheet. Same six facets as
 * the logo; each has a light-mode and a dark-mode opacity (see .k-hero__f).
 */
function Backdrop() {
  const facets = [
    ["400,55 222,174 400,290", "#3f7dff", 0.1, 0.14], // top-left
    ["400,55 578,174 400,290", "#3f7dff", 0.06, 0.1], // top-right
    ["222,174 400,290 222,412", "#3f7dff", 0.12, 0.16], // left
    ["578,174 400,290 578,412", "#3f7dff", 0.09, 0.12], // right
    ["222,412 400,290 400,579", "#16205e", 0.1, 0.55], // bottom-left
    ["578,412 400,290 400,579", "#16205e", 0.06, 0.4], // bottom-right
  ] as const
  return (
    <div className="k-hero__bg" aria-hidden="true">
      <svg viewBox="212 45 376 544" className="k-hero__gem" fill="none">
        {facets.map(([pts, fill, l, d]) => (
          <polygon
            key={pts}
            points={pts}
            fill={fill}
            className="k-hero__f"
            style={{ "--l": l, "--d": d } as React.CSSProperties}
          />
        ))}
      </svg>
    </div>
  )
}

/** The hero is type and two actions, centred with room to breathe. */
export function Hero() {
  return (
    <section
      className="k-hero relative flex min-h-[92svh] flex-col justify-center overflow-hidden md:min-h-[100svh]"
      aria-labelledby="hero-title"
    >
      <Backdrop />
      <div className="k-wrap relative z-10 flex flex-col items-center pb-[clamp(4rem,10vh,8rem)] pt-[clamp(7.5rem,15vh,10rem)] text-center">
        <Lines
          as="h1"
          id="hero-title"
          className="k-display k-h1"
          lines={[
            "Software a medida.",
            <>
              <Image
                src="/brand/kei-isotipo.png"
                alt=""
                width={256}
                height={313}
                priority
                className="mx-[0.12em] inline-block align-[-0.04em]"
                style={{ display: "inline-block", height: "0.74em", width: "auto" }}
              />
              <span className="text-[var(--k-blue)]">Resultados reales.</span>
            </>,
          ]}
        />

        <p className="k-hero__sub mt-9 max-w-[40rem] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-[1.7] text-[var(--k-ink-soft)]">
          Creamos <span className="whitespace-nowrap"><Chip>sistemas</Chip>,</span>{" "}
          <span className="whitespace-nowrap"><Chip i={1}>inteligencia artificial</Chip></span> y{" "}
          <span className="whitespace-nowrap"><Chip i={2}>sitios web</Chip> a&nbsp;medida</span> para que tu negocio trabaje mejor.
        </p>

        <div className="k-hero__cta mt-11 flex flex-wrap items-center justify-center gap-3">
          <Pill href="#contacto">Hablemos</Pill>
          <Pill href="#proyectos" variant="light" dot={false}>
            Ver proyectos
          </Pill>
        </div>
      </div>
    </section>
  )
}
