"use client";

import { useEffect, useRef } from "react";

export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;

    const pointer = { x: -9999, y: -9999, active: false };

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

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    window.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const gap = 22;
    const dotSize = 1.2;
    const radius = 140;

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / gap) + 2;
      const rows = Math.ceil(height / gap) + 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap;
          const y = j * gap;

          const dx = pointer.x - x;
          const dy = pointer.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let ox = 0;
          let oy = 0;
          let alpha = 0.22;
          let size = dotSize;
          let color = "232, 228, 220";

          if (pointer.active && dist < radius) {
            const f = 1 - dist / radius;
            ox = (dx / (dist || 1)) * f * 14;
            oy = (dy / (dist || 1)) * f * 14;
            alpha = 0.22 + f * 0.65;
            size = dotSize + f * 1.4;
            if (f > 0.55) color = "214, 74, 44";
          }

          if (!reduce) {
            const wave = Math.sin((x + y) * 0.008 + t * 0.001) * 0.6;
            oy += wave;
          }

          ctx.beginPath();
          ctx.arc(x + ox, y + oy, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${alpha})`;
          ctx.fill();
        }
      }

      t += 16;
      raf = requestAnimationFrame(draw);
    };

    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
