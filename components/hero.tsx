"use client"

import { motion, useScroll, useTransform, type Variants } from "framer-motion"
import { useRef } from "react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Parallax sutil para los elementos de fondo
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0])

  return (
    <section
      ref={ref}
      className="dark relative min-h-screen px-4 sm:px-6 pt-40 sm:pt-48 overflow-hidden bg-background"
    >
      {/* Video de fondo: equipo trabajando.
          object-position sesgado hacia abajo: en pantallas angostas/altas (notebooks)
          object-cover recorta de los costados y arriba primero, así la gente se
          mantiene visible en vez de perderse fuera de cuadro. */}
      <video
        className="absolute inset-0 w-full h-full object-cover object-[center_60%]"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero-poster.jpg"
        src="/hero-loop.mp4"
      />

      {/* Scrim: garantiza contraste del texto sobre zonas brillantes del video */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

      {/* Subtle blue glow top-left */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute -top-40 -left-40 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-neon/8 blur-[120px] sm:blur-[160px] pointer-events-none"
      />
      {/* Subtle blue glow bottom-right */}
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute bottom-0 right-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-neon/6 blur-[100px] sm:blur-[120px] pointer-events-none"
      />

      {/* Thin horizontal rule top */}
      <div className="absolute top-20 sm:top-24 left-4 sm:left-6 right-4 sm:right-6 h-px bg-border/40" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Oversized headline */}
        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[clamp(2.75rem,13vw,7rem)] font-black leading-[0.9] tracking-tight text-foreground uppercase"
        >
          Software a medida.
          <br />
          <span className="text-neon">Resultados reales.</span>
        </motion.h1>
      </div>

      {/* Stats bar: pinned near the bottom, independent of the headline's position */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="absolute inset-x-0 bottom-8 sm:bottom-12 z-10 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto pt-6 sm:pt-8 border-t border-border/40 flex flex-wrap justify-center gap-8 sm:gap-14 text-center">
          {[
            { value: "53", label: "Proyectos entregados" },
            { value: "97%", label: "Satisfacción del cliente" },
            { value: "3.5", label: "Años de experiencia" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl sm:text-3xl font-black text-white leading-none">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-[11px] text-muted-foreground tracking-wider uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
