import { Download } from "lucide-react";
import type { ReactNode } from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export interface ResumeButtonProps {
  className?: string;
}

export function ResumeButton({ className }: ResumeButtonProps): ReactNode {
  return (
    <a
      href={siteConfig.resumeUrl}
      download
      className={cn(
        "border-border text-foreground hover:bg-surface inline-flex h-10 items-center gap-2 rounded-[var(--radius-md)] border px-4 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
        className,
      )}
    >
      <Download className="size-4" aria-hidden />
      Résumé
    </a>
  );
}
