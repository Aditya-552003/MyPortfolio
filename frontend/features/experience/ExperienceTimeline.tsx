import type { ReactNode } from "react";
import { ProjectShowcase, type ShowcaseItem } from "@/components/ui/project-showcase";
import { experience } from "@/content/experience";
import { formatDateRange } from "@/lib/utils/formatDateRange";

const experienceLogos: Record<string, string> = {
  "rapsora-software-engineer": "/rapsora_technology_logo.jpg",
  "rapsora-ai-engineer": "/rapsora_technology_logo.jpg",
  "oasis-infobyte-intern": "/oasis_infobyte_logo.jpg",
};

export function ExperienceTimeline({ className }: { className?: string } = {}): ReactNode {
  const showcaseItems: ShowcaseItem[] = experience.map((entry) => ({
    title: `${entry.role} — ${entry.organization}`,
    description: entry.description,
    year: formatDateRange(entry.startDate, entry.endDate),
    link: "/experience",
    image: experienceLogos[entry.id] ?? "/rapsora_technology_logo.jpg",
    tags: entry.tags,
  }));

  return (
    <div className={className}>
      <ProjectShowcase title="" items={showcaseItems} imageShape="circle" />
    </div>
  );
}
