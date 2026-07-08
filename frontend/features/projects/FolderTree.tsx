import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";

export interface FolderTreeProps {
  structure: string;
}

export function FolderTree({ structure }: FolderTreeProps): ReactNode {
  return (
    <Card variant="standard" className="overflow-x-auto p-4">
      <pre className="text-muted text-sm leading-relaxed">
        <code>{structure}</code>
      </pre>
    </Card>
  );
}
