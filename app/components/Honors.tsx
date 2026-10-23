import { Certificate, Medal, Ranking, Student, Trophy, Translate } from "@phosphor-icons/react/dist/ssr";
import { profile } from "../../data/profile";
import { recordStats } from "../../data/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const statIcons = [Ranking, Student, Trophy, Translate];
const honorIcons = [Medal, Certificate, Trophy];

const toneClass = {
  brand: "bg-brand text-white",
  lime: "bg-lime text-on-lime",
  card: "border border-rule bg-card text-ink shadow-card",
} as const;

export function Honors() {
  return (
    <section id="honors" aria-labelledby="honors-title" className="bg-surface py-24 md:py-32">
      <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8">
        <SectionHeading
          id="honors-title"
          eyebrow="Honors"
          lines={["On the", <span key="hl" className="highlight">record.</span>]}
          aside="Scholarships and grants from Feng Chia University and Taiwan’s Overseas Community Affairs Council."
        />

        <Reveal className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {recordStats.map((s, i) => {
            const Icon = statIcons[i];
            return (
              <div key={s.label} className={`flex min-h-[11rem] flex-col justify-between rounded-3xl p-5 sm:p-6 ${toneClass[s.tone]}`}>
                <Icon aria-hidden className="size-7" weight="bold" />
                <div>
                  <p className="flex flex-wrap items-baseline gap-x-2">
                    <span className="display text-[clamp(2.125rem,1.4rem+2.6vw,4rem)] tabular-nums">{s.value}</span>
                    <span className="label-mono opacity-80">{s.unit}</span>
                  </p>
                  <p className="label-mono mt-2 opacity-80">{s.label}</p>
                </div>
              </div>
            );
          })}
        </Reveal>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {profile.honors.map((h, i) => {
            const Icon = honorIcons[i % honorIcons.length];
            return (
              <Reveal key={h.title} delay={i * 0.06}>
                <article className="flex h-full flex-col rounded-3xl border border-rule bg-card p-7 shadow-card">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                      <Icon aria-hidden className="size-5" weight="bold" />
                    </span>
                    <span className="label-mono text-muted">{h.period}</span>
                  </div>
                  <h3 className="display mt-6 text-2xl leading-[1]">{h.title}</h3>
                  <p className="mt-3 font-medium text-ink-2">{h.org}</p>
                  {"detail" in h && h.detail && <p className="mt-2 leading-relaxed text-muted">{h.detail}</p>}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
