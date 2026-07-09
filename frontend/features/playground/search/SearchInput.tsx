"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { Button } from "@/components/ui/Button";

export interface SearchInputProps {
  onSubmit: (query: string) => void;
  isLoading?: boolean;
}

export function SearchInput({ onSubmit, isLoading = false }: SearchInputProps): ReactNode {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor="search-input" className="sr-only">
        Search skills, technologies, or projects
      </label>
      <input
        id="search-input"
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="e.g. which projects use transformers?"
        maxLength={200}
        disabled={isLoading}
        className="border-border bg-surface text-foreground placeholder:text-muted focus:border-primary h-11 flex-1 rounded-[var(--radius-md)] border px-3.5 text-sm outline-none disabled:opacity-60"
      />
      <Button type="submit" variant="primary" loading={isLoading} disabled={!value.trim()}>
        <Search className="size-4" aria-hidden />
        Search
      </Button>
    </form>
  );
}
