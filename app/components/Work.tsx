import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { projects, type Project } from "../../data/projects";
import { projectCode, Rich } from "./ProjectParts";
import { ProjectVisual } from "./ProjectVisual";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

/**
 * One clickable card per project. The title link stretches over the whole card, so the card
 * reads as a single link named after the project and the preview stays out of the tab order.
 */
function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      aria-labelledby={`${project.slug}-title`}
      className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-rule bg-card shadow-card transition-[translate,border-color,box-shadow] duration-300 ease-out hover:border-accent hover:shadow-[0_18px_44px_-18px_rgb(36_67_214/0.35)] motion-safe:hover:-translate-y-2 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent"
    >
      <div className="flex items-center justify-between gap-4 border-b border-rule px-5 py-3 transition-colors duration-300 group-hover:border-accent sm:px-6">
        <span className="label-mono rounded-full border border-rule-strong px-2.5 py-1 text-ink-2 transition-colors duration-300 group-hover:border-accent group-hover:text-accent">
          {project.category}
        </span>
        <span className="label-mono text-accent">{projectCode(project.slug)}</span>
      </div>

      <div aria-hidden className="relative aspect-video overflow-hidden border-b border-rule bg-surface transition-colors duration-300 group-hover:border-accent">
        <div className="size-full transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.035]">
          <ProjectVisual project={project} preview />
        </div>
        {/* A light sweep across the preview on hover. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-[140%] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-[translate,opacity] duration-700 ease-out motion-safe:group-hover:translate-x-[320%] motion-safe:group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="label-mono tabular-nums text-muted">{project.period}</p>
        <h3
          id={`${project.slug}-title`}
          className="display mt-3 text-[clamp(2.25rem,1.8rem+1.6vw,3rem)] transition-colors duration-300 group-hover:text-accent"
        >
          <Link
            href={`/work/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 font-medium text-ink-2">{project.context}</p>
        <p className="mt-4 border-l-2 border-lime pl-3 font-medium leading-snug text-ink">
          <span className="sr-only">Key result: </span>
          <Rich text={project.result} />
        </p>
        <p className="mt-4 leading-relaxed text-ink-2">
          <Rich text={project.summary} />
        </p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-7">
          <ul aria-label="Built with" className="flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((s) => (
              <li
                key={s}
                className="label-mono rounded-full border border-rule-strong px-3 py-1.5 text-ink-2 transition-colors duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-on-lime"
              >
                {s}
              </li>
            ))}
          </ul>
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink text-ink transition-colors duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-on-lime"
          >
            <ArrowRight className="size-4 transition-transform duration-300 ease-out motion-safe:group-hover:-rotate-45" />
          </span>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="bg-surface py-24 md:py-32">
      <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8">
        <SectionHeading
          id="work-title"
          eyebrow="Selected work"
          lines={["Selected", <span key="o" className="text-outline [--stroke:var(--accent)]">work.</span>]}
          aside="Four projects from 2026, all with source code. Open one for the full write-up, an interactive diagram and links."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Reveal delay={(i % 2) * 0.06} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
