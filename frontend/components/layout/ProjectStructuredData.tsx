import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import type { Project } from "@/content/types";

export interface ProjectStructuredDataProps {
  project: Project;
}

/** JSON-LD SoftwareApplication schema for project detail pages. */
export function ProjectStructuredData({ project }: ProjectStructuredDataProps): ReactNode {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.tagline,
    url: `${siteConfig.url}/projects/${project.slug}`,
    applicationCategory: project.categories.join(", "),
    author: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: siteConfig.url,
    },
    codeRepository: project.githubUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
