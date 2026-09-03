import { useEffect, useState } from "preact/hooks";

/*
 * Loader island for the WebGL fluid sim. Mirrors the gating that lived in
 * components/hero.tsx: the ~550 KB three.js chunk is a desktop-only flourish,
 * so we don't even fetch it on phones / small tablets (`max-width: 1023px`),
 * under Data Saver, on low-memory devices (`deviceMemory <= 2`) or when the
 * user asked for reduced motion. When the gates pass, the mount is deferred
 * with `requestIdleCallback` (1200ms timeout) — matching the source — before
 * dynamically importing LiquidEtherImpl (which is what pulls in `three`).
 *
 * Rendered with `client:idle` in Hero.astro. Props are copied verbatim from
 * the source `<LiquidEther />` usage.
 */

const COLORS = ["#0b1a42", "#1a4fc0", "#3f7dff", "#bcdcff"];

export default function LiquidEther() {
  const [Impl, setImpl] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const nav = window.navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    const isSmallScreen = window.matchMedia?.("(max-width: 1023px)").matches;
    const saveData = nav.connection?.saveData === true;
    const lowMemory =
      typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2;
    if (isSmallScreen || saveData || lowMemory) return;

    let cancelled = false;
    const load = () => {
      import("./LiquidEtherImpl").then((m) => {
        if (!cancelled) setImpl(() => m.default);
      });
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(load, { timeout: 1200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }
    const id = window.setTimeout(load, 200);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, []);

  if (!Impl) return null;

  return (
    <div class="absolute inset-0">
      <Impl
        colors={COLORS}
        mouseForce={16}
        cursorSize={90}
        clickForce={0.3}
        isViscous={false}
        viscous={30}
        iterationsViscous={12}
        iterationsPoisson={10}
        resolution={0.25}
        BFECC={false}
        isBounce={false}
        autoDemo
        autoSpeed={0.3}
        autoIntensity={0.9}
        takeoverDuration={0.25}
        autoResumeDelay={50}
        autoRampDuration={1.2}
      />
    </div>
  );
}
