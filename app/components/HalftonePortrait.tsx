"use client";

import { useEffect, useRef } from "react";

export function HalftonePortrait() {
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

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const silhouette = (nx: number, ny: number): number => {
      const cx = 0.5;
      const cy = 0.42;
      const dx = nx - cx;
      const dy = ny - cy;

      const head = Math.pow(dx / 0.22, 2) + Math.pow(dy / 0.26, 2);
      if (head < 1 && ny < 0.66) {
        return 1 - head * 0.7;
      }

      if (
        ny > 0.55 &&
        ny < 0.72 &&
        Math.abs(dx) < 0.08 + (ny - 0.55) * 0.4
      ) {
        return 0.6;
      }

      const shoulderTop = 0.68;
      if (ny > shoulderTop && ny < 0.98) {
        const shoulderCurve =
          shoulderTop +
          Math.pow(Math.abs(dx) * 2.2, 1.8) * 0.05;
        if (ny > shoulderCurve && Math.abs(dx) < 0.42) {
          const falloff = 1 - (ny - shoulderTop) * 0.4;
          const edge = 1 - Math.pow(Math.abs(dx) / 0.42, 3);
          return Math.max(0, falloff * edge);
        }
      }

      return 0;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const gap = 9;
      const cols = Math.ceil(width / gap);
      const rows = Math.ceil(height / gap);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap + gap / 2;
          const y = j * gap + gap / 2;
          const nx = x / width;
          const ny = y / height;

          let value = silhouette(nx, ny);

          if (pointer.active) {
            const dx = pointer.x - x;
            const dy = pointer.y - y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 90) {
              value += (1 - dist / 90) * 0.4;
            }
          }

          if (value <= 0.05) continue;

          const size = Math.min(gap * 0.5, value * (gap * 0.55));
          const alpha = Math.min(1, 0.35 + value * 0.75);

          const jitter = reduce
            ? 0
            : Math.sin((x + y) * 0.02 + t * 0.0015) * 0.6;

          ctx.beginPath();
          ctx.arc(x, y + jitter, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(232, 228, 220, ${alpha})`;
          ctx.fill();
        }
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
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      aria-label="Halftone portrait visual"
    />
  );
}
