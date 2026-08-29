"use client"

import { motion } from "framer-motion"

export function WhatsAppButton() {
  const phoneNumber = "5493513614462" // formato internacional sin +
  const message = "Hola! Vengo desde la web de KEI Software y me gustaría consultar sobre sus servicios."
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group"
      aria-label="Contactar por WhatsApp"
    >
      <div className="relative">
        {/* Button */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-600 ring-1 ring-white/10 overflow-hidden transition-transform duration-300 flex items-center justify-center shadow-lg hover:scale-110 active:scale-105">
          {/* Blue fill — paints in from the center on hover */}
          <span className="absolute inset-0 rounded-full bg-[#3f7dff] scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
          <svg viewBox="0 0 24 24" fill="white" className="relative z-10 w-6 h-6 sm:w-7 sm:h-7">
            <path d="M12.001 2C6.478 2 2 6.478 2 12c0 1.874.508 3.628 1.393 5.135L2 22l5.03-1.35A9.955 9.955 0 0012 22c5.523 0 10-4.478 10-10S17.523 2 12.001 2zm0 18.062a8.02 8.02 0 01-4.087-1.117l-.293-.174-3.032.813.814-2.976-.19-.306A8.017 8.017 0 014 12c0-4.411 3.589-8 8.001-8 4.411 0 7.999 3.589 7.999 8s-3.588 8.062-7.999 8.062z" />
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          </svg>
        </div>
      </div>
      
      {/* Tooltip - hidden on mobile, shown on desktop */}
      <div className="hidden sm:block absolute bottom-full right-0 mb-2 px-3 py-2 bg-surface border border-border rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <p className="text-xs text-foreground font-medium">¿Hablamos por WhatsApp?</p>
      </div>
    </motion.a>
  )
}
