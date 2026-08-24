"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Linkedin } from "lucide-react"

const coreMembers = [
  {
    name: "Jerónimo Zallocco",
    role: "Co-founder / Full Stack Developer",
    image: "/team/jeronimo-zallocco.jpg",
    linkedin: "https://www.linkedin.com/in/jer%C3%B3nimo-zallocco-036090417/",
    bio: "Convierte requerimientos complejos en código simple y mantenible, sin perder de vista el rendimiento.",
  },
  {
    name: "Máximo Fini",
    role: "Co-founder / Project Manager",
    image: "/team/maximo-fini.jpg",
    linkedin: "https://www.linkedin.com/in/maximo-fini-560742201/",
    bio: "Ordena tiempos y prioridades para que cada proyecto llegue a producción sin sorpresas.",
  },
  {
    name: "Ramiro Celada",
    role: "Co-founder / Product Manager",
    image: "/team/ramiro-celada.jpg",
    linkedin: "https://www.linkedin.com/in/ramiro-celada/",
    bio: "Traduce la visión del cliente en un producto con roadmap claro, con foco en el problema real a resolver.",
  },
]

function MemberCard({
  member,
  index,
}: {
  member: (typeof coreMembers)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col gap-0"
    >
      <div className="relative aspect-square overflow-hidden rounded-sm bg-surface">
        <Image
          src={member.image}
          alt={`Foto de ${member.name}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-neon/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-foreground leading-tight">{member.name}</h3>
          <p className="text-xs text-neon mt-0.5 font-mono tracking-wide">{member.role}</p>
        </div>
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn de ${member.name}`}
          className="p-1.5 text-muted-foreground hover:text-neon transition-colors flex-shrink-0"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </a>
      </div>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
        {member.bio}
      </p>
    </motion.div>
  )
}

export function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <section id="equipo" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-12 sm:mb-16 pb-4 sm:pb-6 border-b border-border/40"
        >
          <div>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] sm:tracking-[0.3em] text-neon uppercase font-mono">
              El equipo
            </span>
            <h2 className="mt-3 text-4xl sm:text-6xl font-black text-foreground uppercase tracking-tight leading-none">
              Sin<br />Intermediarios
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
            Sin capas de gestión. Hablás directamente con quienes escriben el código.
          </p>
        </motion.div>

        {/* Core team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreMembers.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
