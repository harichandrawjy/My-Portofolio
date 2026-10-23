import { ArrowUpRight, DownloadSimple, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { profile } from "../../data/profile";
import { CopyEmailButton } from "./CopyEmailButton";
import { LiveClock } from "./LiveClock";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 md:py-28">
      <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-brand px-6 py-20 text-center text-white sm:px-10 md:py-28">
            <div aria-hidden className="absolute -left-20 -top-20 -z-10 size-72 rounded-full border border-white/15" />
            <div aria-hidden className="absolute -bottom-24 -right-16 -z-10 hidden size-80 rounded-full bg-lime/90 lg:block" />
            <div aria-hidden className="absolute -bottom-36 -right-28 -z-10 size-[26rem] rounded-full border border-white/20" />

            <p className="label-mono inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full bg-lime px-4 py-2 text-on-lime">
              Open to internships
              <LiveClock />
            </p>

            <h2 id="contact-title" className="display mx-auto mt-8 max-w-[14ch] text-[clamp(2.25rem,0.8rem+6.4vw,6.75rem)]">
              Let’s build something that <span className="text-lime">adds up.</span>
            </h2>

            <p className="mx-auto mt-8 max-w-[44ch] text-lg leading-relaxed text-white/90">
              {profile.availability} Email is the fastest way to reach me.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-lime px-6 text-[0.9375rem] font-semibold text-on-lime transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-brand"
              >
                Email me
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
              <CopyEmailButton email={profile.email} />
            </div>
            <p className="mt-6 font-mono text-sm text-white/80">{profile.email}</p>

            <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3 border-t border-white/20 pt-8">
              {[
                { label: "GitHub", href: profile.socials.github.href, Icon: GithubLogo },
                { label: "LinkedIn", href: profile.socials.linkedin.href, Icon: LinkedinLogo },
                { label: "Resume (PDF)", href: profile.resume, Icon: DownloadSimple },
              ].map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="label-mono inline-flex min-h-6 items-center gap-2 text-white/90 transition-colors hover:text-lime"
                  >
                    <Icon aria-hidden className="size-4" />
                    {label}
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
