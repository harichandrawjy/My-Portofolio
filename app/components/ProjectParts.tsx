import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import { projects, type Project } from "../../data/projects";

/** Renders `**text**` spans as highlighted key results. */
export function Rich({ text }: { text: string }) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") ? (
      <mark
        key={i}
        className="rounded-[3px] bg-lime px-[3px] py-px font-medium text-on-lime [box-decoration-break:clone]"
      >
        {part.slice(2, -2)}
      </mark>
    ) : (
      part
    ),
  );
}

/** The project's position in the list as a "P/01" code, shared by the cards and the detail pages. */
export const projectCode = (slug: string) =>
  `P/${String(projects.findIndex((p) => p.slug === slug) + 1).padStart(2, "0")}`;

/** Plain text for metadata: drops the `**` highlight markers. */
export const plain = (text: string) => text.replace(/\*\*/g, "");

export function ProjectHighlights({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 space-y-3 text-[0.9375rem] leading-relaxed text-ink-2">
      {items.map((item) => (
        <li key={item} className="relative pl-6">
          <span aria-hidden className="absolute left-0 top-[0.55em] size-2 rounded-[2px] bg-accent" />
          <Rich text={item} />
        </li>
      ))}
    </ul>
  );
}

export function ProjectFooter({ project }: { project: Project }) {
  return (
    <div className="mt-8 space-y-6">
      <ul aria-label="Built with" className="flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <li key={s} className="label-mono rounded-full border border-rule-strong px-3 py-1.5 text-ink-2">
            {s}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[0.9375rem] font-semibold text-bg transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand hover:text-white"
          >
            Live app<span className="sr-only"> for {project.title} (opens in a new tab)</span>
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        )}
        <a
          href={project.source}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-full border-[1.5px] border-ink px-5 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-lime hover:bg-lime hover:text-on-lime"
        >
          <GithubLogo aria-hidden className="size-4" />
          Source<span className="sr-only"> code for {project.title} (opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
