import { ArrowDown } from "lucide-react";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";
import type { ArchitectureStep } from "@/content/types";

export interface ArchitectureDiagramProps {
  steps: readonly ArchitectureStep[];
}

/** Renders a real data-flow diagram (not a static image) from the project's actual pipeline steps. */
export function ArchitectureDiagram({ steps }: ArchitectureDiagramProps): ReactNode {
  return (
    <ol className="flex flex-col items-stretch gap-1">
      {steps.map((step, index) => (
        <li key={step.label} className="flex flex-col items-center gap-1">
          <Card variant="standard" className="w-full max-w-xl p-4">
            <p className="text-foreground font-semibold">{step.label}</p>
            <p className="text-muted mt-1 text-sm">{step.description}</p>
          </Card>
          {index < steps.length - 1 ? (
            <ArrowDown className="text-muted size-5" aria-hidden />
          ) : null}
        </li>
      ))}
    </ol>
  );
}
