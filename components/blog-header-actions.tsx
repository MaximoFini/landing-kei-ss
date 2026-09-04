"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

const ICON_BUTTON_CLASSES =
  "grid place-items-center w-9 h-9 rounded-full text-black ring-1 ring-black/10 bg-white/40 backdrop-blur-md transition-all hover:bg-white/70 active:scale-95 dark:text-white dark:ring-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.12]";

export function BlogHeaderActions() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (soundOn) {
      audio.pause();
      setSoundOn(false);
    } else {
      audio.volume = 0.35;
      void audio
        .play()
        .then(() => setSoundOn(true))
        .catch(() => setSoundOn(false));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <audio ref={audioRef} src="/audio/hero-theme.mp3" loop preload="none" />
      <AnimatedThemeToggler className={ICON_BUTTON_CLASSES} />
      <button
        type="button"
        onClick={toggleSound}
        className={ICON_BUTTON_CLASSES}
        aria-pressed={soundOn}
        aria-label={soundOn ? "Silenciar música" : "Reproducir música"}
        title={soundOn ? "Silenciar música" : "Reproducir música"}
      >
        {soundOn ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
