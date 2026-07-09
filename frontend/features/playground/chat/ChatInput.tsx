"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

import { Button } from "@/components/ui/Button";

export interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps): ReactNode {
  const [value, setValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <label htmlFor="chat-input" className="sr-only">
        Message
      </label>
      <textarea
        id="chat-input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSubmit(event as unknown as FormEvent<HTMLFormElement>);
          }
        }}
        placeholder="Ask about Aditya's projects, skills, or experience…"
        rows={1}
        maxLength={2000}
        disabled={disabled}
        className="border-border bg-surface text-foreground placeholder:text-muted focus:border-primary min-h-11 flex-1 resize-none rounded-[var(--radius-md)] border px-3.5 py-2.5 text-sm outline-none disabled:opacity-60"
      />
      <Button type="submit" variant="primary" size="icon" disabled={disabled || !value.trim()}>
        <Send className="size-4" aria-hidden />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
  );
}
