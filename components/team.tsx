"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Linkedin } from "lucide-react"

const coreMembers = [
  {
    name: "Maximo Fini",
    role: "Co-founder / Product Manager",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Maximo_Fini-0HmiZcig2d8y2J5ZxZ2cC2E2ilN6RA.jpeg",
    linkedin: "https://www.linkedin.com/in/maximo-fini-560742201/",
    bio: "Interesado en la experiencia del usuario final. Entendiendo que un buen sistema se mide en ganancias, no en complejidad",
  },
  {
    name: "Juan Varengo",
    role: "Co-founder / Analista Funcional",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Juan_Varengo-7O3qDZFv9bleMumYQswWDteu5VFxds.png",
    linkedin: "https://www.linkedin.com/in/juanignaciovarengobossi/",
    bio: "Especializado en bajar la idea del cliente a diagramas que escalen el sistema de 0 a 100.",
  },
]

const collaborators = [
  {
    name: "Juan Liendo",
    role: "IA · Full Stack · Scrum Master",
    image: null,
  },
  {
    name: "Josefina Pasqualis",
    role: "Legal",
    image: null,
  },
  {
    name: "Facundo Zallocco",
    role: "Full Stack",
    image: null,
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

function CollaboratorRow({
  collab,
  index,
}: {
  collab: (typeof collaborators)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="flex items-center justify-between py-4 border-b border-border/30 last:border-0"
    >
      <div className="flex items-center gap-4">
        {collab.image ? (
          <div className="relative w-9 h-9 rounded-full overflow-hidden bg-surface-elevated border border-border flex-shrink-0">
            <Image
              src={collab.image}
              alt={`Foto de ${collab.name}`}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full bg-surface-elevated border border-border flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-muted-foreground">
              {collab.name.charAt(0)}
            </span>
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-foreground leading-tight">{collab.name}</p>
          <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{collab.role}</p>
        </div>
      </div>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {coreMembers.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* Collaborators */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="w-6 h-px bg-border" />
            <span className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-mono">
              Colaboradores
            </span>
          </div>
          <div>
            {collaborators.map((collab, i) => (
              <CollaboratorRow key={collab.name} collab={collab} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
