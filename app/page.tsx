import { profile } from "../data/profile";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { Honors } from "./components/Honors";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { Skills } from "./components/Skills";
import { Work } from "./components/Work";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.siteUrl,
  image: `${profile.siteUrl}/about/hari-chandra-wijaya.webp`,
  email: `mailto:${profile.email}`,
  jobTitle: "Software engineering student",
  address: { "@type": "PostalAddress", addressLocality: "Taichung", addressCountry: "TW" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Feng Chia University" },
  knowsLanguage: ["id", "en", "zh"],
  sameAs: [profile.socials.github.href, profile.socials.linkedin.href],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Skills />
        <Honors />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
