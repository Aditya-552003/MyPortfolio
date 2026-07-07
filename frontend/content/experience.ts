import type { Experience } from "./types";

/**
 * Placeholder work history (PRD §7.6). Real entries — companies, dates,
 * achievements — still need to replace these before launch; every item
 * here is flagged `isPlaceholder: true` and the UI surfaces that flag.
 */
export const experience: readonly Experience[] = [
  {
    id: "sample-internship",
    organization: "[Company Name]",
    role: "Software Engineering Intern",
    type: "internship",
    startDate: "2025-05",
    endDate: "2025-08",
    description:
      "Sample entry — replace with a real internship: what you built, the stack, and measurable impact.",
    tags: ["Python", "FastAPI"],
    isPlaceholder: true,
  },
  {
    id: "sample-freelance",
    organization: "Independent",
    role: "Freelance AI Engineer",
    type: "freelance",
    startDate: "2024-09",
    endDate: null,
    description:
      "Sample entry — replace with real freelance/contract work: client problem, solution shipped, outcome.",
    tags: ["RAG", "Next.js"],
    isPlaceholder: true,
  },
  {
    id: "sample-open-source",
    organization: "[Open-Source Project]",
    role: "Contributor",
    type: "open-source",
    startDate: "2024-01",
    endDate: null,
    description: "Sample entry — replace with a real open-source contribution and its outcome.",
    tags: ["Open Source"],
    isPlaceholder: true,
  },
] as const;
