import type { ReactNode } from "react";

export interface StatBadgeProps {
  label: string;
  value: number;
}

export function StatBadge({ label, value }: StatBadgeProps): ReactNode {
  return (
    <div className="border-border bg-surface flex flex-col items-center gap-1 rounded-[var(--radius-md)] border px-4 py-3 sm:px-6">
      <span className="text-foreground text-2xl font-bold">{value.toLocaleString()}</span>
      <span className="text-muted text-xs uppercase">{label}</span>
    </div>
  );
}
