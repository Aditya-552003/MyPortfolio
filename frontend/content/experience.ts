import type { Experience } from "./types";

export const experience: readonly Experience[] = [
  {
    id: "rapsora-software-engineer",
    organization: "Rapsora Technologies",
    role: "Software Engineer",
    type: "full-time",
    startDate: "2026-08",
    endDate: null,
    description:
      "Designed and developed a custom SharePoint platform from scratch, including a tailored home page, document management system, SME Finder with Azure integration, and enterprise search.",
    tags: [
      "SharePoint Framework (SPFx)",
      "SharePoint Permissions",
      "Azure Integration",
      "Enterprise Search",
    ],
    isPlaceholder: false,
  },
  {
    id: "rapsora-ai-engineer",
    organization: "Rapsora Technologies",
    role: "Artificial Intelligence Engineer",
    type: "internship",
    startDate: "2026-02",
    endDate: "2026-08",
    description:
      "Contributed to the development of AI-driven applications and intelligent automation solutions. Developed machine learning models, natural language processing pipelines, and data analysis systems.",
    tags: ["Python", "Machine Learning", "Data Analysis", "AI Automation", "NLP"],
    isPlaceholder: false,
  },
  {
    id: "oasis-infobyte-intern",
    organization: "Oasis Infobyte",
    role: "Intern",
    type: "internship",
    startDate: "2024-05",
    endDate: "2024-06",
    description:
      "Developed web & software development projects and implemented Application Programming Interfaces (API) integrations during the remote internship program.",
    tags: ["Application Programming Interfaces (API)", "Python", "Web Development"],
    isPlaceholder: false,
  },
] as const;
