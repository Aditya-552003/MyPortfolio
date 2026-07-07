import type { Education } from "./types";

/** Placeholder education history (PRD §7.7) — replace with real details before launch. */
export const education: readonly Education[] = [
  {
    id: "sample-degree",
    institution: "[University Name]",
    degree: "Bachelor's Degree",
    fieldOfStudy: "Computer Science",
    startDate: "2021-08",
    endDate: "2025-05",
    coursework: [
      "Machine Learning",
      "Natural Language Processing",
      "Distributed Systems",
      "Data Structures & Algorithms",
    ],
    isPlaceholder: true,
  },
] as const;
