import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

export default function NotFound() {
  return (
    <main id="main" className="relative isolate flex min-h-dvh items-center overflow-hidden">
      <p
        aria-hidden
        className="display pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 select-none text-center text-[clamp(10rem,40vw,34rem)] text-watermark"
      >
        404
      </p>
      <div className="mx-auto w-full max-w-[84rem] px-5 sm:px-8">
        <p className="label-mono text-accent">Error 404</p>
        <h1 className="display mt-4 text-[clamp(2.75rem,1.2rem+6vw,6rem)]">
          Page <span className="highlight">not found.</span>
        </h1>
        <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-ink-2">
          This address doesn’t point to anything on the site. Everything lives on the home page.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[0.9375rem] font-semibold text-bg transition-[color,background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-brand hover:text-white"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Back to the home page
        </Link>
      </div>
    </main>
  );
}
