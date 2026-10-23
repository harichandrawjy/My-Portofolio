import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { profile } from "../../data/profile";
import { MobileMenu } from "./MobileMenu";
import { SectionNav } from "./SectionNav";
import { ThemeToggle } from "./ThemeToggle";

export function Logo() {
  return (
    <Link href="/#top" className="group flex items-center gap-3">
      <span aria-hidden className="display flex size-10 items-center justify-center rounded-full bg-brand text-lg text-white transition-colors group-hover:bg-lime group-hover:text-on-lime">H</span>
      <span className="leading-none">
        <span className="display block text-[1.0625rem]">Hari</span>
        <span className="label-mono mt-1 block text-[0.5625rem] text-accent">Portfolio</span>
      </span>
    </Link>
  );
}

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg">
      <div className="mx-auto flex h-20 w-full max-w-[84rem] items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />
        <SectionNav current={current} />
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/#contact"
            className="label-mono hidden h-10 items-center gap-2 rounded-full border-[1.5px] border-ink px-5 text-ink transition-colors hover:border-lime hover:bg-lime hover:text-on-lime sm:inline-flex"
          >
            Contact me
            <ArrowUpRight aria-hidden className="size-3.5" />
          </Link>
          <MobileMenu email={profile.email} resume={profile.resume} />
        </div>
      </div>
    </header>
  );
}
