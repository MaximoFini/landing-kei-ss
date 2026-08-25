"use client"

import { motion, type Variants } from "framer-motion"
import dynamic from "next/dynamic"

const LiquidEther = dynamic(() => import("@/components/LiquidEther"), { ssr: false })

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function Hero() {
  return (
    <section className="dark relative min-h-screen px-4 sm:px-6 pt-40 sm:pt-48 overflow-hidden bg-background">
      {/* Atmósfera de cielo: un degradé bien azul (nada de negro puro) detrás
          de todo, para que el fluido y las estrellas floten sobre un cielo
          real en vez de sobre un fondo oscuro plano. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, #0f2678 0%, #091c50 35%, #050f28 68%, #030816 100%)",
        }}
      />

      {/* Fondo: simulación de fluido en WebGL (React Bits "Liquid Ether"), en los
          tonos de marca. Reacciona al mouse y también se anima solo cuando nadie
          interactúa (autoDemo).
          resolution/iterationsPoisson bajos a propósito: son los dos parámetros
          que más CPU/GPU consumen por frame (la resolución define cuántos
          píxeles simula, y el solver de presión corre esa cantidad de
          iteraciones EN CADA frame) -- bajarlos es lo que saca el delay al
          mover el mouse. BFECC en false ahorra otro pase de textura por frame. */}
      <div className="absolute inset-0">
        <LiquidEther
          colors={["#0b1a42", "#1a4fc0", "#3f7dff", "#bcdcff"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.3}
          BFECC={false}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={50}
          autoRampDuration={1.4}
        />
      </div>

      {/* Thin horizontal rule top */}
      <div className="absolute top-20 sm:top-24 left-4 sm:left-6 right-4 sm:right-6 h-px bg-border/40" />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pointer-events-none">
        {/* Oversized headline */}
        <motion.h1
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-[clamp(2.75rem,13vw,7rem)] font-black leading-[0.9] tracking-tight text-foreground uppercase [filter:drop-shadow(0_2px_4px_rgba(2,6,18,0.85))_drop-shadow(0_14px_36px_rgba(2,6,18,0.6))]"
        >
          Software a medida.
          <br />
          <span className="text-neon-bright">Resultados reales.</span>
        </motion.h1>
      </div>

      {/* Stats bar: pinned near the bottom, independent of the headline's position */}
      <motion.div
        custom={4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="absolute inset-x-0 bottom-8 sm:bottom-12 z-10 px-4 sm:px-6 pointer-events-none"
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
