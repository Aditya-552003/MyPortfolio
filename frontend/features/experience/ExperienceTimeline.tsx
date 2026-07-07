import type { ReactNode } from "react";

import { Timeline, TimelineItem } from "@/components/ui/Timeline";
import { experience } from "@/content/experience";
import { formatDateRange } from "@/lib/utils/formatDateRange";

export function ExperienceTimeline(): ReactNode {
  return (
    <Timeline className="max-w-2xl">
      {experience.map((entry, index) => (
        <TimelineItem
          key={entry.id}
          dateRange={formatDateRange(entry.startDate, entry.endDate)}
          title={entry.role}
          subtitle={entry.organization}
          tags={entry.tags}
          isPlaceholder={entry.isPlaceholder}
          delayMs={index * 75}
        >
          {entry.description}
        </TimelineItem>
      ))}
    </Timeline>
  );
}
