/*
 * Vanilla pointer-tilt for `[data-tilt]` elements — port of the interactive part
 * of components/ui/tilt-card.tsx.
 *
 * The source uses 4 Framer motion values + 2 springs (useMotionValue /
 * useSpring / useTransform) to tilt the card toward the cursor and move a radial
 * spotlight. We keep it JS but drop Framer: a pointermove handler writes CSS
 * custom properties and CSS does the rest.
 *
 * DIFFERENCE: the Framer springs (stiffness 220 / damping 20) are approximated
 * by a `transition: transform .18s ease-out` — visually near-identical for a
 * small ±6deg tilt, without a physics loop. Touch devices never fire
 * pointermove with hover, so they stay flat (matches the source).
 */

function initTilt() {
  const cards = document.querySelectorAll<HTMLElement>("[data-tilt]:not([data-tilt-ready])");

  cards.forEach((card) => {
    card.dataset.tiltReady = "";
    const max = Number(card.dataset.tiltMax || "7");

    const onMove = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--tilt-rx", `${(0.5 - py) * 2 * max}deg`);
      card.style.setProperty("--tilt-ry", `${(px - 0.5) * 2 * max}deg`);
      card.style.setProperty("--tilt-px", `${px * 100}%`);
      card.style.setProperty("--tilt-py", `${py * 100}%`);
    };

    const reset = () => {
      card.style.setProperty("--tilt-rx", "0deg");
      card.style.setProperty("--tilt-ry", "0deg");
      card.style.setProperty("--tilt-px", "50%");
      card.style.setProperty("--tilt-py", "50%");
    };

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", reset);
  });
}

initTilt();
document.addEventListener("astro:page-load", initTilt);
