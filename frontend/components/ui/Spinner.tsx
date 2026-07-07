import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";

export interface SpinnerProps {
  className?: string;
  label?: string;
}

export function Spinner({ className, label = "Loading" }: SpinnerProps): ReactNode {
  return (
    <span role="status" className="inline-flex items-center">
      <Loader2 className={cn("text-muted size-5 animate-spin", className)} aria-hidden />
      <span className="sr-only">{label}</span>
    </span>
  );
}
