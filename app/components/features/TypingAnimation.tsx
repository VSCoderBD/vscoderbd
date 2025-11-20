"use client";
import { useState, useEffect } from "react";

export default function TypingAnimation() {
  const texts = [
    "Next.js Developer",
    "Frontend Web Developer",
    "UI/UX Designer",
  ];

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [speed, setSpeed] = useState(120);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (subIndex < texts[index].length) {
          setSubIndex(subIndex + 1);
        } else {
          setIsPaused(true);
          setTimeout(() => {
            setDeleting(true);
            setSpeed(60);
            setIsPaused(false);
          }, 2000);
        }
      } else {
        if (subIndex > 0) {
          setSubIndex(subIndex - 1);
        } else {
          setDeleting(false);
          setSpeed(120);
          setIndex((index + 1) % texts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, isPaused]);

  return (
    <span className="relative">
      {texts[index].substring(0, subIndex)}
      <span className="inline-block ml-1 w-[0.5ch] text-current animate-blink">_</span>
      <style jsx>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 2s infinite;
        }
      `}</style>
    </span>
  );
}
