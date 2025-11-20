"use client";

import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  color: string;
}

export default function BubbleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;

    if (!canvas || !parent) return; // canvas বা parent না থাকলে exit

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // ctx না থাকলে exit

    // Canvas সবসময় parent এর size এর সমান
    const resize = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();

    const colors = ["rgba(183,255,111,0.7)"];

    const bubbles: Bubble[] = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 30 + Math.random() * 50,
      dx: (Math.random() - 0.5) * 2.8 * 5, // গতিবেগ 5 গুণ বেশি
      dy: (Math.random() - 0.5) * 2.8 * 5,
      color: colors[0],
    }));

    const draw = () => {
      // Canvas clear করা
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      bubbles.forEach((b) => {
        b.x += b.dx;
        b.y += b.dy;

        // Parent এর ভিতরে wrap করা
        if (b.x - b.r > canvas.width) b.x = -b.r;
        if (b.x + b.r < 0) b.x = canvas.width + b.r;
        if (b.y - b.r > canvas.height) b.y = -b.r;
        if (b.y + b.r < 0) b.y = canvas.height + b.r;

        const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        gradient.addColorStop(0, b.color);
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();

    // Parent resize হলে canvas resize করা
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
