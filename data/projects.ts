export type ProjectVisual = "frontier" | "tamper" | "screenshot" | "data-model";

export type Project = {
  slug: string;
  title: string;
  /** Short label for the card chip. */
  category: string;
  period: string;
  context: string;
  /** One verified key result for the card; `**text**` is highlighted. */
  result: string;
  summary: string;
  highlights: string[];
  stack: string[];
  live?: string;
  source: string;
  visual: ProjectVisual;
};

export const projects: Project[] = [
  {
    slug: "arus",
    title: "Arus",
    category: "Full stack",
    period: "Jul 2026 – present",
    context: "Two-person project, I wrote the full codebase",
    result: "**200+ backend tests** behind a from-scratch Markowitz optimizer",
    summary:
      "A portfolio tracker for the roughly 950 stocks on the Indonesia Stock Exchange, with time-weighted returns, risk analytics and benchmarking against the IHSG index.",
    highlights: [
      "Markowitz mean-variance optimization **written from scratch**: projected gradient descent with an exact simplex projection, no heavyweight solver. The frontier math was co-designed with an actuarial-science collaborator.",
      "Minimum-variance, target-return and maximum-Sharpe portfolios all come from one parameterized frontier, with expected returns from CAPM or annualized log returns.",
      "Transactions are the single source of truth. Holdings and cash balances are derived in SQL and covered by **more than 200 backend tests**.",
      "Runs on a self-managed Linux VM with Docker Compose and Caddy for automatic TLS. Tickers backfill five years of history on first use, then sync nightly.",
    ],
    stack: ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "NumPy", "Docker"],
    live: "https://arus-idx.duckdns.org",
    source: "https://github.com/harichandrawjy/Portfolio-Dashboard",
    visual: "frontier",
  },
  {
    slug: "aegis",
    title: "Aegis",
    category: "Capstone",
    period: "Apr 2026 – present",
    context: "Senior capstone, team of four. I built the front end and ran QA",
    result: "Catches **29 of 30** content edits with **9 false alarms in 160**",
    summary:
      "A full-stack media authentication platform that hides invisible watermarks in images and video, then shows exactly where a file was changed.",
    highlights: [
      "Built the React and TypeScript front end: embed a watermark, verify a suspect file, and see the edited blocks marked on the image.",
      "Wrote the evaluation harness: 10 images through 19 operations, from JPEG re-saves, noise and resizing to splices, for **190 verifications**.",
      "Tuned detection like an inspection limit, trading missed edits against false alarms. The shipped setting **catches 29 of 30 content edits** with **9 false alarms in 160** harmless operations; a stricter one cuts false alarms to 3 but misses 6 edits.",
      "The team’s LWT, DCT, SVD and QIM pipeline with BCH(15,7) error correction keeps the mark invisible at **41.9 dB mean PSNR** on the test photographs.",
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "OpenCV", "NumPy"],
    live: "https://watermark-project-website.vercel.app",
    source: "https://github.com/harichandrawjy/WatermarkProjectBackend",
    visual: "tamper",
  },
  {
    slug: "wastewise",
    title: "WasteWise",
    category: "Hackathon",
    period: "Jul 2026",
    context: "AMD Developer Hackathon: ACT II, Unicorn Track",
    result: "**19 commits** over the hackathon’s **five days**",
    summary:
      "An AI purchasing assistant for restaurants, built in **five days** by a five-person team. I was one of two developers and built the Next.js frontend.",
    highlights: [
      "Setup wizard with CSV upload and a Google Maps location picker, a demand-forecast dashboard and a backtest replay chart.",
      "Replaced a deprecated USDA price source with a FRED retail benchmark, added currency conversion for non-USD prices and tuned the LLM demand-adjustment agent.",
    ],
    stack: ["Next.js", "TypeScript", "FastAPI", "Python"],
    live: "https://wastewise-theta.vercel.app",
    source: "https://github.com/lostpay/wastewise",
    visual: "screenshot",
  },
  {
    slug: "finance-buddy",
    title: "Finance-Buddy",
    category: "Android",
    period: "Spring 2026",
    context: "Native Android app",
    result: "Budget alerts fire at **80%** of a category limit",
    summary:
      "An Android finance app on a Firestore data model. A GPT-4o-mini assistant answers questions about the user’s own spending, and Google Places suggests food within the remaining budget.",
    highlights: [
      "Budgets that alert at **80% of a category limit**, savings goals, and hand-drawn donut and line charts that follow the system theme.",
      "Every document lives under the signed-in user’s ID, and Firestore rules keep each user inside their own data.",
    ],
    stack: ["Java", "Kotlin", "Android", "Firebase", "Firestore", "OpenAI", "Google Places"],
    source: "https://github.com/harichandrawjy/Finance-Buddy",
    visual: "data-model",
  },
];
