import Image from "next/image";
import { ArrowDown, DownloadSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { profile } from "../../data/profile";
import { recordStats } from "../../data/site";
import portrait from "../../public/about/hari-cutout.webp";
import { HeroParallax } from "./HeroParallax";

const delay = (s: number) => ({ "--enter-delay": `${s}s` }) as React.CSSProperties;

/** Parallax depth in px per unit of pointer offset; negative layers drift against the pointer. */
const depth = (x: number, y: number) => ({ "--depth-x": `${x}px`, "--depth-y": `${y}px` }) as React.CSSProperties;

/** Rank, GPA and scholarship count; TOEIC stays in Honors. */
const academicRecord = recordStats.slice(0, 3);

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <HeroParallax />
      <div
        aria-hidden
        className="parallax display pointer-events-none absolute inset-x-0 top-6 -z-10 select-none text-center text-[clamp(6rem,24vw,24rem)] leading-[0.8] text-watermark"
        style={depth(-60, -30)}
      >
        <span className="block">Hari</span>
        <span className="block">Chandra</span>
      </div>

      <div className="mx-auto grid min-h-[min(calc(100svh-5rem),60rem)] w-full max-w-[84rem] gap-10 px-5 pt-8 sm:px-8 md:grid-cols-[minmax(0,1fr)_auto] md:gap-x-8 md:gap-y-8 md:pt-12 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:gap-6 xl:pt-0">
        {/* Name */}
        <div className="order-1 self-end md:col-start-1 md:row-start-1 xl:col-start-3 xl:row-span-2 xl:self-center xl:text-right">
          <p className="label-mono enter text-muted" style={delay(0.05)}>
            I’m
          </p>
          <h1
            id="hero-title"
            className="display mt-3 text-[clamp(3rem,13vw,4.5rem)] md:text-[clamp(3rem,7.4vw,4.5rem)] lg:text-[clamp(4rem,6.2vw,5rem)] xl:text-[clamp(2.75rem,5vw,4.5rem)]"
          >
            <span className="enter block text-outline" style={delay(0.1)}>
              Hari
            </span>
            <span className="enter block text-accent" style={delay(0.2)}>
              Chandra
            </span>
            <span className="enter block" style={delay(0.3)}>
              <span className="highlight">Wijaya.</span>
            </span>
          </h1>
        </div>

        {/* Portrait in a cobalt arch */}
        <div className="enter relative order-2 mx-auto w-[min(78vw,22rem)] self-end md:col-start-2 md:row-span-2 md:row-start-1 md:w-[clamp(17rem,34vw,24rem)] xl:col-start-2 xl:w-[clamp(20rem,25vw,25rem)]" style={delay(0.25)}>
          <div aria-hidden className="parallax absolute inset-x-[4%] bottom-0 top-[20%] rounded-t-full bg-brand" style={depth(40, 20)} />
          <div aria-hidden className="parallax absolute -inset-x-[3%] bottom-0 top-[14%] rounded-t-full border border-rule-strong" style={depth(30, 14)} />
          <div aria-hidden className="parallax absolute -right-[7%] top-[36%] aspect-square w-[17%] rounded-full bg-lime" style={depth(90, 45)} />
          <div aria-hidden className="parallax absolute -left-[5%] top-[58%] aspect-square w-[9%] rotate-12 rounded-md border-[1.5px] border-ink" style={depth(-70, -35)} />
          <Image
            src={portrait}
            alt={`Portrait of ${profile.name}`}
            priority
            sizes="(min-width: 1280px) 26rem, (min-width: 768px) 34vw, 78vw"
            className="parallax relative block h-auto w-full"
            style={depth(40, 20)}
          />
        </div>

        {/* Tagline card and actions */}
        <div className="order-3 self-start pb-12 md:col-start-1 md:row-start-2 xl:col-start-1 xl:row-span-2 xl:row-start-1 xl:self-center xl:pb-0">
          <div
            className="enter-slide max-w-[23rem] -rotate-2 rounded-2xl border-[1.5px] border-ink bg-card p-6 shadow-card"
            style={delay(0.4)}
          >
            <p className="display text-[1.625rem] leading-[1]">
              Math in the core.
              <br />
              Product on top.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
              Final-year CS student at Feng Chia University in Taichung. I build full-stack software around a numerical
              core, from a portfolio optimizer to an invisible-watermarking pipeline.
            </p>
            <dl className="mt-5 grid grid-cols-[repeat(3,auto)] justify-between gap-3 border-t border-rule pt-4">
              {academicRecord.map((s) => (
                // Value above label so the numbers line up however the labels wrap.
                <div key={s.label} className="flex flex-col-reverse justify-end">
                  <dt className="label-mono mt-1 text-[0.625rem] leading-snug text-muted">{s.label}</dt>
                  <dd className="flex items-baseline gap-x-1 whitespace-nowrap">
                    <span className="display text-[1.375rem] tabular-nums">{s.value}</span>
                    <span className="label-mono text-[0.625rem] text-muted">{s.unit}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="enter mt-8 flex flex-wrap gap-2" style={delay(0.6)}>
            <a
              href="#work"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-ink px-5 text-[0.9375rem] font-semibold text-bg transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand hover:text-white md:h-11 md:px-4 md:text-sm xl:h-12 xl:px-5 xl:text-[0.9375rem]"
            >
              See my work
              <ArrowDown aria-hidden className="size-4" />
            </a>
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border-[1.5px] border-ink px-5 text-[0.9375rem] font-semibold text-ink transition-colors hover:border-lime hover:bg-lime hover:text-on-lime md:h-11 md:px-4 md:text-sm xl:h-12 xl:px-5 xl:text-[0.9375rem]"
            >
              Resume
              <DownloadSimple aria-hidden className="size-4" />
            </a>
            {[
              { ...profile.socials.github, Icon: GithubLogo },
              { ...profile.socials.linkedin, Icon: LinkedinLogo },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="inline-flex size-12 items-center justify-center rounded-full border-[1.5px] border-ink text-ink transition-colors hover:border-lime hover:bg-lime hover:text-on-lime md:size-11"
              >
                <Icon aria-hidden className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
