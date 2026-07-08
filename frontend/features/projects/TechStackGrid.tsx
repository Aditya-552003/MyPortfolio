import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import type { TechStackGroup } from "@/content/types";

export interface TechStackGridProps {
  groups: readonly TechStackGroup[];
}

export function TechStackGrid({ groups }: TechStackGridProps): ReactNode {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {groups.map((group) => (
        <div key={group.layer}>
          <h3 className="text-primary text-sm font-semibold tracking-wide uppercase">
            {group.layer}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <Badge key={item} variant="neutral">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
