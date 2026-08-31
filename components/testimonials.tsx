"use client"

import { m, useInView } from "@/lib/motion"
import { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from "embla-carousel-react"
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
    name: "Juan Borrego",
    role: "Co-founder",
    company: "Stability",
    companyInitials: "ST",
    companyLogo: "/testimonials/stability.webp",
    comment:
      "Si lo tuviera que describir con una palabra a KEI, sería con “soluciones” ya que nos dio respuestas a muchas de las problemáticas que teníamos que solucionar con nuestro proyecto pero no sabíamos cómo.",
  },
  {
    name: "Agustín",
    role: "Co-founder",
    company: "Stability",
    companyInitials: "ST",
    companyLogo: "/testimonials/stability.webp",
    comment:
      "Trabajar con KEI fue clave para llevar Stability al siguiente nivel. Desarrollaron una plataforma ágil, moderna y totalmente a medida que nos facilitó la gestión integral de nuestros clientes y entrenamientos.",
  },
  {
    name: "Gabriel Alvarez",
    role: "Dueño",
    company: "Centro Automotores",
    companyInitials: "CA",
    companyLogo: "/testimonials/centro-autos.webp",
    comment:
      "Excelente experiencia con KEI SOFTWARE. Me desarrollaron una aplicación a medida para la concesionaria que me permite organizar clientes, vehículos, movimientos de dinero y tener toda la información del negocio mucho más ordenada y accesible. Muy buena atención, predisposición y, sobre todo, entendieron perfectamente lo que necesitaba. ¡Totalmente recomendados!",
  },
  {
    name: "Joaquin Vera",
    role: "Co-founder",
    company: "VeGroup",
    companyInitials: "VG",
    companyLogo: "/testimonials/vegroup.webp",
    comment:
      "La verdad que tremendo trabajo y sobre todo el entendimiento sobre nuestro proyecto para seguir sumando y mejorando funciones del sistema. Una atención espectacular y muy cercana con las necesidades que hemos tenido. Muchas gracias por toda la gestión y compromiso 🙌🏻",
  },
  {
    name: "Ruben Fini",
    role: "Dueño",
    company: "Alfa Club",
    companyInitials: "AC",
    companyLogo: "/testimonials/alfa-club.webp",
    comment:
      "Estamos contentos con el trabajo de los chicos de KEI, hace un tiempo usábamos Mis Actividades para la administración del gimnasio, pero estábamos necesitando una solución más a medida. Los chicos entendieron nuestra necesidad y solucionaron nuestros problemas.",
  },
]

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [imageError, setImageError] = useState(false)

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <TiltCard
        max={5}
        className="h-full rounded-2xl"
        style={{ height: "100%" }}
      >
        <div className="relative flex h-full min-h-[320px] flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_2px_16px_-8px_rgba(10,14,26,0.08)] dark:shadow-[0_2px_16px_-8px_rgba(0,0,0,0.5)] transition-shadow duration-300 group-hover/tilt:shadow-[0_28px_70px_-24px_rgba(63,125,255,0.32)] sm:p-7">
          <BorderBeam
            size={64}
            duration={8 + (index % 4)}
            delay={(index % 4) * 1.4}
            colorFrom="#bcdcff"
            colorTo="#3f7dff"
            borderWidth={1.5}
          />

          <div className="flex flex-col gap-4">
            <Quote className="h-7 w-7 text-[#3f7dff]/30" />
            <p className="text-sm leading-relaxed text-muted-foreground">{t.comment}</p>
          </div>

          <div className="flex items-center gap-3.5 border-t border-border pt-4">
            <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-card p-1.5 shadow-sm">
              {t.companyLogo && !imageError ? (
                <Image
                  src={t.companyLogo}
                  alt={`Logo de ${t.company}`}
                  fill
                  sizes="44px"
                  className="object-contain p-1"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="font-mono text-xs font-bold text-[#3f7dff]">
                  {t.companyInitials}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-google-sans text-sm font-[450] text-foreground">
                {t.name}
              </p>
              <p className="mt-0.5 truncate font-mono text-[11px] text-muted-foreground">
                <span className="text-[#3f7dff]">{t.role}</span>
                <span className="mx-1 text-muted-foreground/60">·</span>
                <span className="text-muted-foreground">{t.company}</span>
              </p>
            </div>
          </div>
        </div>
      </TiltCard>
    </m.div>
  )
}

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  })

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
    return () => {
      emblaApi.off("select", onSelect)
      emblaApi.off("reInit", onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 sm:py-28 lg:py-32">
      <LightAurora intensity={0.6} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="relative mb-8 sm:mb-12">
          <SectionHeading
            eyebrow="Clientes"
            title="Lo que dicen"
            subtitle="Experiencias reales"
          />

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-2.5 sm:absolute sm:right-0 sm:bottom-0 sm:justify-end">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={!prevBtnEnabled}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-[#3f7dff] hover:text-white hover:border-[#3f7dff] active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="h-5 w-5 stroke-[2.2]" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={!nextBtnEnabled}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-[#3f7dff] hover:text-white hover:border-[#3f7dff] active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="h-5 w-5 stroke-[2.2]" />
            </button>
          </div>
        </div>

        {/* Carousel Container (3 items visible on desktop, 2 on tablet, 1 on mobile) */}
        <div className="overflow-hidden -mx-4 px-4 sm:-mx-6 sm:px-6" ref={emblaRef}>
          <div className="flex -ml-4 sm:-ml-5 items-stretch">
            {testimonials.map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="min-w-0 flex-[0_0_100%] pl-4 sm:pl-5 sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%]"
              >
                <TestimonialCard t={t} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        {scrollSnaps.length > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Ir al testimonio ${index + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === selectedIndex
                    ? "w-8 bg-[#3f7dff]"
                    : "w-2 bg-foreground/15 hover:bg-foreground/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
