export type Project = {
  index: string;
  title: string;
  description: string;
  tech: string[];
  year: string;
  demo?: string;
  source?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "WasteWise",
    description:
      "An AI-powered restaurant purchasing assistant that forecasts demand up to 14 days ahead, optimizes ingredient sourcing, and benchmarks supplier prices against US retail data. Features weather- and holiday-aware forecasting, natural-language purchase order adjustments, and forecast backtesting powered by XGBoost and specialized LLM agents.",
    tech: ["Next.js", "TypeScript", "FastAPI", "Python", "XGBoost", "vLLM"],
    year: "2026",
    demo: "https://wastewise-theta.vercel.app",
    source: "https://github.com/lostpay/wastewise",
  },
  {
    index: "02",
    title: "Aegis",
    description:
      "A full-stack media authentication platform that embeds invisible watermarks into images and videos to detect tampering. Uses an LWT + DCT + SVD + QIM pipeline with BCH error correction to identify edits such as face swaps, inpainting, splicing, and frame drops with localized verification results.",
    tech: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "OpenCV",
      "Supabase",
    ],
    year: "2025",
    demo: "https://watermark-project-website.vercel.app",
    source: "https://github.com/harichandrawjy/WatermarkProjectWebsite",
  },
  {
    index: "03",
    title: "Finance-Buddy",
    description:
      "An AI-powered Android personal finance app that tracks income, expenses, budgets, and savings goals. Features an AI Finance Assistant that answers questions using the user's own financial data, budget alerts, and location-based food recommendations based on remaining spending.",
    tech: [
      "Java",
      "Kotlin",
      "Android",
      "Firebase",
      "Firestore",
      "OpenAI",
      "Google Maps",
    ],
    year: "2025",
    source: "https://github.com/harichandrawjy/Finance-Buddy",
  },
];
