"use client";

import { useEffect, useRef } from "react";

type Disc = {
  x: number;
  y: number;
  r: number;
  hue: number;
  drift: number;
  speed: number;
  phase: number;
};

export function LuminousDiscs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let t = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const discs: Disc[] = [
      { x: 0.5, y: 0.48, r: 0.28, hue: 20, drift: 0.02, speed: 0.0005, phase: 0 },
      { x: 0.56, y: 0.42, r: 0.20, hue: 34, drift: 0.03, speed: 0.0007, phase: 1.2 },
      { x: 0.44, y: 0.55, r: 0.22, hue: 12, drift: 0.025, speed: 0.0006, phase: 2.4 },
      { x: 0.62, y: 0.58, r: 0.14, hue: 42, drift: 0.02, speed: 0.0009, phase: 3.5 },
      { x: 0.38, y: 0.4, r: 0.16, hue: 0, drift: 0.03, speed: 0.0008, phase: 4.7 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const d of discs) {
        const wobbleX = Math.sin(t * d.speed + d.phase) * d.drift;
        const wobbleY = Math.cos(t * d.speed * 1.3 + d.phase) * d.drift;

        const cx = (d.x + wobbleX) * width;
        const cy = (d.y + wobbleY) * height;
        const rr = d.r * Math.min(width, height);

        const grad = ctx.createRadialGradient(
          cx - rr * 0.3,
          cy - rr * 0.3,
          rr * 0.1,
          cx,
          cy,
          rr
        );
        const alpha = 0.55;
        grad.addColorStop(0, `hsla(${d.hue}, 65%, 78%, ${alpha})`);
        grad.addColorStop(0.4, `hsla(${d.hue}, 55%, 45%, ${alpha * 0.35})`);
        grad.addColorStop(1, `hsla(${d.hue}, 40%, 8%, 0)`);

        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${d.hue}, 30%, 85%, 0.14)`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }

      t += 16;
      if (!reduce) raf = requestAnimationFrame(draw);
    };

    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      aria-hidden="true"
    />
  );
}
