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
  /** Placeholder — swap for the real GitHub handle before launch (see GitHubStats). */
  githubUsername: "octocat",
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
  { label: "Email", href: "mailto:hello@example.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
];
