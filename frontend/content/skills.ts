import type { Skill, SkillHighlight } from "./types";

/** Top three categories for the landing-page highlight strip (SKILLS.md §1). */
export const skillHighlights: readonly SkillHighlight[] = [
  {
    name: "AI & Machine Learning",
    description: "Transformers, RAG pipelines, and end-to-end model training and evaluation.",
    proficiency: "Core",
  },
  {
    name: "Full-Stack Engineering",
    description: "FastAPI services and Next.js/React apps, typed end to end.",
    proficiency: "Core",
  },
  {
    name: "DevOps & Cloud",
    description: "Docker, GitHub Actions CI/CD, and cloud-hosted deployments.",
    proficiency: "Proficient",
  },
] as const;

/** Full skills matrix grouped per PRD §7.3, sourced from SKILLS.md §1–8. */
export const skills: readonly Skill[] = [
  // Programming
  { name: "Python", category: "Programming", proficiency: "Core" },
  { name: "TypeScript", category: "Programming", proficiency: "Core" },
  { name: "JavaScript", category: "Programming", proficiency: "Proficient" },
  { name: "SQL", category: "Programming", proficiency: "Proficient" },

  // Machine Learning & Deep Learning
  { name: "Machine Learning", category: "Machine Learning & Deep Learning", proficiency: "Core" },
  { name: "Deep Learning", category: "Machine Learning & Deep Learning", proficiency: "Core" },

  // Natural Language Processing
  {
    name: "Natural Language Processing",
    category: "Natural Language Processing",
    proficiency: "Core",
  },
  { name: "Transformers", category: "Natural Language Processing", proficiency: "Core" },
  { name: "Sentence Transformers", category: "Natural Language Processing", proficiency: "Core" },

  // AI Systems
  { name: "RAG (Retrieval-Augmented Generation)", category: "AI Systems", proficiency: "Core" },
  { name: "LangChain", category: "AI Systems", proficiency: "Proficient" },

  // Backend Engineering
  { name: "FastAPI", category: "Backend Engineering", proficiency: "Core" },
  { name: "REST APIs", category: "Backend Engineering", proficiency: "Core" },

  // Frontend Engineering
  { name: "React", category: "Frontend Engineering", proficiency: "Core" },
  { name: "Next.js", category: "Frontend Engineering", proficiency: "Core" },
  { name: "SharePoint Framework (SPFx)", category: "Frontend Engineering", proficiency: "Working" },

  // DevOps & Cloud
  { name: "Docker", category: "DevOps & Cloud", proficiency: "Proficient" },
  { name: "GitHub Actions", category: "DevOps & Cloud", proficiency: "Proficient" },
  { name: "Azure", category: "DevOps & Cloud", proficiency: "Working" },
  { name: "Git", category: "DevOps & Cloud", proficiency: "Core" },
  { name: "Linux", category: "DevOps & Cloud", proficiency: "Proficient" },
] as const;
