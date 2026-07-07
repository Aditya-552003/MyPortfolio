import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/Reveal";
import { certifications } from "@/content/certifications";

import { CertificationCard } from "./CertificationCard";

export function CertificationsList(): ReactNode {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {certifications.map((certification, index) => (
        <Reveal key={certification.id} delayMs={index * 75}>
          <CertificationCard certification={certification} />
        </Reveal>
      ))}
    </div>
  );
}
