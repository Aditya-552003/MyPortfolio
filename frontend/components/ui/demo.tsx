"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";

export function DotPatternDemo() {
  return (
    <div className="bg-background relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border md:shadow-xl">
      <p className="z-10 text-center text-5xl font-medium tracking-tighter whitespace-pre-wrap text-black dark:text-white">
        Dot Pattern
      </p>
      <DotPattern
        className={cn("[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]")}
      />
    </div>
  );
}
