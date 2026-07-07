/**
 * Shared content types. Sprint 1 populated the minimal fields needed for
 * landing-page teasers; Sprint 2 (S2-1 Content Data Architecture) adds the
 * remaining entities (Skill, Experience, Education, Certification, About).
 * The full 17-item project detail template (architecture diagrams, metrics,
 * folder trees, etc.) is Sprint 3 scope and will extend `Project` further.
 */

export type ProjectCategory = "AI" | "ML" | "NLP" | "Web" | "Vision" | "Search" | "Voice";

export interface Project {
  readonly slug: string;
  readonly title: string;
  readonly tagline: string;
  readonly categories: readonly ProjectCategory[];
}

export type SkillProficiency = "Core" | "Proficient" | "Working";

export interface SkillHighlight {
  readonly name: string;
  readonly description: string;
  readonly proficiency: SkillProficiency;
}

/** Grouping categories for the Skills Matrix (PRD §7.3). */
export type SkillCategory =
  | "Programming"
  | "Machine Learning & Deep Learning"
  | "Natural Language Processing"
  | "AI Systems"
  | "Backend Engineering"
  | "Frontend Engineering"
  | "DevOps & Cloud";

export interface Skill {
  readonly name: string;
  readonly category: SkillCategory;
  readonly proficiency: SkillProficiency;
}

export type ExperienceType = "internship" | "freelance" | "open-source" | "achievement";

export interface Experience {
  readonly id: string;
  readonly organization: string;
  readonly role: string;
  readonly type: ExperienceType;
  readonly startDate: string;
  /** `null` marks an ongoing / present-day entry. */
  readonly endDate: string | null;
  readonly description: string;
  readonly tags?: readonly string[];
  /** Set on placeholder entries so the UI can flag them as sample data. */
  readonly isPlaceholder?: boolean;
}

export interface Education {
  readonly id: string;
  readonly institution: string;
  readonly degree: string;
  readonly fieldOfStudy: string;
  readonly startDate: string;
  readonly endDate: string | null;
  readonly coursework?: readonly string[];
  readonly isPlaceholder?: boolean;
}

export interface Certification {
  readonly id: string;
  readonly title: string;
  readonly issuer: string;
  readonly date: string;
  readonly credentialUrl?: string;
  readonly isPlaceholder?: boolean;
}

export interface JourneyMilestone {
  readonly year: string;
  readonly title: string;
  readonly description: string;
}

export interface AboutContent {
  readonly intro: string;
  readonly objective: string;
  readonly focus: string;
  readonly mission: string;
  readonly values: readonly string[];
  readonly journey: readonly JourneyMilestone[];
}
