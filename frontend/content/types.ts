/**
 * Shared content types. Sprint 1 populates the minimal fields needed for
 * landing-page teasers; Sprint 2 (S2-1 Content Data Architecture) extends
 * these with the full project detail template and remaining entities
 * (Experience, Education, Certification) without breaking these shapes.
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
