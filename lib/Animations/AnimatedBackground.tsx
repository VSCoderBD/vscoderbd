"use client";

import { useEffect, useRef } from "react";

const ANIMATION_STYLES = `
@keyframes animBack {
  0% { transform: translateY(-60px); }
  100% { transform: translateY(120vh); }
}
.animate-slide-down {
  animation: animBack 6s linear infinite;
}
`;

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({ className }: AnimatedBackgroundProps) {
  const bgRef = useRef<HTMLDivElement | null>(null);
  const numberOfColorBoxes = 400;
  const ACCENT_COLOR = "rgb(183, 255, 111)";
  const BG_COLOR_DARK = "#111";

  useEffect(() => {
    const bgAnimation = bgRef.current;
    if (!bgAnimation) return;

    bgAnimation.innerHTML = ""; // Clear previous boxes

    for (let i = 0; i < numberOfColorBoxes; i++) {
      const colorBox = document.createElement("div");
      colorBox.className =
        "m-[2px] bg-[#1d1d1d] transition-all duration-[2000ms] ease-in-out hover:bg-[rgb(183,255,111)] hover:duration-0 filter brightness-[1.1] pointer-events-auto";
      bgAnimation.append(colorBox);
    }
  }, []);

// lib/Animations/AnimatedBackground.js

// ... (অন্যান্য কোড)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ANIMATION_STYLES }} />

      <div
        ref={bgRef}
        className={`
          fixed inset-0 w-full h-screen  /* পুরো স্ক্রিন কভার করার জন্য */
          grid grid-cols-20 grid-rows-20
          bg-[#0f0f0f] filter saturate-[2] 
          ${className || ""}
        `}
      ></div>

      {/* Moving blurred bar */}
{/* Moving blurred green bar */}
<div
  className="fixed top-0  left-0 w-full h-10 pointer-events-none animate-slide-down"
  style={{
    backgroundColor: "rgba(183, 255, 111, 1)", // stronger opacity
    filter: "blur(80px) drop-shadow(0 0 20px rgb(183, 255, 111))", // vivid glow
  }}
></div>


      <style jsx global>{`
        .grid-cols-20 {
          grid-template-columns: repeat(20, 1fr);
        }
        .grid-rows-20 {
          grid-template-rows: repeat(20, 1fr);
        }
      `}</style>
    </>
  );
}
