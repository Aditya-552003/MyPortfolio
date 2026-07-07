import type { ReactNode } from "react";

import { siteConfig, socialLinks } from "@/config/site";

/** JSON-LD Person + CreativeWork structured data for the whole site (PRD §21 SEO checklist). */
export function StructuredData(): ReactNode {
  const sameAs = socialLinks
    .filter((link) => link.href.startsWith("http"))
    .map((link) => link.href);

  const person = {
    "@type": "Person",
    name: siteConfig.authorName,
    jobTitle: siteConfig.jobTitle,
    url: siteConfig.url,
    sameAs,
  };

  const creativeWork = {
    "@type": "CreativeWork",
    name: siteConfig.name,
    description: siteConfig.description,
    author: { "@type": "Person", name: siteConfig.authorName },
    url: siteConfig.url,
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [person, creativeWork],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
