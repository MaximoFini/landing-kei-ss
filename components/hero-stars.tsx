"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  r: number
  base: number
  phase: number
  speed: number
  sparkle: boolean
  vx: number
  vy: number
  color: string
}

interface ShootingStar {
  x: number
  y: number
  vx: number
  vy: number
  len: number
  life: number
  maxLife: number
}

interface Nebula {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  colorA: string
  colorB: string
  phase: number
  pulseSpeed: number
}

// Cielo con vida: bastantes estrellas de colores con deriva lenta propia,
// nubes de nebulosa respirando de fondo, y alguna fugaz cruzando cada
// tanto -- no es un acento estático, se mueve solo.
const STAR_COUNT = 130
const SPARKLE_RATIO = 0.16
const SHOOTING_STAR_CHANCE_PER_SEC = 0.5
const STAR_COLORS = [
  "255,255,255", // blanco, mayoría
  "255,255,255",
  "255,255,255",
  "255,244,214", // dorado tenue
  "214,232,255", // celeste pálido
  "226,214,255", // lila pálido
]
const NEBULA_COLORS: [string, string][] = [
  ["99,140,255", "48,79,197"],
  ["150,110,255", "70,58,170"],
  ["90,200,255", "45,110,200"],
]

export function HeroStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = canvas?.parentElement
    if (!canvas || !wrap) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = 0
    let height = 0
    let stars: Star[] = []
    let shootingStars: ShootingStar[] = []
    let nebulas: Nebula[] = []
    let raf = 0
    let lastT = 0
    let shootingTimer = 0

    const dpr = () => window.devicePixelRatio || 1

    function seed() {
      const rect = wrap!.getBoundingClientRect()
      const ratio = dpr()
      width = Math.round(rect.width)
      height = Math.round(rect.height)
      canvas!.width = Math.round(width * ratio)
      canvas!.height = Math.round(height * ratio)
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(ratio, 0, 0, ratio, 0, 0)

      stars = Array.from({ length: STAR_COUNT }, () => {
        const angle = Math.random() * Math.PI * 2
        const driftSpeed = Math.random() * 4 + 1.5 // px/s, lento
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 0.8 + 0.6,
          base: Math.random() * 0.35 + 0.5,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.8 + 0.3,
          sparkle: Math.random() < SPARKLE_RATIO,
          vx: Math.cos(angle) * driftSpeed,
          vy: Math.sin(angle) * driftSpeed,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        }
      })

      nebulas = NEBULA_COLORS.map(([colorA, colorB], i) => {
        const angle = Math.random() * Math.PI * 2
        const driftSpeed = Math.random() * 2 + 0.6
        return {
          x: width * (0.2 + 0.3 * i) + Math.random() * width * 0.2,
          y: height * (0.15 + Math.random() * 0.5),
          vx: Math.cos(angle) * driftSpeed,
          vy: Math.sin(angle) * driftSpeed,
          r: Math.max(width, height) * (0.28 + Math.random() * 0.12),
          colorA,
          colorB,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.06 + 0.04,
        }
      })
    }

    function spawnShootingStar() {
      const fromLeft = Math.random() < 0.5
      const y = Math.random() * height * 0.6
      const speed = Math.random() * 260 + 340 // px/s
      const angle = (fromLeft ? 1 : -1) * (Math.PI / 7) + (Math.random() * 0.15 - 0.075)
      shootingStars.push({
        x: fromLeft ? -40 : width + 40,
        y,
        vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
        vy: Math.sin(angle) * speed,
        len: Math.random() * 60 + 70,
        life: 0,
        maxLife: Math.random() * 0.4 + 0.7,
      })
    }

    function step(t: number) {
      const dt = lastT ? Math.min((t - lastT) / 1000, 0.05) : 0
      lastT = t
      ctx!.clearRect(0, 0, width, height)
      const time = t / 1000

      // Nebulosas: manchas de color muy suaves y grandes que respiran y
      // derivan despacio, para que el cielo se sienta profundo, no plano.
      ctx!.globalCompositeOperation = "screen"
      for (const n of nebulas) {
        n.x += n.vx * dt
        n.y += n.vy * dt
        if (n.x < -n.r * 0.5) n.x = width + n.r * 0.5
        if (n.x > width + n.r * 0.5) n.x = -n.r * 0.5
        if (n.y < -n.r * 0.5) n.y = height + n.r * 0.5
        if (n.y > height + n.r * 0.5) n.y = -n.r * 0.5

        const pulse = 0.85 + 0.15 * Math.sin(time * n.pulseSpeed + n.phase)
        const grad = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * pulse)
        grad.addColorStop(0, `rgba(${n.colorA},0.16)`)
        grad.addColorStop(0.55, `rgba(${n.colorB},0.08)`)
        grad.addColorStop(1, "rgba(0,0,0,0)")
        ctx!.fillStyle = grad
        ctx!.beginPath()
        ctx!.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2)
        ctx!.fill()
      }
      ctx!.globalCompositeOperation = "source-over"

      for (const s of stars) {
        s.x += s.vx * dt
        s.y += s.vy * dt
        if (s.x < -2) s.x = width + 2
        if (s.x > width + 2) s.x = -2
        if (s.y < -2) s.y = height + 2
        if (s.y > height + 2) s.y = -2

        // solo titila la opacidad -- el tamaño (s.r, el largo del destello)
        // nunca cambia, así no se ve como una manchita que "crece"
        const twinkle = 0.5 + 0.5 * Math.sin(time * s.speed + s.phase)
        const opacity = s.base * (0.5 + 0.5 * twinkle)

        if (s.sparkle) {
          const len = s.r * 7
          const grad = ctx!.createLinearGradient(s.x - len, s.y, s.x + len, s.y)
          grad.addColorStop(0, `rgba(${s.color},0)`)
          grad.addColorStop(0.5, `rgba(${s.color},${opacity})`)
          grad.addColorStop(1, `rgba(${s.color},0)`)
          ctx!.strokeStyle = grad
          ctx!.lineWidth = 1
          ctx!.beginPath()
          ctx!.moveTo(s.x - len, s.y)
          ctx!.lineTo(s.x + len, s.y)
          ctx!.stroke()

          const gradV = ctx!.createLinearGradient(s.x, s.y - len, s.x, s.y + len)
          gradV.addColorStop(0, `rgba(${s.color},0)`)
          gradV.addColorStop(0.5, `rgba(${s.color},${opacity})`)
          gradV.addColorStop(1, `rgba(${s.color},0)`)
          ctx!.strokeStyle = gradV
          ctx!.beginPath()
          ctx!.moveTo(s.x, s.y - len)
          ctx!.lineTo(s.x, s.y + len)
          ctx!.stroke()
        }

        ctx!.beginPath()
        ctx!.fillStyle = `rgba(${s.color}, ${Math.min(opacity + 0.25, 1).toFixed(3)})`
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx!.fill()
      }

      if (dt > 0) {
        shootingTimer += dt
        const chanceThisFrame = SHOOTING_STAR_CHANCE_PER_SEC * dt
        if (shootingTimer > 1.2 && Math.random() < chanceThisFrame) {
          spawnShootingStar()
          shootingTimer = 0
        }
      }

      shootingStars = shootingStars.filter((s) => {
        s.life += dt
        s.x += s.vx * dt
        s.y += s.vy * dt
        if (s.life >= s.maxLife) return false

        const fade = s.life < s.maxLife * 0.2 ? s.life / (s.maxLife * 0.2) : 1 - (s.life - s.maxLife * 0.2) / (s.maxLife * 0.8)
        const dir = Math.atan2(s.vy, s.vx)
        const tailX = s.x - Math.cos(dir) * s.len
        const tailY = s.y - Math.sin(dir) * s.len

        const grad = ctx!.createLinearGradient(tailX, tailY, s.x, s.y)
        grad.addColorStop(0, "rgba(255,255,255,0)")
        grad.addColorStop(1, `rgba(255,255,255,${Math.max(fade, 0)})`)
        ctx!.strokeStyle = grad
        ctx!.lineWidth = 1.6
        ctx!.lineCap = "round"
        ctx!.beginPath()
        ctx!.moveTo(tailX, tailY)
        ctx!.lineTo(s.x, s.y)
        ctx!.stroke()

        ctx!.beginPath()
        ctx!.fillStyle = `rgba(255,255,255,${Math.max(fade, 0)})`
        ctx!.arc(s.x, s.y, 1.4, 0, Math.PI * 2)
        ctx!.fill()

        return true
      })

      raf = requestAnimationFrame(step)
    }

    seed()
    raf = requestAnimationFrame(step)

    const observer = new ResizeObserver(() => seed())
    observer.observe(wrap)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <div aria-hidden className="absolute inset-0 h-full w-full overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
