"use client";

import { useEffect, useRef } from "react";

interface Props {
  className?: string;
}

interface Point2D {
  x: number;
  y: number;
}

class AnimatedLine {
  path: Point2D[];
  elapsed: number;
  drawDuration: number;
  fading: boolean;
  fadeElapsed: number;
  fadeDuration: number;

  constructor(path: Point2D[]) {
    this.path = path;
    this.elapsed = 0;
    this.drawDuration = 0.2; // draw 0.2s
    this.fading = false;
    this.fadeElapsed = 0;
    this.fadeDuration = 0.5; // fade 0.5s
  }

  update(ctx: CanvasRenderingContext2D, deltaTime: number) {
    if (!this.fading) {
      this.elapsed += deltaTime;
      const progress = Math.min(this.elapsed / this.drawDuration, 1);

      const pointsToDraw = this.path.slice(0, Math.floor(progress * this.path.length));

      if (pointsToDraw.length > 0) {
        ctx.strokeStyle = "rgba(183,255,111,1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pointsToDraw[0].x, pointsToDraw[0].y);
        for (let i = 1; i < pointsToDraw.length; i++) {
          ctx.lineTo(pointsToDraw[i].x, pointsToDraw[i].y);
        }
        ctx.stroke();
      }

      if (progress >= 1) this.fading = true;
    } else {
      this.fadeElapsed += deltaTime;
      const alpha = Math.max(1 - this.fadeElapsed / this.fadeDuration, 0);
      ctx.strokeStyle = `rgba(183,255,111,${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      this.path.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
      ctx.stroke();
      if (alpha <= 0) return true;
    }
    return false;
  }
}

export default function AnimatedBackground({ className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const isMobile = width < 640;

    const backgroundLinesCount = 500;
    const maxAnimatedLines = 500;
    const spawnProb = isMobile ? 0.2 : 1.0; // mobile spawn slower

    const backgroundPaths: Point2D[][] = [];
    const animatedLines: AnimatedLine[] = [];

    function createRandomPath(): Point2D[] {
      const path: Point2D[] = [];
      let x = Math.random() * width;
      let y = Math.random() * height;
      path.push({ x, y });
      const length = Math.random() * 50 + 20;
      let direction = Math.floor(Math.random() * 4);

      for (let i = 0; i < length; i++) {
        switch (direction) {
          case 0: x += 4; break;
          case 1: y += 4; break;
          case 2: x -= 4; break;
          case 3: y -= 4; break;
        }
        x = Math.min(Math.max(x, 0), width);
        y = Math.min(Math.max(y, 0), height);
        path.push({ x, y });
        if (Math.random() < 0.3) direction = Math.floor(Math.random() * 4);
      }
      return path;
    }

    // Create 500 background paths
    for (let i = 0; i < backgroundLinesCount; i++) {
      backgroundPaths.push(createRandomPath());
    }

    let lastTime = performance.now();

    function animate(time: number) {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      // Semi-transparent overlay for fading
      ctx.fillStyle = "rgba(30,30,30,0.1)";
      ctx.fillRect(0, 0, width, height);

      // Draw background paths
      ctx.strokeStyle = "#222";
      ctx.lineWidth = 1;
      backgroundPaths.forEach((path) => {
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) ctx.lineTo(path[i].x, path[i].y);
        ctx.stroke();
      });

      // Spawn animated lines
      if (animatedLines.length < maxAnimatedLines && Math.random() < spawnProb) {
        const randomPath = backgroundPaths[Math.floor(Math.random() * backgroundPaths.length)];
        animatedLines.push(new AnimatedLine(randomPath));
      }

      // Update animated lines
      for (let i = animatedLines.length - 1; i >= 0; i--) {
        if (animatedLines[i].update(ctx, deltaTime)) animatedLines.splice(i, 1);
      }

      requestAnimationFrame(animate);
    }

    animate(performance.now());

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      backgroundPaths.length = 0;
      for (let i = 0; i < backgroundLinesCount; i++) {
        backgroundPaths.push(createRandomPath());
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className={`${className} w-full h-full`} />;
}
