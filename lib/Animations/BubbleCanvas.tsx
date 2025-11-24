"use client";

import { useEffect, useRef } from "react";

interface Props {
  className?: string;
}

interface Bubble {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
}

export default function BubbleCanvas({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();

    // Bubble count কম → super smooth
    const bubbles: Bubble[] = Array.from({ length: 10 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 40 + Math.random() * 40,
      dx: (Math.random() - 0.5) * 4.0,
      dy: (Math.random() - 0.5) * 4.0,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((b) => {
        b.x += b.dx;
        b.y += b.dy;

        // Wrap movement
        if (b.x - b.r > canvas.width) b.x = -b.r;
        if (b.x + b.r < 0) b.x = canvas.width + b.r;
        if (b.y - b.r > canvas.height) b.y = -b.r;
        if (b.y + b.r < 0) b.y = canvas.height + b.r;

        // Soft glow without heavy blur
        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        gradient.addColorStop(0, "rgba(160, 216, 135, 0.45)"); // center
        gradient.addColorStop(1, "rgba(160, 216, 135, 0)"); // fade out

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none blur-2xl bg-[#272727] ${className || ""}`}
    />
  );
}
