"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const testimonials = [
  {
    name: "Rodrigo Meneses",
    role: "CTO, Finova Labs",
    initials: "RM",
    comment:
      "Kei Software entregó nuestro MVP en tiempo récord. La comunicación fue impecable y nunca hubo sorpresas con el presupuesto. Su transparencia es lo que más valoro.",
  },
  {
    name: "Camila Torres",
    role: "Directora de Operaciones, RetailX",
    initials: "CT",
    comment:
      "Implementaron nuestra automatización de inventario en semanas. El equipo siempre explicó cada decisión técnica con claridad. 100% recomendado.",
  },
  {
    name: "Pablo Guerrero",
    role: "Fundador, EduConnect",
    initials: "PG",
    comment:
      "Su solución de IA redujo el trabajo manual de nuestro equipo en un 70%. Calidad y honestidad ante todo.",
  },
]

function TestimonialCard({
  t,
  index,
}: {
  t: (typeof testimonials)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-5 sm:gap-6 p-5 sm:p-7 rounded-sm bg-surface border border-border hover:border-neon/40 transition-colors"
    >
      {/* Large quote mark */}
      <span
        className="text-5xl sm:text-6xl font-black leading-none text-neon/20 select-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 -mt-3 sm:-mt-4">
        {t.comment}
      </p>
      <div className="flex items-center gap-3 pt-2 border-t border-border/40">
        <div className="w-9 h-9 rounded-sm bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-neon font-mono">{t.initials}</span>
        </div>
        <div>
          <p className="text-sm font-bold text-foreground leading-tight">{t.name}</p>
          <p className="text-[11px] text-muted-foreground font-mono">{t.role}</p>
        </div>
      </div>
    </motion.div>
  )
}

export function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16 pb-4 sm:pb-6 border-b border-border/40"
        >
          <div>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-neon uppercase font-mono">
              Clientes
            </span>
            <h2 className="mt-2 sm:mt-3 text-3xl sm:text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tight leading-none">
              Lo que<br />dicen
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
