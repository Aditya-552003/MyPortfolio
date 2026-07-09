"use client";

import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { Button } from "@/components/ui/Button";

const MAX_LENGTH = 2000;

export interface EmotionInputProps {
  onSubmit: (text: string) => void;
  isLoading?: boolean;
}

export function EmotionInput({ onSubmit, isLoading = false }: EmotionInputProps): ReactNode {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label htmlFor="emotion-input" className="text-foreground text-sm font-medium">
        Text to analyze
      </label>
      <textarea
        id="emotion-input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="e.g. I just got promoted and I couldn't be happier!"
        rows={3}
        maxLength={MAX_LENGTH}
        disabled={isLoading}
        className="border-border bg-surface text-foreground placeholder:text-muted focus:border-primary resize-y rounded-[var(--radius-md)] border px-3.5 py-2.5 text-sm outline-none disabled:opacity-60"
      />
      <div className="flex items-center justify-between">
        <span className="text-muted text-xs">
          {value.length}/{MAX_LENGTH}
        </span>
        <Button type="submit" variant="primary" loading={isLoading} disabled={!value.trim()}>
          Detect emotion
        </Button>
      </div>
    </form>
  );
}
