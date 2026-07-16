export const profile = {
  name: "Hari Chandra Wijaya",
  role: "Informatics Engineering & CS Student · Feng Chia University",

  tagline:
    "Full-stack developer and scholarship awardee at Feng Chia University. I build web apps, Android apps, and AI-powered tools, and I like shipping things people can actually use.",

  location: "Taichung, Taiwan",
  email: "harichandrawjy@gmail.com",

  bio: [
    "I'm an undergraduate studying Informatics Engineering and Computer Science at Feng Chia University in Taichung, Taiwan (class of 2027), where I hold a 4.0/4.3 GPA and have received the Outstanding Student Scholarship three times for the best grades in my class.",
    "I work across the stack: web apps with React and TypeScript, backends in Python, and Android apps in Java and Kotlin. Recently I've been building with AI. My hackathon team created WasteWise, an autonomous purchasing agent combining demand forecasting with LLM-driven decision making. Right now I'm going deeper into Next.js and modern web architecture.",
  ],

  socials: {
    github: "https://github.com/harichandrawjy",
    linkedin: "https://www.linkedin.com/in/hari-chandra-wijaya-254330288/",
    instagram: "https://instagram.com/harichandrawjy",
  },

  skills: {
    Languages: ["TypeScript", "JavaScript", "Python", "Java", "Kotlin"],
    Frameworks: [
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "OpenCV",
      "Android SDK",
    ],
    Tools: ["Git", "Firebase", "Vercel", "SQLite"],
  },

  awards: [
    {
      title: "Outstanding Student Scholarship x3",
      issuer: "Feng Chia University",
      detail:
        "Awarded three consecutive semesters (2024 to 2025) for the best grades in class.",
    },
  ],
} as const;
