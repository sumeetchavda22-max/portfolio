import { CursorGlow, GridBackground, Loader } from "@/components/Ambient";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { Hero } from "@/components/sections/Hero";
import { ProjectGrid } from "@/components/sections/ProjectGrid";
import { SkillsConstellation } from "@/components/sections/SkillsConstellation";
import { TerminalSection } from "@/components/sections/TerminalSection";
import { profile } from "@/data/profile";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  description:
    "Data Center Technical Support Engineer and Infrastructure Engineer specializing in enterprise infrastructure, cybersecurity, server monitoring, virtualization and automation.",
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: profile.siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  sameAs: [profile.linkedin, profile.github],
  knowsAbout: [
    "Data Center Operations",
    "Dell PowerEdge",
    "Dell EMC Isilon",
    "SAN/NAS",
    "Hyper-V",
    "VMware",
    "Active Directory",
    "Network Monitoring",
    "Network Detection and Response",
    "Cybersecurity",
    "Python",
    "Django",
  ],
  alumniOf: [{ "@type": "CollegeOrUniversity", name: "Gujarat University" }],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <Loader />
      <GridBackground />
      <CursorGlow />
      <Navbar />
      <main id="main" className="relative">
        <Hero />
        <About />
        <ExperienceTimeline />
        <ProjectGrid />
        <SkillsConstellation />
        <Education />
        <TerminalSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
