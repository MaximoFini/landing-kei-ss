"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Linkedin } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { DotGrid } from "@/components/ui/dot-grid"
import { TiltCard } from "@/components/ui/tilt-card"

const coreMembers = [
  {
    name: "Jerónimo Zallocco",
    role: "Co-founder / Full Stack Developer",
    image: "/team/jeronimo-zallocco.jpg",
    linkedin: "https://www.linkedin.com/in/jer%C3%B3nimo-zallocco-036090417/",
  },
  {
    name: "Máximo Fini",
    role: "Co-founder / Project Manager",
    image: "/team/maximo-fini.jpg",
    linkedin: "https://www.linkedin.com/in/maximo-fini-560742201/",
  },
  {
    name: "Ramiro Celada",
    role: "Co-founder / Product Manager",
    image: "/team/ramiro-celada.jpg",
    linkedin: "https://www.linkedin.com/in/ramiro-celada/",
  },
]

function MemberCard({ member, index }: { member: (typeof coreMembers)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard max={6} className="rounded-2xl">
        <div className="relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_2px_16px_-8px_rgba(10,14,26,0.08)] transition-shadow duration-300 group-hover/tilt:shadow-[0_28px_70px_-24px_rgba(63,125,255,0.32)]">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={member.image}
              alt={`Foto de ${member.name}`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover object-top grayscale transition-all duration-500 group-hover/tilt:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050b1c]/50 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[#3f7dff]/10 opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100" />
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn de ${member.name}`}
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-google-sans text-base font-[450] leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                {member.name}
              </h3>
              <p className="mt-1 font-mono text-[11px] tracking-wide text-[#bcdcff] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                {member.role}
              </p>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export function Team() {
  return (
    <section
      id="equipo"
      className="relative overflow-hidden bg-[#fafbff] px-4 py-20 sm:px-6 sm:py-28 lg:py-32"
    >
      <DotGrid className="opacity-60" gap={38} baseColor="#dbe4f7" activeColor="#3f7dff" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="El equipo"
          title="Kei Software"
          subtitle="Quiénes escriben el código"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreMembers.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
