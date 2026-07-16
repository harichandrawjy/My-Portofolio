"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react";
import type { Project } from "../../data/projects";

gsap.registerPlugin(ScrollTrigger);

export function ProjectStack({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });

        gsap.to(card, {
          scale: 0.92,
          opacity: 0,
          filter: "blur(14px)",
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top 85%",
            end: "top 30%",
            scrub: true,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div ref={ref} className="relative">
      {projects.map((p) => (
        <article
          key={p.title}
          className="stack-card sticky top-0 h-[100dvh] w-full overflow-hidden"
        >
          <div className="relative z-10 mx-auto grid h-full w-full max-w-[1400px] grid-cols-1 gap-8 px-6 pt-16 pb-24 md:grid-cols-12 md:px-10 md:pt-20 md:pb-32">
            <div className="mono flex items-start justify-between text-xs uppercase tracking-[0.2em] text-fg-dim md:col-span-12">
              <span>
                Work / <span className="text-fg">{p.index}</span>
              </span>
              <span>{p.year}</span>
            </div>

            <div className="md:col-span-7 md:col-start-1 flex flex-col justify-start pt-2 md:pt-4">
              <h3 className="mono text-[clamp(2.5rem,7vw,5.5rem)] font-medium uppercase leading-[0.95] tracking-[-0.02em] text-fg">
                {p.title}
              </h3>
              <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-fg-dim md:text-lg">
                {p.description}
              </p>

              <div className="mt-10 flex flex-wrap gap-6">
                {p.demo && (
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 border-b border-accent pb-1 text-sm font-medium uppercase tracking-[0.15em] text-fg transition-colors hover:text-accent"
                  >
                    Live site
                    <ArrowUpRight
                      weight="regular"
                      className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                )}
                {p.source && (
                  <a
                    href={p.source}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-3 border-b border-rule pb-1 text-sm font-medium uppercase tracking-[0.15em] text-fg-dim transition-colors hover:text-fg hover:border-fg"
                  >
                    Source
                    <GithubLogo
                      weight="regular"
                      className="h-4 w-4"
                    />
                  </a>
                )}
              </div>
            </div>

            <div className="md:col-span-4 md:col-start-9 flex flex-col justify-start pt-2 md:pt-4">
              <div className="mono text-[10px] uppercase tracking-[0.22em] text-fg-dim">
                Stack
              </div>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                {p.tech.map((t) => (
                  <li
                    key={t}
                    className="mono text-sm uppercase tracking-[0.08em] text-fg"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
