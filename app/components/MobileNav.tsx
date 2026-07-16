"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const links = [
  { href: "#about", label: "About", index: "01" },
  { href: "#work", label: "Work", index: "02" },
  { href: "#stack", label: "Stack", index: "03" },
  { href: "#contact", label: "Contact", index: "04" },
];

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function MobileNav({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="fixed right-4 top-4 z-[90] flex h-10 w-10 items-center justify-center md:hidden"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span className="relative block h-5 w-6">
          <motion.span
            className="absolute left-0 block h-px w-full bg-fg"
            animate={open ? { top: "50%", rotate: 45, y: "-50%" } : { top: "20%", rotate: 0, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.span
            className="absolute left-0 block h-px w-full bg-fg"
            style={{ top: "50%" }}
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          />
          <motion.span
            className="absolute left-0 block h-px w-full bg-fg"
            animate={open ? { top: "50%", rotate: -45, y: "-50%" } : { top: "80%", rotate: 0, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </span>
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="mobile-nav-panel"
                initial={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: reduce ? 0.15 : 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-[70] flex flex-col md:hidden"
                style={{ backgroundColor: "#0a0a0a" }}
              >
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute inset-0 [background:radial-gradient(circle_at_20%_10%,rgba(214,74,44,0.18),transparent_40%),radial-gradient(circle_at_80%_90%,rgba(80,80,120,0.12),transparent_45%)]" />
            </div>

            <div className="relative flex h-16 items-center justify-between px-6">
              <span className="mono text-sm font-medium uppercase tracking-[0.15em]">
                HCW<span className="text-accent">.</span>
              </span>
            </div>

            <nav className="relative flex flex-1 flex-col justify-center px-6">
              <ul className="space-y-1">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.55,
                      delay: 0.15 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline justify-between gap-6 border-b border-rule py-6"
                    >
                      <div className="flex items-baseline gap-6">
                        <span className="mono text-xs uppercase tracking-[0.22em] text-fg-dim">
                          {link.index}
                        </span>
                        <span className="mono text-[clamp(2.5rem,10vw,4rem)] font-medium uppercase leading-none tracking-[-0.02em] text-fg transition-colors group-hover:text-accent">
                          {link.label}
                        </span>
                      </div>
                      <span className="mono text-xs uppercase tracking-[0.22em] text-fg-dim transition-transform group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="relative flex flex-col gap-2 px-6 pb-10">
              <span className="mono text-[10px] uppercase tracking-[0.25em] text-fg-dim">
                Contact
              </span>
              <a
                href={`mailto:${email}`}
                onClick={() => setOpen(false)}
                className="mono text-base uppercase tracking-[0.05em] text-fg"
              >
                {email}
              </a>
            </div>
          </motion.div>
        )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
