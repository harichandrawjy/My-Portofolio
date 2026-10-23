"use client";

import { useEffect, useRef } from "react";

/**
 * Feeds the pointer position to the enclosing section as --px and --py, each from -0.5 to 0.5.
 * `.parallax` layers turn that into depth. Only for a mouse or trackpad, and only when motion is welcome.
 */
export function HeroParallax() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section || !window.matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)").matches) return;

    let frame = 0;
    const set = (x: number, y: number) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        section.style.setProperty("--px", x.toFixed(3));
        section.style.setProperty("--py", y.toFixed(3));
      });
    };
    const onMove = (e: PointerEvent) => set(e.clientX / window.innerWidth - 0.5, e.clientY / window.innerHeight - 0.5);
    const onLeave = () => set(0, 0);

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <span ref={ref} hidden />;
}
