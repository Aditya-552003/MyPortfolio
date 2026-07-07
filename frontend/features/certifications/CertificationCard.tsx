import { Award, ExternalLink } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Certification } from "@/content/types";

export interface CertificationCardProps {
  certification: Certification;
}

export function CertificationCard({ certification }: CertificationCardProps): ReactNode {
  return (
    <Card variant="standard" hover="lift" className="flex flex-col gap-2 p-5">
      <div className="flex items-start justify-between gap-2">
        <Award className="text-primary size-5" aria-hidden />
        {certification.isPlaceholder ? <Badge variant="warning">Sample data</Badge> : null}
      </div>
      <h3 className="text-foreground font-semibold">{certification.title}</h3>
      <p className="text-muted text-sm">{certification.issuer}</p>
      <p className="text-muted text-xs">{certification.date}</p>
      {certification.credentialUrl ? (
        <a
          href={certification.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary mt-1 inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          View credential
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      ) : null}
    </Card>
  );
}
