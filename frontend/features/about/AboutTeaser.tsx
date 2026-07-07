import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";

export function AboutTeaser(): ReactNode {
  return (
    <Reveal>
      <Card variant="standard" className="p-8">
        <h2 className="text-foreground text-2xl font-bold tracking-tight">About</h2>
        <p className="text-muted mt-3 max-w-2xl">
          I&apos;m an AI engineer who ships end-to-end: model training and evaluation, RAG
          pipelines, and the full-stack apps that put them in front of real users — including this
          site, which is itself a working AI product.
        </p>
        <Link
          href="/about"
          className="text-primary mt-4 inline-flex items-center gap-1 text-sm font-medium hover:underline"
        >
          More about Aditya
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </Card>
    </Reveal>
  );
}
