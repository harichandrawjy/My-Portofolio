"use client";

import { motion, useReducedMotion } from "motion/react";

export function StackMarquee({ items }: { items: readonly string[] }) {
  const reduce = useReducedMotion();
  const line = [...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex gap-16 whitespace-nowrap"
        animate={reduce ? undefined : { x: ["0%", "-33.333%"] }}
        transition={
          reduce
            ? undefined
            : { duration: 40, ease: "linear", repeat: Infinity }
        }
      >
        {line.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mono text-[clamp(1.75rem,4vw,3rem)] font-medium uppercase tracking-[-0.01em] text-fg"
          >
            {item}
            <span className="ml-16 inline-block h-2 w-2 translate-y-[-0.35em] rounded-full bg-accent align-middle" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
