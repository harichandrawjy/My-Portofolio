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

export type ToolCategory = "languages" | "frameworks" | "infrastructure";

export const toolCategories: { id: ToolCategory; label: string; note: string }[] = [
  { id: "languages", label: "Languages", note: "What I write logic in, from APIs and data pipelines to Android apps and low-level code." },
  { id: "frameworks", label: "Frameworks & libraries", note: "Building blocks for interfaces, APIs, testing, numerical work and machine learning." },
  { id: "infrastructure", label: "Infrastructure", note: "Where code is versioned, stored, deployed and kept running." },
];

/** `icon` is a Simple Icons slug; `fallback` names a Phosphor icon when no brand mark exists. */
export const tools: { name: string; icon?: string; fallback?: "database" | "cpu" | "cloud"; note: string; category: ToolCategory }[] = [
  { name: "Python", icon: "python", note: "Backends and data", category: "languages" },
  { name: "TypeScript", icon: "typescript", note: "Typed JavaScript", category: "languages" },
  { name: "JavaScript", icon: "javascript", note: "Web interactivity", category: "languages" },
  { name: "SQL", fallback: "database", note: "Querying databases", category: "languages" },
  { name: "Java", icon: "openjdk", note: "Android apps", category: "languages" },
  { name: "Kotlin", icon: "kotlin", note: "Modern Android apps", category: "languages" },
  { name: "Bash", icon: "gnubash", note: "Shell scripting", category: "languages" },
  { name: "C", icon: "c", note: "Systems programming", category: "languages" },
  { name: "C++", icon: "cplusplus", note: "Performance code", category: "languages" },
  { name: "Assembly", fallback: "cpu", note: "Low-level programming", category: "languages" },
  { name: "React", icon: "react", note: "UI components", category: "frameworks" },
  { name: "Next.js", icon: "nextdotjs", note: "React web framework", category: "frameworks" },
  { name: "FastAPI", icon: "fastapi", note: "Python web APIs", category: "frameworks" },
  { name: "SQLAlchemy", icon: "sqlalchemy", note: "Python database toolkit", category: "frameworks" },
  { name: "NumPy", icon: "numpy", note: "Numerical computing", category: "frameworks" },
  { name: "PyTorch", icon: "pytorch", note: "Deep learning", category: "frameworks" },
  { name: "TensorFlow / Keras", icon: "tensorflow", note: "Deep learning", category: "frameworks" },
  { name: "scikit-learn", icon: "scikitlearn", note: "Machine learning", category: "frameworks" },
  { name: "OpenCV", icon: "opencv", note: "Image and video processing", category: "frameworks" },
  { name: "pytest", icon: "pytest", note: "Python testing", category: "frameworks" },
  { name: "Android SDK", icon: "android", note: "Android development", category: "frameworks" },
  { name: "Git", icon: "git", note: "Version control", category: "infrastructure" },
  { name: "Docker Compose", icon: "docker", note: "Multi-container apps", category: "infrastructure" },
  { name: "Caddy", icon: "caddy", note: "Web server, auto HTTPS", category: "infrastructure" },
  { name: "Linux", icon: "linux", note: "Server operating system", category: "infrastructure" },
  { name: "PostgreSQL", icon: "postgresql", note: "Relational database", category: "infrastructure" },
  { name: "SQLite", icon: "sqlite", note: "Embedded database", category: "infrastructure" },
  { name: "Firebase", icon: "firebase", note: "Auth and app backend", category: "infrastructure" },
  { name: "Vercel", icon: "vercel", note: "Frontend hosting", category: "infrastructure" },
  { name: "Render", icon: "render", note: "Backend hosting", category: "infrastructure" },
  { name: "Oracle Cloud", fallback: "cloud", note: "Cloud servers", category: "infrastructure" },
];

export const recordStats = [
  { value: "3rd", unit: "of 54", label: "Class rank", tone: "brand" },
  { value: "4.03", unit: "/ 4.30", label: "GPA at Feng Chia", tone: "lime" },
  { value: "3", unit: "times", label: "Outstanding Student Scholarship", tone: "card" },
  { value: "990", unit: "/ 990", label: "TOEIC English", tone: "card" },
] as const;
