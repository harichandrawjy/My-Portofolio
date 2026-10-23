export const sections = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "honors", label: "Honors" },
] as const;

export const aboutPoints = [
  {
    icon: "function",
    title: "Math first",
    body: "Most of what I build sits where software meets math. On Arus I co-designed the efficient-frontier math with an actuarial-science collaborator and wrote the optimizer from scratch.",
  },
  {
    icon: "stack",
    title: "End to end",
    body: "I like owning the whole path: the numerical core, the API, the interface and the Linux server it runs on.",
  },
  {
    icon: "translate",
    title: "Three working languages",
    body: "Indonesian is my first language. I work in Mandarin as a student assistant in the Information Engineering department, and I scored 990 / 990 on the TOEIC.",
  },
] as const;

export const focusAreas = [
  { icon: "chart", title: "Numerical computing", note: "Optimization, signal processing" },
  { icon: "browser", title: "Full-stack web", note: "React, Next.js, FastAPI" },
  { icon: "image", title: "Image & data processing", note: "OpenCV, NumPy, SQL" },
] as const;

export type ToolCategory = "languages" | "frameworks" | "infrastructure" | "coursework";

export const toolCategories: { id: ToolCategory; label: string; note: string }[] = [
  { id: "languages", label: "Languages", note: "What the logic is written in, from data pipelines to Android screens." },
  { id: "frameworks", label: "Frameworks & libraries", note: "The building blocks behind the interfaces, APIs and numerical work." },
  { id: "infrastructure", label: "Infrastructure", note: "Where code gets stored, deployed and kept running." },
  { id: "coursework", label: "From coursework", note: "Learned in class and used for assignments and experiments." },
];

/** `icon` is a Simple Icons slug; `fallback` names a Phosphor icon when no brand mark exists. */
export const tools: { name: string; icon?: string; fallback?: "database" | "cpu" | "cloud"; note: string; category: ToolCategory }[] = [
  { name: "Python", icon: "python", note: "Backends, numerics", category: "languages" },
  { name: "TypeScript", icon: "typescript", note: "Daily driver", category: "languages" },
  { name: "JavaScript", icon: "javascript", note: "The web layer", category: "languages" },
  { name: "SQL", fallback: "database", note: "Derived holdings", category: "languages" },
  { name: "Java", icon: "openjdk", note: "Android screens", category: "languages" },
  { name: "Kotlin", icon: "kotlin", note: "Android modules", category: "languages" },
  { name: "Bash", icon: "gnubash", note: "Server scripts", category: "languages" },
  { name: "React", icon: "react", note: "Interfaces", category: "frameworks" },
  { name: "Next.js", icon: "nextdotjs", note: "This site", category: "frameworks" },
  { name: "FastAPI", icon: "fastapi", note: "APIs", category: "frameworks" },
  { name: "SQLAlchemy", icon: "sqlalchemy", note: "ORM", category: "frameworks" },
  { name: "NumPy", icon: "numpy", note: "Optimizer core", category: "frameworks" },
  { name: "OpenCV", icon: "opencv", note: "Watermarking", category: "frameworks" },
  { name: "pytest", icon: "pytest", note: "200+ tests", category: "frameworks" },
  { name: "Android SDK", icon: "android", note: "Native apps", category: "frameworks" },
  { name: "Git", icon: "git", note: "Version control", category: "infrastructure" },
  { name: "Docker Compose", icon: "docker", note: "Arus stack", category: "infrastructure" },
  { name: "Caddy", icon: "caddy", note: "Automatic TLS", category: "infrastructure" },
  { name: "Linux", icon: "linux", note: "Self-managed VM", category: "infrastructure" },
  { name: "PostgreSQL", icon: "postgresql", note: "Source of truth", category: "infrastructure" },
  { name: "SQLite", icon: "sqlite", note: "Local storage", category: "infrastructure" },
  { name: "Firebase", icon: "firebase", note: "Auth, Firestore", category: "infrastructure" },
  { name: "Vercel", icon: "vercel", note: "Frontends", category: "infrastructure" },
  { name: "Render", icon: "render", note: "APIs", category: "infrastructure" },
  { name: "Oracle Cloud", fallback: "cloud", note: "Compute", category: "infrastructure" },
  { name: "C", icon: "c", note: "Systems", category: "coursework" },
  { name: "C++", icon: "cplusplus", note: "Algorithms", category: "coursework" },
  { name: "Assembly", fallback: "cpu", note: "Microprocessors", category: "coursework" },
  { name: "PyTorch", icon: "pytorch", note: "Deep learning", category: "coursework" },
  { name: "TensorFlow / Keras", icon: "tensorflow", note: "Deep learning", category: "coursework" },
  { name: "scikit-learn", icon: "scikitlearn", note: "Classic ML", category: "coursework" },
];

export const recordStats = [
  { value: "3rd", unit: "of 54", label: "Class rank", tone: "brand" },
  { value: "4.03", unit: "/ 4.30", label: "GPA at Feng Chia", tone: "lime" },
  { value: "3", unit: "times", label: "Outstanding Student Scholarship", tone: "card" },
  { value: "990", unit: "/ 990", label: "TOEIC English", tone: "card" },
] as const;
