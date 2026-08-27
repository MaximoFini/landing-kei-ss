"use client";
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  base: number;
  phase: number;
  twinkleSpeed: number;
  dx: number;
  dy: number;
}

export function StarField({ count = 150 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let isVisible = true;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    resize();

    // Generate stars
    const stars: Star[] = Array.from({ length: count }, () => ({
      x: Math.random() * (width || 1000),
      y: Math.random() * (height || 800) * 0.78,
      r: Math.random() * 1.0 + 0.3,
      base: Math.random() * 0.5 + 0.15,
      phase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.003 + Math.random() * 0.01,
      dx: (Math.random() - 0.5) * 0.05,
      dy: (Math.random() - 0.5) * 0.025,
    }));

    let raf: number;
    let t = 0;

    const draw = () => {
      if (!isVisible) {
        raf = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      t += 1;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Drift
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height * 0.78;
        if (s.y > height * 0.78) s.y = 0;

        // Twinkle calculation
        const osc = Math.sin(t * s.twinkleSpeed * 60 + s.phase);
        const alpha = s.base * (0.6 + 0.4 * osc);

        // Core star
        ctx.fillStyle = `rgba(215, 230, 255, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();

        // Soft halo for bigger stars without allocating memory / gradients in loop
        if (s.r > 0.8) {
          ctx.fillStyle = `rgba(160, 200, 255, ${(alpha * 0.25).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", resize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "screen", opacity: 0.75, willChange: "transform" }}
    />
  );
}
