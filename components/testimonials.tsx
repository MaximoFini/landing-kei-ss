"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { LightAurora } from "@/components/ui/light-aurora"
import { TiltCard } from "@/components/ui/tilt-card"
import { BorderBeam } from "@/components/ui/border-beam"

type Testimonial = {
  name: string
  role: string
  company: string
  companyInitials: string
  companyLogo?: string
  comment: string
}

const testimonials: Testimonial[] = [
  {
    name: "Joaquin Vera",
    role: "Co-founder",
    company: "VeGroup",
    companyInitials: "VG",
    companyLogo: "/testimonials/vegroup.png",
    comment:
      "La verdad que tremendo trabajo y sobre todo el entendimiento sobre nuestro proyecto para seguir sumando y mejorando funciones del sistema. Una atención espectacular y muy cercana con las necesidades que hemos tenido. Muchas gracias por toda la gestión y compromiso 🙌🏻",
  },
  {
    name: "Agustín Ramis",
    role: "Co-founder",
    company: "Stability",
    companyInitials: "ST",
    companyLogo: "/testimonials/stability.png",
    comment:
      "A través de KEI Software encontramos respuestas a muchos inconvenientes que teníamos con el servicio para el cliente. Hoy contamos con una app funcional en constante mejora gracias a su equipo. Innovadores y atentos a cada detalle.",
  },
  {
    name: "Ruben Fini",
    role: "Dueño",
    company: "Alfa Club",
    companyInitials: "AC",
    companyLogo: "/testimonials/alfa-club.png",
    comment:
      "Estamos contentos con el trabajo de los chicos de KEI, hace un tiempo usábamos Mis Actividades para la administración del gimnasio, pero estábamos necesitando una solución más a medida. Los chicos entendieron nuestra necesidad y solucionaron nuestros problemas.",
  },
]

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const [imageError, setImageError] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard
        max={5}
        className="h-full rounded-2xl"
        style={{ height: "100%" }}
      >
        <div className="relative flex h-full flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_2px_16px_-8px_rgba(10,14,26,0.08)] transition-shadow duration-300 group-hover/tilt:shadow-[0_28px_70px_-24px_rgba(63,125,255,0.32)] sm:p-7">
          <BorderBeam
            size={64}
            duration={8 + index}
            delay={index * 1.4}
            colorFrom="#bcdcff"
            colorTo="#3f7dff"
            borderWidth={1.5}
          />

          <div className="flex flex-col gap-4">
            <Quote className="h-7 w-7 text-[#3f7dff]/30" />
            <p className="text-sm leading-relaxed text-black/60">{t.comment}</p>
          </div>

          <div className="flex items-center gap-3.5 border-t border-black/[0.06] pt-4">
            <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/[0.07] bg-white p-1.5">
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
                <span className="font-mono text-xs font-bold text-[#3f7dff]">
                  {t.companyInitials}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-google-sans text-sm font-[450] text-[#0a0e1a]">
                {t.name}
              </p>
              <p className="mt-0.5 truncate font-mono text-[11px] text-black/45">
                <span className="text-[#3f7dff]">{t.role}</span>
                <span className="mx-1 text-black/30">·</span>
                <span className="text-black/60">{t.company}</span>
              </p>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <LightAurora intensity={0.6} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Clientes"
          title="Lo que dicen"
          subtitle="Experiencias reales"
        />

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
