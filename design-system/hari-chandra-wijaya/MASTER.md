# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/hari-chandra-wijaya/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, follow the rules below.

---

**Project:** Hari Chandra Wijaya, personal portfolio
**Source of truth for tokens and utilities:** `app/globals.css`
**Content:** `data/profile.ts`, `data/projects.ts`, `data/site.ts` (facts come from the resume; nothing invented)

---

## Direction

Bold, poster-like one-pager with a strong personal presence: a cut-out portrait in a cobalt arch, heavy uppercase headlines with lime highlighter bands, card-based sections, and interactive figures that explain the projects' math. Structure inspired by a friend's portfolio; palette, copy and figures are Hari's own.

Section rhythm: Hero (base) > About (base) > Work (surface) > Skills (base) > Honors (surface) > Contact card (cobalt card on base) > Footer.

## Color

| Role | Light | Dark | Tailwind |
|------|-------|------|----------|
| Background | `#ffffff` | `#0b0d11` | `bg-bg` |
| Surface (alternate sections, figure panels) | `#f4f5f7` | `#12151b` | `bg-surface` |
| Card | `#ffffff` | `#14171e` | `bg-card` |
| Ink | `#0e1116` | `#eef0f3` | `text-ink` |
| Ink 2 (body) | `#3b424d` | `#c4c9d1` | `text-ink-2` |
| Muted | `#5f6774` | `#8f97a4` | `text-muted` |
| Rule / rule strong | `#e2e5e9` / `#c8cdd5` | `#23272f` / `#363b46` | `border-rule` / `border-rule-strong` |
| Accent (links, text on base) | `#2443d6` | `#8fa1ff` | `text-accent` |
| Brand (cobalt blocks, both themes) | `#2443d6` | `#2443d6` | `bg-brand` |
| Lime (highlights, primary buttons on cobalt) | `#d4ff3a` | `#d4ff3a` | `bg-lime` + `text-on-lime` |
| Flag (tamper figure only) | `#d42f2f` | `#ff6b6b` | `text-flag` |

- Text on lime is always `text-on-lime` (near-black), in both themes.
- White text on cobalt: body at `white/85`–`/90`, small labels at `white/80` minimum (contrast).
- Never put white text over lime shapes; decorative lime circles are hidden or moved on small screens where they would sit under text.
- Theme: light by default, dark from the OS setting, overridable with the header toggle (`data-theme` + `localStorage`).

## Typography

- **Archivo** (variable `wdth` + `wght`) for everything; **JetBrains Mono** for labels and code.
- `display` utility: weight 850, wdth 112, uppercase, tracking -0.035em, line-height 0.9. Section headlines `clamp(2.375rem, 1rem + 5.8vw, 6rem)`; keep minimums small enough that the longest word fits 335px.
- `highlight`: lime band behind part of a headline, wraps per line, sweeps in on reveal.
- `text-outline`: hollow letters; set `[--stroke:var(--accent)]` to change the stroke color.
- `label-mono`: 11px uppercase mono, tracking 0.14em, for eyebrows, meta, nav and tags.
- Body: 15–18px, line-height 1.6. Numbers use `tabular-nums`; units stay `normal-case`.

## Layout

- Container `max-w-[84rem]`, gutters `px-5` / `sm:px-8`. Sections `py-24 md:py-32`.
- Header 80px, sticky, solid `bg-bg`; anchors offset by `scroll-padding-top: 5rem`.
- Hero: one column on phones, two columns (name + card | portrait) from `md`, three columns (card | portrait | name) from `xl`. Use `minmax(0,1fr)` tracks so long words never squeeze the other column.
- Radii: pills (`rounded-full`) for buttons, tags and nav; `rounded-2xl`–`rounded-[2rem]` for cards; `rounded-3xl`+ for feature blocks.

## Components

- **Buttons:** primary `bg-ink text-bg` pill (on cobalt: `bg-lime text-on-lime`); secondary 1.5px ink outline pill. Icon buttons are 44–48px circles with `aria-label`.
- **Section heading:** mono eyebrow + display headline (+ optional aside with a lime left rule). Use `SectionHeading`.
- **Cards:** `rounded-[2rem] border border-rule bg-card shadow-card`.
- **Figures:** keep the interactive frontier and tamper figures; captions state what is illustrative.
- **Icons:** Phosphor; tool logos from Simple Icons as CSS masks (theme-colored).

## Motion

- Scroll reveal via `Reveal` (CSS-only hidden state behind `.js` and `prefers-reduced-motion: no-preference`).
- Hero entrance: `.enter` / `.enter-tilt` with `--enter-delay`.
- Portfolio cloud animates when scrolled into view; everything static under reduced motion.

## Content rules

- Professional channels only: email, GitHub, LinkedIn, resume. No personal social accounts.
- Each fact appears once in its natural home (academic stats live in Honors).
- No fabricated metrics, testimonials or logos.
