"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Phone, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { LightAurora } from "@/components/ui/light-aurora"
import { BorderBeam } from "@/components/ui/border-beam"

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "contacto@keisoftware.dev",
    href: "mailto:contacto@keisoftware.dev",
  },
  {
    icon: Phone,
    label: "Teléfono / WhatsApp",
    value: "+54 351 361-4462",
    href: "tel:+543513614462",
  },
]

export function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Error al enviar.")
      }

      setSent(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al enviar el mensaje.")
    } finally {
      setLoading(false)
    }
  }

  function nextStep() {
    if (step < totalSteps) setStep(step + 1)
  }

  function prevStep() {
    if (step > 1) setStep(step - 1)
  }

  function canProceed() {
    if (step === 1) return formData.name.trim().length > 0
    if (step === 2) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    return formData.message.trim().length > 0
  }

  const fieldClass =
    "w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-[#3f7dff]/50 focus:outline-none focus:ring-2 focus:ring-[#3f7dff]/25"

  const stepLabelClass = "font-mono text-[10px] uppercase tracking-[0.3em] text-[#3f7dff]"

  const questionClass = "font-google-sans text-lg sm:text-xl font-[450] text-foreground"

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 sm:py-28 lg:py-32"
    >
      <LightAurora intensity={0.7} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Hablemos"
          title="Empezá hoy"
          subtitle="Primera consulta sin cargo"
        />

        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-8 sm:gap-10"
          >
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              Queremos entender tu problema y resolverlo. Contanos qué necesitás y
              te respondemos en menos de 24 horas.
            </p>

            <div className="flex flex-col gap-4">
              {contactMethods.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="group flex items-center gap-4 transition-transform duration-300 hover:translate-x-1"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-[#3f7dff]/20 bg-[#3f7dff]/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#3f7dff]/15">
                    <Icon className="h-5 w-5 text-[#3f7dff]" />
                  </div>
                  <div>
                    <p className={`${stepLabelClass} mb-0.5`}>{label}</p>
                    <p className="break-all text-sm font-medium text-foreground transition-colors group-hover:text-[#3f7dff] sm:text-base">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {sent ? (
              <div className="flex min-h-[350px] flex-col items-center justify-center gap-5 rounded-2xl border border-[#3f7dff]/25 bg-card p-8 text-center shadow-[0_2px_16px_-8px_rgba(10,14,26,0.08)] dark:shadow-[0_2px_16px_-8px_rgba(0,0,0,0.5)] sm:min-h-[400px] sm:p-12">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#3f7dff]/30 bg-[#3f7dff]/10"
                >
                  <CheckCircle className="h-6 w-6 text-[#3f7dff]" />
                </motion.div>
                <div>
                  <h3 className="font-google-sans text-xl font-[450] text-foreground">
                    Mensaje recibido
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Te contactamos en menos de 24 horas.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_2px_16px_-8px_rgba(10,14,26,0.08)] dark:shadow-[0_2px_16px_-8px_rgba(0,0,0,0.5)] sm:p-8"
              >
                <BorderBeam
                  size={80}
                  duration={9}
                  colorFrom="#bcdcff"
                  colorTo="#3f7dff"
                  borderWidth={1.5}
                />

                {/* Progress */}
                <div className="flex flex-col gap-2">
                  <span className={stepLabelClass}>
                    Paso {step} de {totalSteps}
                  </span>
                  <div className="h-1 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full bg-[#3f7dff]"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-2.5"
                  >
                    <label htmlFor="name" className={questionClass}>
                      ¿Cómo te llamás?
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre"
                      aria-describedby={error ? "form-error" : undefined}
                      aria-invalid={error ? true : undefined}
                      className={fieldClass}
                    />
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-2.5"
                  >
                    <label htmlFor="email" className={questionClass}>
                      ¿Cuál es tu email?
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@empresa.com"
                      aria-describedby={error ? "form-error" : undefined}
                      aria-invalid={error ? true : undefined}
                      className={fieldClass}
                    />
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-2.5"
                  >
                    <label htmlFor="message" className={questionClass}>
                      ¿Qué necesitás?
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Describí tu proyecto o problema..."
                      aria-describedby={error ? "form-error" : undefined}
                      aria-invalid={error ? true : undefined}
                      className={`${fieldClass} resize-none`}
                    />
                  </motion.div>
                )}

                {error && (
                  <p
                    id="form-error"
                    role="alert"
                    aria-live="assertive"
                    className="rounded-xl border border-red-300/60 bg-red-50 px-3 py-2 text-xs text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400"
                  >
                    {error}
                  </p>
                )}

                <div className="flex items-center justify-between pt-1">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center gap-2 px-2 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Atrás
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < totalSteps ? (
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      disabled={!canProceed()}
                      whileHover={canProceed() ? { scale: 1.045 } : undefined}
                      whileTap={canProceed() ? { scale: 0.96 } : undefined}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-[#3f7dff] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#2f6bec] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Siguiente
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={loading || !canProceed()}
                      whileHover={!loading && canProceed() ? { scale: 1.045 } : undefined}
                      whileTap={!loading && canProceed() ? { scale: 0.96 } : undefined}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-[#3f7dff] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#2f6bec] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? "Enviando..." : "Enviar mensaje"}
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </motion.button>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
