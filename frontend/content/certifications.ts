import type { Certification } from "./types";

/** Placeholder certifications (PRD §7.8) — replace with real credentials before launch. */
export const certifications: readonly Certification[] = [
  {
    id: "sample-cert-1",
    title: "[Certification Title]",
    issuer: "[Issuing Organization]",
    date: "2025-03",
    credentialUrl: "#",
    isPlaceholder: true,
  },
  {
    id: "sample-cert-2",
    title: "[Certification Title]",
    issuer: "[Issuing Organization]",
    date: "2024-11",
    credentialUrl: "#",
    isPlaceholder: true,
  },
] as const;
