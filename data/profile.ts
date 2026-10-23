export const profile = {
  name: "Hari Chandra Wijaya",
  role: "Software engineer",
  location: "Taichung, Taiwan",
  email: "harichandrawjy@gmail.com",
  siteUrl: "https://my-portofolio-gamma-woad.vercel.app",
  resume: "/resume/Hari-Chandra-Wijaya-Resume.pdf",

  availability:
    "I’m looking for a full-time semester internship from February to June 2027, in or near Taichung.",
  socials: {
    github: { label: "GitHub", handle: "harichandrawjy", href: "https://github.com/harichandrawjy" },
    linkedin: {
      label: "LinkedIn",
      handle: "Hari Chandra Wijaya",
      href: "https://www.linkedin.com/in/hari-chandra-wijaya-254330288/",
    },
  },

  education: {
    degree: "B.S. in Informatics Engineering and Computer Science",
    school: "Feng Chia University",
  },

  honors: [
    {
      title: "Outstanding Student Scholarship",
      org: "Feng Chia University",
      period: "Apr 2025 – May 2026",
      detail: "Awarded three times: ranked 1st in class twice and 2nd once.",
    },
    {
      title: "Outstanding Overseas Chinese Student Scholarship",
      org: "Overseas Community Affairs Council, Taiwan",
      period: "Nov 2025",
    },
    {
      title: "Overseas Chinese Student Grant",
      org: "Feng Chia University",
      period: "2024 – 2027",
      detail: "Top tier, NT$120,000 per year for three years.",
    },
  ],
} as const;
