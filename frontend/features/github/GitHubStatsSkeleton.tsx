import type { ReactNode } from "react";

import { Skeleton } from "@/components/ui/Skeleton";

export function GitHubStatsSkeleton(): ReactNode {
  return (
    <div className="flex flex-col gap-6" aria-hidden>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
      <Skeleton className="h-40 w-full" />
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-7 w-16" />
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-7 w-14" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    </div>
  );
}
