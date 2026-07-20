export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface SocialLink {
  readonly label: string;
  readonly href: string;
}

export const siteConfig = {
  name: "Aditya AI Studio",
  authorName: "Aditya",
  jobTitle: "AI Engineer",
  tagline: "Interactive AI Engineering Portfolio",
  mission: "Build. Search. Understand. Communicate.",
  description:
    "An interactive AI engineering portfolio — chat with a RAG-grounded assistant, run live emotion detection and semantic search, and explore production-grade AI projects.",
  url: "https://aditya-ai-studio.vercel.app",
  resumeUrl: "/resume.pdf",
  githubUsername: "Aditya-552003",
} as const;

export const navItems: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Playground", href: "/playground" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: readonly SocialLink[] = [
  { label: "Email", href: "mailto:adityash05052003@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aditya-sharma-422702263/" },
  { label: "GitHub", href: "https://github.com/Aditya-552003" },
];
