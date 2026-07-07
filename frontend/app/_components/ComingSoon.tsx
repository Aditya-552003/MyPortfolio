import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { SectionContainer } from "@/components/ui/SectionContainer";

export interface ComingSoonProps {
  eyebrow: string;
  title: string;
  description: string;
}

/** Placeholder used by routes whose content ships in a later sprint. */
export function ComingSoon({ eyebrow, title, description }: ComingSoonProps): ReactNode {
  return (
    <SectionContainer className="flex flex-col items-start gap-4 py-24">
      <Badge variant="neutral">{eyebrow}</Badge>
      <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="text-muted max-w-xl">{description}</p>
    </SectionContainer>
  );
}
