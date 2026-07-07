import type { ReactNode } from "react";

import { Timeline, TimelineItem } from "@/components/ui/Timeline";
import { education } from "@/content/education";
import { formatDateRange } from "@/lib/utils/formatDateRange";

export function EducationTimeline(): ReactNode {
  return (
    <Timeline className="max-w-2xl">
      {education.map((entry, index) => (
        <TimelineItem
          key={entry.id}
          dateRange={formatDateRange(entry.startDate, entry.endDate)}
          title={`${entry.degree}, ${entry.fieldOfStudy}`}
          subtitle={entry.institution}
          isPlaceholder={entry.isPlaceholder}
          delayMs={index * 75}
        >
          {entry.coursework && entry.coursework.length > 0 ? (
            <p>
              <span className="text-foreground font-medium">Relevant coursework: </span>
              {entry.coursework.join(", ")}
            </p>
          ) : null}
        </TimelineItem>
      ))}
    </Timeline>
  );
}
