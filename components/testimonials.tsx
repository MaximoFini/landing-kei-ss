"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Star } from "lucide-react"

type Testimonial = {
  name: string
  role: string
  company: string
  companyInitials: string
  companyLogo?: string
  rating?: number
  comment: string
}

const testimonials: Testimonial[] = [
  {
    name: "Joaquin Vera",
    role: "Co-founder",
    company: "VeGroup",
    companyInitials: "VG",
    companyLogo: "/testimonials/vegroup.png",
    rating: 5,
    comment:
      "La verdad que tremendo trabajo y sobre todo el entendimiento sobre nuestro proyecto para seguir sumando y mejorando funciones del sistema. Una atención espectacular y muy cercana con las necesidades que hemos tenido. Muchas gracias por toda la gestión y compromiso 🙌🏻",
  },
  {
    name: "Agustín Ramis",
    role: "Co-founder",
    company: "Stability",
    companyInitials: "ST",
    companyLogo: "/testimonials/stability.png",
    rating: 5,
    comment:
      "A través de KEI Software encontramos respuestas a muchos inconvenientes que teníamos con el servicio para el cliente. Hoy contamos con una app funcional en constante mejora gracias a su equipo. Innovadores y atentos a cada detalle.",
  },
  {
    name: "Ruben Fini",
    role: "Dueño",
    company: "Alfa Club",
    companyInitials: "AC",
    companyLogo: "/testimonials/alfa-club.png",
    rating: 5,
    comment:
      "Estamos contentos con el trabajo de los chicos de KEI, hace un tiempo usábamos Mis Actividades para la administración del gimnasio, pero estábamos necesitando una solución más a medida. Los chicos entendieron nuestra necesidad y solucionaron nuestros problemas.",
  },
]

function TestimonialCard({
  t,
  index,
}: {
  t: Testimonial
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col justify-between gap-5 sm:gap-6 p-5 sm:p-7 rounded-sm bg-surface border border-border hover:border-neon/40 transition-colors group"
    >
      <div className="flex flex-col gap-4">
        {/* Top bar: Quote icon & Star rating */}
        <div className="flex items-center justify-between">
          <span
            className="text-4xl sm:text-5xl font-black leading-none text-neon/30 select-none group-hover:text-neon/50 transition-colors"
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <div className="flex items-center gap-1">
            {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-neon text-neon"
              />
            ))}
          </div>
        </div>

        {/* Testimonial body */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t.comment}
        </p>
      </div>

      {/* Author & Company information */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-border/40">
        <div className="relative w-11 h-11 rounded-sm bg-background border border-border group-hover:border-neon/30 transition-colors overflow-hidden flex items-center justify-center p-1.5 flex-shrink-0">
          {t.companyLogo && !imageError ? (
            <Image
              src={t.companyLogo}
              alt={`Logo de ${t.company}`}
              fill
              sizes="44px"
              className="object-contain p-1.5"
              onError={() => setImageError(true)}
            />
          ) : (
            <span className="text-xs font-bold text-neon font-mono select-none">
              {t.companyInitials}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-foreground leading-tight truncate">
            {t.name}
          </p>
          <p className="text-[11px] text-muted-foreground font-mono truncate mt-0.5">
            <span className="text-neon/90 font-medium">{t.role}</span>
            <span className="text-muted-foreground/60 mx-1">·</span>
            <span className="text-foreground/80 font-medium">{t.company}</span>
          </p>
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
          <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
            Experiencias reales de fundadores y directores que construyeron con nosotros.
          </p>
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

