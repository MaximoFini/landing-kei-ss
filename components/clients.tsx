"use client"

import { m, useInView } from "@/lib/motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { LogoLoop } from "@/components/ui/logo-loop"

type ClientItem = {
  name: string
  logo: string
  image?: string
}

const clients: ClientItem[] = [
  { name: "VeGroup", logo: "VG", image: "/testimonials/vegroup.webp" },
  { name: "Stability", logo: "ST", image: "/testimonials/stability.webp" },
  { name: "Alfa Club", logo: "AC", image: "/testimonials/alfa-club.webp" },
  { name: "OG Circle", logo: "OG", image: "/testimonials/ogcircle.webp" },
  {
    name: "Centro Automotores",
    logo: "CA",
    image: "/testimonials/centro-autos.webp",
  },
]

function ClientLogo({ client }: { client: ClientItem }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="group flex items-center gap-3">
      <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#3f7dff]/35 group-hover:shadow-[0_12px_30px_-12px_rgba(63,125,255,0.4)]">
        {client.image && !imgError ? (
          <Image
            src={client.image}
            alt={`Logo ${client.name}`}
            fill
            sizes="56px"
            className="object-contain p-2 opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="font-mono text-lg font-bold text-muted-foreground transition-colors group-hover:text-[#3f7dff]">
            {client.logo}
          </span>
        )}
      </div>
      <span className="font-google-sans text-sm font-[450] text-muted-foreground transition-colors group-hover:text-foreground">
        {client.name}
      </span>
    </div>
  )
}

export function Clients() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="border-y border-border bg-background px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <m.p
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-9 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[11px]"
        >
          Confían en nosotros
        </m.p>

        <LogoLoop duration={26} gap={64} repeat={3}>
          {clients.map((c) => (
            <ClientLogo key={c.name} client={c} />
          ))}
        </LogoLoop>
      </div>
    </section>
  )
}
