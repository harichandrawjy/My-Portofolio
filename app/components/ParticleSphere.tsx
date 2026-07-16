"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number; z: number };

type Tone = "red" | "mono";

export function ParticleSphere({ tone = "red" }: { tone?: Tone } = {}) {
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
    let rotY = 0;
    let rotX = -0.2;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pointer = { x: 0, y: 0, active: false };

    const points: P[] = [];
    const count = 1400;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      points.push({
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.sin(phi) * Math.sin(theta),
        z: Math.cos(phi),
      });
    }

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
      pointer.x = (e.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (e.clientY - rect.top) / rect.height - 0.5;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (!reduce) {
        rotY += pointer.active ? 0.003 + pointer.x * 0.01 : 0.0035;
        rotX += pointer.active ? (pointer.y * 0.6 - rotX) * 0.03 : 0;
      }

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.36;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const rendered: {
        px: number;
        py: number;
        depth: number;
        size: number;
      }[] = [];

      for (const p of points) {
        let x = p.x;
        let y = p.y;
        let z = p.z;

        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        x = x1;
        z = z1;

        const y1 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        y = y1;
        z = z2;

        const persp = 1.6 / (1.6 + z * 0.6);
        const px = cx + x * radius * persp;
        const py = cy + y * radius * persp;
        const depth = (z + 1) / 2;

        rendered.push({
          px,
          py,
          depth,
          size: 1.4 + persp * 2.4,
        });
      }

      rendered.sort((a, b) => a.depth - b.depth);

      for (const r of rendered) {
        const alpha = 0.35 + r.depth * 0.65;
        let rc: number;
        let gc: number;
        let bc: number;
        if (tone === "mono") {
          const v = Math.round(60 + r.depth * 195);
          rc = v;
          gc = v;
          bc = Math.round(v * 0.96);
        } else {
          rc = Math.round(30 + r.depth * 220);
          gc = Math.round(10 + r.depth * 40);
          bc = Math.round(10 + r.depth * 30);
        }
        ctx.beginPath();
        ctx.arc(r.px, r.py, r.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rc}, ${gc}, ${bc}, ${alpha})`;
        ctx.fill();
      }

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
  }, [tone]);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      aria-hidden="true"
    />
  );
}
