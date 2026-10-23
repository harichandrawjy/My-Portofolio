import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { profile } from "../../../data/profile";
import { projects } from "../../../data/projects";
import { plain, ProjectFooter, ProjectHighlights, projectCode, Rich } from "../../components/ProjectParts";
import { ProjectVisual } from "../../components/ProjectVisual";
import { Reveal } from "../../components/Reveal";
import { SectionHeading } from "../../components/SectionHeading";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteHeader } from "../../components/SiteHeader";

type Props = { params: Promise<{ slug: string }> };

// Only the four projects exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  // openGraph is left to the root layout so shared links keep the site's preview image.
  return {
    title: `${project.title} · ${profile.name}`,
    description: plain(project.summary),
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <SiteHeader current="work" />
      <main id="main">
        <section id="top" aria-labelledby="project-title" className="relative isolate overflow-hidden">
          <p
            aria-hidden
            className="display pointer-events-none absolute -right-4 top-10 -z-10 select-none text-[clamp(6rem,20vw,20rem)] leading-[0.8] text-watermark"
          >
            {project.title}
          </p>
          <div className="mx-auto w-full max-w-[84rem] px-5 pb-16 pt-10 sm:px-8 md:pb-24 md:pt-14">
            <Link
              href="/#work"
              className="label-mono inline-flex min-h-6 items-center gap-2 text-ink-2 transition-colors hover:text-accent"
            >
              <ArrowLeft aria-hidden className="size-3.5" />
              All work
            </Link>

            <p className="label-mono enter mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              <span className="text-accent">{projectCode(project.slug)}</span>
              <span className="rounded-full border border-rule-strong px-2.5 py-1 text-ink-2">{project.category}</span>
              <span className="tabular-nums">{project.period}</span>
            </p>
            <h1
              id="project-title"
              className="display enter mt-5 text-[clamp(3.5rem,2rem+7vw,8rem)]"
              style={{ "--enter-delay": "0.08s" } as React.CSSProperties}
            >
              {project.title}
            </h1>
            <div className="enter grid gap-8 lg:grid-cols-12" style={{ "--enter-delay": "0.16s" } as React.CSSProperties}>
              <div className="lg:col-span-8">
                <p className="mt-4 text-lg font-medium text-ink">{project.context}</p>
                <p className="mt-5 max-w-[60ch] text-[1.1875rem] leading-relaxed text-ink-2">
                  <Rich text={project.summary} />
                </p>
                <ProjectFooter project={project} />
              </div>
            </div>
          </div>
        </section>

        <section aria-label={`${project.title} diagram`} className="bg-surface py-14 md:py-20">
          <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8">
            <Reveal>
              <div className="mx-auto max-w-5xl rounded-[2rem] border border-rule bg-card p-3 shadow-card sm:p-6 lg:p-8">
                <ProjectVisual project={project} />
              </div>
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="build-title" className="py-20 md:py-28">
          <div className="mx-auto grid w-full max-w-[84rem] gap-12 px-5 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                id="build-title"
                eyebrow="Details"
                lines={["Behind the", <span key="hl" className="highlight">build.</span>]}
              />
            </div>
            <Reveal delay={0.06} className="lg:col-span-7">
              <div className="rounded-3xl border border-rule bg-card p-7 shadow-card sm:p-9">
                <ProjectHighlights items={project.highlights} />
              </div>
            </Reveal>
          </div>
        </section>

        <nav aria-label="Next project" className="pb-24 md:pb-32">
          <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8">
            <Link
              href={`/work/${next.slug}`}
              className="group flex items-center justify-between gap-6 rounded-[2rem] bg-brand p-7 text-white transition-[translate] duration-300 ease-out motion-safe:hover:-translate-y-1 sm:p-10"
            >
              <span>
                <span className="label-mono block text-white/80">
                  Next project · {projectCode(next.slug)}
                </span>
                <span className="display mt-3 block text-[clamp(2.25rem,1.5rem+3vw,4rem)]">{next.title}</span>
              </span>
              <span
                aria-hidden
                className="flex size-14 shrink-0 items-center justify-center rounded-full bg-lime text-on-lime transition-transform duration-300 ease-out motion-safe:group-hover:-rotate-45"
              >
                <ArrowRight className="size-5" />
              </span>
            </Link>
          </div>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}
