import {
  ArrowUp,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  MapPin,
} from "@phosphor-icons/react/dist/ssr";
import { profile } from "../../data/profile";
import { focusAreas, sections } from "../../data/site";
import { Logo } from "./SiteHeader";

const socials = [
  { ...profile.socials.github, Icon: GithubLogo },
  { ...profile.socials.linkedin, Icon: LinkedinLogo },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto grid w-full max-w-[84rem] gap-10 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo />
          <p className="mt-5 max-w-[30ch] leading-relaxed text-muted">
            Final-year CS student building full-stack software around a numerical core.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-2">
          <p className="label-mono text-muted">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`/#${s.id}`} className="text-ink-2 transition-colors hover:text-accent">
                  {s.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer" className="text-ink-2 transition-colors hover:text-accent">
                Resume (PDF)
              </a>
            </li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="label-mono text-muted">Focus</p>
          <ul className="mt-4 space-y-2.5 text-ink-2">
            {focusAreas.map((f) => (
              <li key={f.title}>{f.title}</li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="label-mono text-muted">Contact</p>
          <ul className="mt-4 space-y-2.5 text-ink-2">
            <li>
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-accent [overflow-wrap:anywhere]">
                <EnvelopeSimple aria-hidden className="size-4 shrink-0 text-accent" />
                {profile.email}
              </a>
            </li>
            <li className="inline-flex items-center gap-2">
              <MapPin aria-hidden className="size-4 shrink-0 text-accent" />
              {profile.location}
            </li>
          </ul>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  className="flex size-10 items-center justify-center rounded-full border border-rule-strong text-ink transition-colors hover:border-lime hover:bg-lime hover:text-on-lime"
                >
                  <Icon aria-hidden className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-rule">
        <div className="mx-auto flex w-full max-w-[84rem] flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8">
          <p className="label-mono text-muted">© {new Date().getFullYear()} {profile.name}</p>
          <a href="#top" className="label-mono inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent">
            Back to top
            <ArrowUp aria-hidden className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
