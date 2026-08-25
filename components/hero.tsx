"use client"

import { motion, useScroll, useTransform, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
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
      className="dark relative min-h-screen flex flex-col justify-end px-4 sm:px-6 pb-12 sm:pb-16 pt-24 sm:pt-32 overflow-hidden bg-background"
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
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
      />

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

      {/* Index labels */}
      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="absolute top-[5.5rem] sm:top-28 left-4 sm:left-6 flex items-center gap-4"
      >
        <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-muted-foreground uppercase">
          Córdoba, Argentina — Remoto Global
        </span>
      </motion.div>

      <motion.div
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="absolute top-[5.5rem] sm:top-28 right-4 sm:right-6 flex items-center gap-4"
      >
    
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Eyebrow + Urgency badge */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-6 sm:w-8 h-px bg-neon" />
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-neon uppercase font-mono">
              Software a medida
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-neon/40 bg-neon/5 backdrop-blur-sm animate-pulse w-fit">
            <span className="w-2 h-2 rounded-full bg-neon animate-ping" />
            <span className="text-[9px] sm:text-[10px] font-bold text-foreground tracking-wider uppercase">
              Solo 3 proyectos nuevos/mes
            </span>
          </div>
        </motion.div>

        {/* Oversized headline */}
        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[clamp(2rem,10vw,7rem)] font-black leading-[0.9] tracking-tight text-foreground uppercase"
        >
          Código que
          <br />
          <span
            className="text-neon"
            style={{ textShadow: "0 0 40px oklch(0.55 0.25 264 / 0.4), 0 0 60px oklch(0.55 0.25 264 / 0.2)" }}
          >
            resuelve
          </span>
          <br />
          problemas
          <span className="text-neon">.</span>
        </motion.h1>

        {/* Bottom row: description + CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-8 sm:mt-12 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 sm:gap-8"
        >
          <p className="max-w-md text-sm sm:text-base text-muted-foreground leading-relaxed">
            Desarrollamos software a medida, soluciones de inteligencia artificial
            y automatizaciones con transparencia total y calidad garantizada. Sin
            intermediarios. Sin letra chica.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-4 bg-neon text-foreground font-bold text-sm tracking-wide hover:bg-neon-bright transition-all duration-300 rounded-sm hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-neon/20 text-center"
            >
              Primera consulta gratis <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#proyectos"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-4 border border-border text-muted-foreground font-medium text-sm tracking-wide hover:border-neon/50 hover:text-foreground transition-all duration-300 rounded-sm hover:scale-105 active:scale-95 text-center"
            >
              Ver proyectos
            </a>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-border/40 grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-10"
        >
          {[
            { value: "53", label: "Proyectos entregados" },
            { value: "97%", label: "Satisfacción del cliente" },
            { value: "3.5", label: "Años de experiencia" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-2xl sm:text-3xl font-black text-neon leading-none">
                {stat.value}
              </span>
              <span className="text-[10px] sm:text-[11px] text-muted-foreground tracking-wider uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
