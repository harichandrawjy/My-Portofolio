"use client";

import { motion, useReducedMotion } from "motion/react";

const line1 = ["Hari", "Chandra"];
const line2 = ["Wijaya"];

export function HeroTitle() {
  const reduce = useReducedMotion();

  return (
    <h1 className="mono font-medium leading-[0.9] tracking-[-0.02em] text-fg">
      <span className="block text-[clamp(3rem,10vw,8rem)] uppercase">
        {line1.map((word, i) => (
          <motion.span
            key={word}
            className="inline-block pr-[0.25em] pb-1"
            initial={reduce ? false : { y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.15 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </span>
      <span className="block text-[clamp(3rem,10vw,8rem)] uppercase">
        {line2.map((word, i) => (
          <motion.span
            key={word}
            className="inline-block pb-1"
            initial={reduce ? false : { y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.35 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
        <motion.span
          className="ml-3 inline-block h-[0.6em] w-[0.6em] translate-y-[-0.05em] rounded-full bg-accent align-middle"
          initial={reduce ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
          aria-hidden="true"
        />
      </span>
    </h1>
  );
}
