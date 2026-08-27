"use client";

import { useEffect, useState, useRef } from "react";

interface LineConfig {
  text: string;
  className?: string;
}

interface TypewriterHeadlineProps {
  lines: LineConfig[];
  startDelay?: number;
  typingSpeed?: number;
  linePause?: number;
  cursorColor?: string;
  onComplete?: () => void;
}

export function TypewriterHeadline({
  lines,
  startDelay = 80,
  typingSpeed = 22,
  linePause = 100,
  cursorColor = "#3f7dff",
  onComplete,
}: TypewriterHeadlineProps) {
  const [typedLines, setTypedLines] = useState<string[]>(() => lines.map(() => ""));
  const [activeLineIndex, setActiveLineIndex] = useState<number>(0);
  const [isDone, setIsDone] = useState<boolean>(false);

  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const linesRef = useRef(lines);
  linesRef.current = lines;

  useEffect(() => {
    // If already finished once, do not re-run
    if (completedRef.current) return;

    let currentLine = 0;
    let currentChar = 0;
    let timeoutId: NodeJS.Timeout;

    const fullText = linesRef.current.map((l) => l.text);
    const progressLines = linesRef.current.map(() => "");

    const typeNextChar = () => {
      if (currentLine >= fullText.length) {
        setIsDone(true);
        if (!completedRef.current) {
          completedRef.current = true;
          onCompleteRef.current?.();
        }
        return;
      }

      const targetText = fullText[currentLine];

      if (currentChar < targetText.length) {
        currentChar++;
        progressLines[currentLine] = targetText.slice(0, currentChar);
        setTypedLines([...progressLines]);
        setActiveLineIndex(currentLine);

        // Fast & accelerated typing cadence with subtle micro-delays
        const char = targetText[currentChar - 1];
        let delay = typingSpeed;
        if (char === "." || char === ",") delay += 35;
        else if (char === " ") delay -= 6;

        timeoutId = setTimeout(typeNextChar, Math.max(delay, 12));
      } else {
        // Next line transition
        currentLine++;
        currentChar = 0;
        if (currentLine < fullText.length) {
          setActiveLineIndex(currentLine);
          timeoutId = setTimeout(typeNextChar, linePause);
        } else {
          setIsDone(true);
          if (!completedRef.current) {
            completedRef.current = true;
            onCompleteRef.current?.();
          }
        }
      }
    };

    timeoutId = setTimeout(typeNextChar, startDelay);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDelay, typingSpeed, linePause]);

  const rawAccessibleText = lines.map((l) => l.text).join(" ");

  return (
    <div className="relative inline-block w-full will-change-contents">
      {/* Screen reader friendly text */}
      <span className="sr-only">{rawAccessibleText}</span>

      {/* Visual typewriter lines */}
      <div aria-hidden="true" className="flex flex-col items-center select-none text-center">
        {lines.map((line, idx) => {
          const isCurrentActiveLine = idx === activeLineIndex;
          const showCursorHere = !isDone && isCurrentActiveLine;
          const text = typedLines[idx] || "";

          return (
            <div
              key={idx}
              className={`flex items-baseline justify-center flex-wrap relative ${line.className ?? ""}`}
            >
              <span>{text}</span>

              {/* Blinking Antigravity-style Cursor */}
              {showCursorHere && (
                <span
                  className="inline-block w-[3px] sm:w-[5px] h-[0.82em] ml-1.5 sm:ml-2.5 self-center rounded-xs"
                  style={{
                    backgroundColor: cursorColor,
                    boxShadow: `0 0 10px ${cursorColor}, 0 0 20px ${cursorColor}60`,
                    animation: "antigravity-blink 0.65s infinite ease-in-out",
                    transform: "translateY(2%)",
                    willChange: "opacity",
                  }}
                />
              )}
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        @keyframes antigravity-blink {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
}
