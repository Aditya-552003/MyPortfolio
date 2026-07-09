import Link from "next/link";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { SearchResult } from "@/lib/hooks/useSemanticSearch";

export interface RankedResultListProps {
  results: readonly SearchResult[];
}

export function RankedResultList({ results }: RankedResultListProps): ReactNode {
  if (results.length === 0) {
    return <p className="text-muted text-sm">No matches yet — try a different phrasing.</p>;
  }

  return (
    <ol className="flex flex-col gap-2">
      {results.map((result, index) => (
        <li key={`${result.type}-${result.title}`}>
          <Link href={result.url} className="block">
            <Card
              variant="standard"
              hover="lift"
              className="flex items-center justify-between gap-3 p-3.5"
            >
              <div className="flex items-center gap-3">
                <span className="text-muted text-xs font-medium">#{index + 1}</span>
                <span className="text-foreground font-medium">{result.title}</span>
                <Badge variant="neutral">{result.type}</Badge>
              </div>
              <span className="text-muted shrink-0 text-xs">
                {Math.round(result.score * 100)}% match
              </span>
            </Card>
          </Link>
        </li>
      ))}
    </ol>
  );
}
