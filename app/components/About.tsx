import Image from "next/image";
import {
  Browser,
  ChartLineUp,
  Function as FunctionIcon,
  ImageSquare,
  StackSimple,
  Translate,
} from "@phosphor-icons/react/dist/ssr";
import { profile } from "../../data/profile";
import { aboutPoints, focusAreas } from "../../data/site";
import avatar from "../../public/about/hari-avatar.webp";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const pointIcons = { function: FunctionIcon, stack: StackSimple, translate: Translate };
const focusIcons = { chart: ChartLineUp, browser: Browser, image: ImageSquare };

function IdCard() {
  const rows = [
    ["Program", profile.education.degree.replace("B.S. in ", "B.S. ")],
    ["School", `${profile.education.school}, Taichung`],
    ["Graduating", "June 2027"],
    ["Coursework", "Algorithms, databases, systems programming, computer architecture, microprocessors"],
  ];
  return (
    <div className="relative flex h-full min-h-[30rem] flex-col overflow-hidden rounded-3xl bg-brand p-7 text-white sm:p-8">
      <div aria-hidden className="absolute -right-24 -top-28 size-48 rounded-full bg-lime sm:-right-16 sm:-top-16 sm:size-56" />
      <div aria-hidden className="absolute -right-32 -top-36 size-72 rounded-full border border-white/20 sm:-right-24 sm:-top-24 sm:size-80" />

      <p className="label-mono relative text-white/80">Student profile</p>
      <div className="relative mt-6 flex items-center gap-4">
        <Image src={avatar} alt="" width={72} height={72} className="size-[4.5rem] rounded-full ring-4 ring-white/25" />
        <div>
          <p className="display text-2xl">Hari Chandra</p>
          <p className="display text-2xl text-lime">Wijaya</p>
        </div>
      </div>

      <dl className="relative mt-8 space-y-4">
        {rows.map(([k, v]) => (
          <div key={k} className="border-t border-white/20 pt-3">
            <dt className="label-mono text-white/80">{k}</dt>
            <dd className="mt-1 font-medium">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="relative mt-auto flex flex-wrap gap-2 pt-8">
        {["Indonesian", "English", "Mandarin"].map((lang) => (
          <span key={lang} className="label-mono rounded-full border border-white/35 px-3 py-1.5">
            {lang}
          </span>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8">
        <SectionHeading
          id="about-title"
          eyebrow="About me"
          lines={["Derive it.", "Build it.", <span key="hl" className="highlight">Ship it.</span>]}
          aside="I like problems where the math has to be right and the product still has to ship."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <IdCard />
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-7">
            <div className="h-full rounded-3xl border border-rule bg-card shadow-card">
              <div className="border-b border-rule p-7 sm:p-8">
                <p className="label-mono text-accent">Description</p>
                <h3 className="display mt-3 text-4xl">Who I am</h3>
              </div>
              <ul className="divide-y divide-rule">
                {aboutPoints.map((point) => {
                  const Icon = pointIcons[point.icon];
                  return (
                    <li key={point.title} className="flex gap-5 p-7 sm:p-8">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-lime text-on-lime">
                        <Icon aria-hidden className="size-5" weight="bold" />
                      </span>
                      <div>
                        <p className="display text-lg">{point.title}</p>
                        <p className="mt-2 leading-relaxed text-ink-2">{point.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ul className="mt-5 grid overflow-hidden rounded-3xl border border-rule bg-card shadow-card sm:grid-cols-3 sm:divide-x divide-y sm:divide-y-0 divide-rule">
            {focusAreas.map((area) => {
              const Icon = focusIcons[area.icon];
              return (
                <li key={area.title} className="flex items-center gap-4 p-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-rule-strong text-accent">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <div>
                    <p className="display text-base">{area.title}</p>
                    <p className="label-mono mt-1 text-muted">{area.note}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
