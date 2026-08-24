"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, MapPin, Phone, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"

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

  return (
    <section id="contacto" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6">
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
              Hablemos
            </span>
            <h2 className="mt-2 sm:mt-3 text-3xl sm:text-5xl lg:text-6xl font-black text-foreground uppercase tracking-tight leading-none">
              Empezá<br />hoy
            </h2>
          </div>
          {/* Free consultation callout */}
          <div className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-3 rounded-sm border border-neon/40 bg-neon/5">
            <CheckCircle className="w-4 h-4 text-neon flex-shrink-0" />
            <p className="text-xs sm:text-sm text-foreground font-medium">
              La primera consulta es <span className="text-neon font-bold">sin cargo</span>
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          {/* Left — info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-8 sm:gap-10"
          >
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-sm">
              Queremos entender tu problema y resolverlo.
            </p>

            <div className="flex flex-col gap-5 sm:gap-6">
              <a
                href="mailto:contacto@keisoftware.dev"
                className="flex items-center gap-4 sm:gap-5 group transition-transform hover:translate-x-1 duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-sm bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0 group-hover:bg-neon/20 group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-neon" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-0.5">
                    Email
                  </p>
                  <p className="text-sm sm:text-base font-medium text-foreground group-hover:text-neon transition-colors break-all">
                    contacto@keisoftware.dev
                  </p>
                </div>
              </a>

              <a
                href="tel:+543513614462"
                className="flex items-center gap-4 sm:gap-5 group transition-transform hover:translate-x-1 duration-300"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-sm bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0 group-hover:bg-neon/20 group-hover:scale-110 transition-all duration-300">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-neon" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-0.5">
                    Teléfono / WhatsApp
                  </p>
                  <p className="text-sm sm:text-base font-medium text-foreground group-hover:text-neon transition-colors">
                    +54 351 361-4462
                  </p>
                </div>
              </a>

              <div className="flex items-center gap-4 sm:gap-5">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-sm bg-neon/10 border border-neon/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-neon" />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-mono mb-0.5">
                    Ubicación
                  </p>
                  <p className="text-sm sm:text-base font-medium text-foreground">
                    Córdoba, Argentina — Remoto global
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center gap-5 p-8 sm:p-12 rounded-sm bg-surface border border-neon/30 text-center min-h-[350px] sm:min-h-[400px]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-sm bg-neon/10 border border-neon/30 flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-neon" />
                </motion.div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">
                    Mensaje recibido
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Te contactamos en menos de 24 horas.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 sm:gap-6 p-6 sm:p-8 rounded-sm bg-surface border border-border"
              >
                {/* Progress bar */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground">
                      Paso {step} de {totalSteps}
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-neon">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="h-1 bg-border rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-neon"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Step 1: Name */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-1.5"
                  >
                    <label htmlFor="name" className="text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground">
                      ¿Cómo te llamás?
                    </label>
                    <input
                      id="name"
                      type="text"
                      autoFocus
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Tu nombre"
                      aria-describedby={error ? "form-error" : undefined}
                      aria-invalid={error ? true : undefined}
                      className="px-4 py-3 rounded-sm bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-neon/50 focus:border-neon/50 transition-all duration-300"
                    />
                  </motion.div>
                )}

                {/* Step 2: Email */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-1.5"
                  >
                    <label htmlFor="email" className="text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground">
                      ¿Cuál es tu email?
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoFocus
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tu@empresa.com"
                      aria-describedby={error ? "form-error" : undefined}
                      aria-invalid={error ? true : undefined}
                      className="px-4 py-3 rounded-sm bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-neon/50 focus:border-neon/50 transition-all duration-300"
                    />
                  </motion.div>
                )}

                {/* Step 3: Message */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-1.5"
                  >
                    <label htmlFor="message" className="text-[10px] tracking-[0.2em] uppercase font-mono text-muted-foreground">
                      ¿Qué necesitás?
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      autoFocus
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describí tu proyecto o problema..."
                      aria-describedby={error ? "form-error" : undefined}
                      aria-invalid={error ? true : undefined}
                      className="px-4 py-3 rounded-sm bg-secondary border border-border text-foreground placeholder:text-muted-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-neon/50 focus:border-neon/50 transition-all duration-300 resize-none"
                    />
                  </motion.div>
                )}

                {error && (
                  <p
                    id="form-error"
                    role="alert"
                    aria-live="assertive"
                    className="text-xs text-destructive bg-destructive/10 px-3 py-2 rounded-sm border border-destructive/30"
                  >
                    {error}
                  </p>
                )}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between pt-2">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 hover:translate-x-[-2px]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Atrás
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!canProceed()}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-neon text-foreground font-bold text-sm tracking-wide hover:bg-neon-bright disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-sm hover:scale-105 active:scale-95"
                    >
                      Siguiente
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading || !canProceed()}
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-neon text-foreground font-bold text-sm tracking-wide hover:bg-neon-bright disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-sm hover:scale-105 active:scale-95"
                    >
                      {loading ? "Enviando..." : "Enviar mensaje"}
                      <ArrowRight className="w-4 h-4" />
                    </button>
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
