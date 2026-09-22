const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const profile = {
  name: "Sumit Chavda",
  initials: "SC",
  title: "Data Center Technical Support Engineer & Infrastructure Engineer",
  specialization:
    "Infrastructure | Cybersecurity | Network Monitoring | Server & VM Monitoring | Automation",
  location: "Ahmedabad, Gujarat, India",
  email: "sumeetchavda22@gmail.com",
  phone: "+91 9687973140",
  phoneHref: "tel:+919687973140",
  linkedin: "https://www.linkedin.com/in/sumit-chavda-9b73aa267",
  github: "https://github.com/sumit-chavda22",
  cvPath: `${basePath}/Sumit_Chavda_CV_2026.pdf`,
  cvFileName: "Sumit_Chavda_CV_2026.pdf",
  availability: "Available for infrastructure & security opportunities",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sumit-chavda22.github.io",
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;
