"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, DownloadSimple, List, X } from "@phosphor-icons/react";
import { sections } from "../../data/site";

export function MobileMenu({ email, resume }: { email: string; resume: string }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    // Hand focus back to the menu button when the menu closes.
    if (!open) {
      if (wasOpen.current) openRef.current?.focus({ preventScroll: true });
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={openRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex size-10 items-center justify-center rounded-full border border-rule-strong text-ink transition-colors hover:border-lime hover:bg-lime hover:text-on-lime"
      >
        <List aria-hidden className="size-5" />
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col bg-bg px-5 pb-8 pt-4">
          <div className="flex justify-end">
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex size-10 items-center justify-center rounded-full border border-rule-strong text-ink transition-colors hover:border-lime hover:bg-lime hover:text-on-lime"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>
          <nav aria-label="Sections" className="mt-6 flex-1">
            <ul className="divide-y divide-rule border-y border-rule">
              {[...sections, { id: "contact", label: "Contact" }].map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`/#${s.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 py-5 transition-colors hover:text-accent"
                  >
                    <span className="label-mono text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display text-4xl">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <a
              href={`mailto:${email}`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink font-semibold text-bg transition-colors hover:bg-brand hover:text-white"
            >
              Email me
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
            <a
              href={resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-ink font-semibold text-ink transition-colors hover:border-lime hover:bg-lime hover:text-on-lime"
            >
              Resume
              <DownloadSimple aria-hidden className="size-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
