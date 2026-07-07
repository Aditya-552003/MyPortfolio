import { Star } from "lucide-react";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";
import type { GitHubRepo } from "./githubApi";

export interface PinnedRepoCardProps {
  repo: GitHubRepo;
}

export function PinnedRepoCard({ repo }: PinnedRepoCardProps): ReactNode {
  return (
    <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
      <Card variant="standard" hover="lift" className="h-full p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-foreground truncate font-semibold">{repo.name}</h3>
          <span className="text-muted inline-flex shrink-0 items-center gap-1 text-xs">
            <Star className="size-3.5" aria-hidden />
            {repo.stars}
          </span>
        </div>
        <p className="text-muted mt-1 line-clamp-2 text-sm">
          {repo.description ?? "No description provided."}
        </p>
        {repo.language ? <p className="text-muted mt-2 text-xs">{repo.language}</p> : null}
      </Card>
    </a>
  );
}
