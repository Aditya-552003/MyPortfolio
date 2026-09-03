import type { Certification } from "./types";

export const certifications: readonly Certification[] = [
  {
    id: "hackathon-built-with-framework",
    title: "Secured First Prize in Built with Framework Hackathon",
    issuer: "Flutter Kanpur",
    date: "2026",
    isPlaceholder: false,
  },
  {
    id: "ibm-data-science-cert",
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM & Coursera",
    date: "2025",
    credentialUrl: "#",
    isPlaceholder: false,
  },
  {
    id: "physics-wallah-python-dsa",
    title: "Decode Python with DSA",
    issuer: "Physics Wallah",
    date: "2025",
    credentialUrl: "#",
    isPlaceholder: false,
  },
  {
    id: "tutedude-machine-learning",
    title: "Machine Learning Certificate",
    issuer: "Tutedude",
    date: "2025",
    credentialUrl: "#",
    isPlaceholder: false,
  },
] as const;
