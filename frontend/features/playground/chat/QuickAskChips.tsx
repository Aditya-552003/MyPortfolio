import type { ReactNode } from "react";

export interface QuickAskChipsProps {
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

const PRESETS = [
  "Show Resume",
  "Show AI projects",
  "What technologies do you know?",
  "How does your RAG work?",
];

export function QuickAskChips({ onSelect, disabled = false }: QuickAskChipsProps): ReactNode {
  return (
    <div role="group" aria-label="Quick-ask suggestions" className="flex flex-wrap gap-2">
      {PRESETS.map((preset) => (
        <button
          key={preset}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(preset)}
          className="border-border bg-surface text-muted hover:text-foreground rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-[var(--duration-fast)] disabled:opacity-60"
        >
          {preset}
        </button>
      ))}
    </div>
  );
}
