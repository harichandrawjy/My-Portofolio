"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";

export function MagneticEmail({ email }: { email: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.4 });

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.25);
    y.set(relY * 0.25);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={`mailto:${email}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ x: sx, y: sy }}
      className="group inline-flex items-center gap-4 border border-fg bg-fg px-8 py-5 text-bg transition-colors hover:bg-accent hover:border-accent hover:text-bg md:px-10 md:py-6"
    >
      <span className="mono text-sm font-medium uppercase tracking-[0.15em]">
        Write to me
      </span>
      <ArrowUpRight
        weight="regular"
        className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </motion.a>
  );
}
