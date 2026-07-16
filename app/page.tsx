import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { DotField } from "./components/DotField";
import { HeroTitle } from "./components/HeroTitle";
import { LiveClock } from "./components/LiveClock";
import { ProjectStack } from "./components/ProjectStack";
import { MagneticEmail } from "./components/MagneticEmail";
import { StackGrid } from "./components/StackGrid";
import { Reveal } from "./components/Reveal";
import { BlueprintGrid } from "./components/BlueprintGrid";
import { DataAnnotation } from "./components/DataAnnotation";
import { HalftonePortrait } from "./components/HalftonePortrait";
import { WireframeArc } from "./components/WireframeArc";
import { LuminousDiscs } from "./components/LuminousDiscs";
import { ParticleSphere } from "./components/ParticleSphere";

export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Index />
      <About />
      <SelectedWork />
      <StackShowcase />
      <Contact />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-rule/60 bg-bg/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <a href="#top" className="mono text-sm font-medium uppercase tracking-[0.15em]">
          HCW<span className="text-accent">.</span>
        </a>
        <nav className="mono hidden gap-8 text-xs uppercase tracking-[0.2em] text-fg-dim md:flex">
          <a href="#about" className="transition-colors hover:text-fg">About</a>
          <a href="#work" className="transition-colors hover:text-fg">Work</a>
          <a href="#stack" className="transition-colors hover:text-fg">Stack</a>
          <a href="#contact" className="transition-colors hover:text-fg">Contact</a>
        </nav>
        <a
          href={`mailto:${profile.email}`}
          className="mono text-[10px] uppercase tracking-[0.2em] text-fg-dim transition-colors hover:text-fg md:text-xs"
        >
          {profile.email}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden pt-24 text-fg-dim"
    >
      <div className="pointer-events-none absolute inset-0 -z-20">
        <DotField />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 text-fg-dim">
        <BlueprintGrid cols={14} rows={9} opacity={0.16} />
      </div>

      <div
        className="pointer-events-none absolute -right-[10%] top-1/2 -z-10 hidden aspect-square w-[70vh] max-w-[720px] -translate-y-1/2 opacity-70 md:block"
        style={{
          maskImage:
            "radial-gradient(circle at 45% 50%, black 40%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(circle at 45% 50%, black 40%, transparent 78%)",
        }}
      >
        <ParticleSphere tone="mono" />
      </div>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-bg via-transparent to-transparent md:from-bg md:via-bg/60 md:to-transparent" />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
        <div className="mono mb-10 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-fg-dim">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          <span>Available for internships · 2026</span>
        </div>

        <HeroTitle />

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <Reveal delay={0.5} className="md:col-span-6">
            <p className="max-w-[46ch] text-lg leading-relaxed text-fg md:text-xl">
              {profile.tagline}
            </p>
          </Reveal>

          <Reveal delay={0.65} className="mono md:col-span-4 md:col-start-9 grid grid-cols-2 gap-x-6 gap-y-5 self-end text-xs uppercase tracking-[0.18em] text-fg-dim">
            <div>
              <div className="text-fg-dim/60">Role</div>
              <div className="mt-1 text-fg">CS Student</div>
            </div>
            <div>
              <div className="text-fg-dim/60">Based</div>
              <div className="mt-1 text-fg">Taichung, TW</div>
            </div>
            <div>
              <div className="text-fg-dim/60">Focus</div>
              <div className="mt-1 text-fg">Web · AI</div>
            </div>
            <div>
              <div className="text-fg-dim/60">Year</div>
              <div className="mt-1 text-fg">Class of 27</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <section className="border-y border-rule bg-bg-elev/40">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6 px-6 py-6 md:px-10">
        <div className="mono flex items-center gap-6 text-[10px] uppercase tracking-[0.22em] text-fg-dim md:text-xs">
          <span>Feng Chia University</span>
          <span className="hidden h-1 w-1 rounded-full bg-fg-dim/50 md:inline-block" />
          <span className="hidden md:inline">GPA 4.0 / 4.3</span>
          <span className="hidden h-1 w-1 rounded-full bg-fg-dim/50 md:inline-block" />
          <span className="hidden md:inline">Scholarship x3</span>
        </div>
        <div className="mono flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-fg md:text-xs">
          <span className="text-fg-dim">Taipei</span>
          <LiveClock />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative py-32 md:py-48">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="md:col-span-4 md:col-start-1">
          <Reveal>
            <div className="mono text-[10px] uppercase tracking-[0.25em] text-accent">
              About
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mono mt-6 text-[clamp(2.25rem,5vw,4rem)] font-medium uppercase leading-[0.95] tracking-[-0.02em]">
              Builder.
              <br />
              <span className="text-fg-dim">Student.</span>
              <br />
              Shipper.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative mt-12 aspect-square w-full max-w-[320px] overflow-hidden border border-rule bg-black">
              <HalftonePortrait />
              <div className="mono absolute bottom-3 left-3 text-[9px] uppercase tracking-[0.22em] text-fg-dim">
                Fig. 01 / silhouette
              </div>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:col-start-6 space-y-6">
          {profile.bio.map((paragraph, i) => (
            <Reveal key={i} delay={0.1 + i * 0.08}>
              <p className="max-w-[62ch] text-lg leading-relaxed text-fg-dim md:text-xl md:leading-[1.55]">
                {paragraph}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="mt-14 border-t border-rule pt-8">
              <div className="mono mb-4 text-[10px] uppercase tracking-[0.25em] text-fg-dim">
                Recognition
              </div>
              {profile.awards.map((a) => (
                <div key={a.title} className="grid grid-cols-1 gap-2 md:grid-cols-12">
                  <div className="mono text-sm text-fg md:col-span-4">
                    {a.title}
                  </div>
                  <div className="text-sm text-fg-dim md:col-span-8">
                    <span className="text-fg">{a.issuer}</span>. {a.detail}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SelectedWork() {
  return (
    <section id="work" className="relative isolate border-t border-rule bg-bg">
      <div className="pointer-events-none sticky top-0 h-[100dvh] w-full">
        <div className="absolute inset-0">
          <WireframeArc />
        </div>
      </div>

      <div className="relative z-10 -mt-[100dvh]">
        <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-24 md:px-10 md:pt-32">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
            <div className="relative md:col-span-7">
              <Reveal>
                <div className="mono text-[10px] uppercase tracking-[0.25em] text-accent">
                  Selected Work / 002
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="mono mt-6 max-w-[16ch] text-[clamp(2.5rem,6vw,5rem)] font-medium uppercase leading-[0.95] tracking-[-0.02em]">
                  Three things
                  <br />I built recently.
                </h2>
              </Reveal>
            </div>

            <div className="md:col-span-4 md:col-start-9 flex items-end">
              <DataAnnotation
                title="commission KIND"
                rows={[
                  { index: "1", label: "HACKATHON", unit: "AMD 2026" },
                  { index: "2", label: "TOOL", unit: "solo build" },
                  { index: "3", label: "MOBILE", unit: "android" },
                ]}
              />
            </div>
          </div>
        </div>

        <ProjectStack projects={projects} />
      </div>
    </section>
  );
}

function StackShowcase() {
  return (
    <section id="stack" className="relative border-t border-rule py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <StackGrid />
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate flex min-h-[90vh] flex-col justify-center overflow-hidden py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <LuminousDiscs />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-bg/30" />

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <Reveal>
          <div className="mono text-[10px] uppercase tracking-[0.25em] text-accent">
            Contact / 005
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mono mt-8 max-w-[14ch] text-[clamp(3rem,9vw,7.5rem)] font-medium uppercase leading-[0.9] tracking-[-0.02em]">
            Let&apos;s build
            <br />
            something<span className="text-accent">.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-10 max-w-[46ch] text-lg leading-relaxed text-fg-dim md:text-xl">
            Internships, freelance builds, or interesting side projects. If it&apos;s a real thing that ships, I want to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-14">
            <MagneticEmail email={profile.email} />
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mono mt-20 grid grid-cols-1 gap-8 border-t border-rule pt-10 md:grid-cols-3">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-fg-dim">
                GitHub
              </div>
              <div className="mt-2 text-base text-fg transition-colors group-hover:text-accent">
                github.com/harichandrawjy
              </div>
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-fg-dim">
                LinkedIn
              </div>
              <div className="mt-2 text-base text-fg transition-colors group-hover:text-accent">
                Hari Chandra Wijaya
              </div>
            </a>
            <a
              href={profile.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-fg-dim">
                Instagram
              </div>
              <div className="mt-2 text-base text-fg transition-colors group-hover:text-accent">
                @harichandrawjy
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mono mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-8 text-[10px] uppercase tracking-[0.22em] text-fg-dim md:px-10">
        <span>© {new Date().getFullYear()} Hari Chandra Wijaya</span>
        <span className="text-fg">Built with Next.js · Motion · GSAP</span>
      </div>
    </footer>
  );
}
