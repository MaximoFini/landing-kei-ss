"use client"

import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export function WhatsAppButton() {
  const phoneNumber = "5493513614462" // formato internacional sin +
  const message = "Hola! Vengo desde la web de Kei Software y me gustaría consultar sobre sus servicios."
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
        {/* Ping animation */}
        <span className="absolute inset-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] opacity-75 animate-ping" />
        
        {/* Button */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] active:bg-[#1DA851] transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-105">
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
      </div>
      
      {/* Tooltip - hidden on mobile, shown on desktop */}
      <div className="hidden sm:block absolute bottom-full right-0 mb-2 px-3 py-2 bg-surface border border-border rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <p className="text-xs text-foreground font-medium">¿Hablamos por WhatsApp?</p>
      </div>
    </motion.a>
  )
}
