import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { ApiEndpoint } from "@/content/types";

const METHOD_VARIANT: Record<ApiEndpoint["method"], "primary" | "accent" | "warning" | "error"> = {
  GET: "primary",
  POST: "accent",
  PUT: "warning",
  DELETE: "error",
};

export interface ApiEndpointsListProps {
  endpoints: readonly ApiEndpoint[];
}

export function ApiEndpointsList({ endpoints }: ApiEndpointsListProps): ReactNode {
  return (
    <Card variant="standard" className="divide-border divide-y p-0">
      {endpoints.map((endpoint) => (
        <div key={`${endpoint.method}-${endpoint.path}`} className="flex items-center gap-3 p-3.5">
          <Badge variant={METHOD_VARIANT[endpoint.method]} className="w-16 shrink-0 justify-center">
            {endpoint.method}
          </Badge>
          <code className="text-foreground shrink-0 text-sm font-medium">{endpoint.path}</code>
          <span className="text-muted text-sm">{endpoint.description}</span>
        </div>
      ))}
    </Card>
  );
}
