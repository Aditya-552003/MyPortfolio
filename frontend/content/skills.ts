import type { SkillHighlight } from "./types";

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
