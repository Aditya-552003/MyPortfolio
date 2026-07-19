"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { useToast } from "@/components/ui/Toast";
import { useChat } from "@/lib/hooks/useChat";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { QuickAskChips } from "./QuickAskChips";

function ChatWindowInner(): ReactNode {
  const { messages, isStreaming, error, canRetry, sendMessage, retryLast } = useChat();
  const { showToast } = useToast();
  const reducedMotion = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastError = useRef<string | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [messages, reducedMotion]);

  useEffect(() => {
    if (error && error !== lastError.current) {
      showToast("error", error);
      lastError.current = error;
    }
  }, [error, showToast]);

  function handleSend(message: string): void {
    void sendMessage(message);
  }

  return (
    <div className="border-border bg-surface flex h-[32rem] flex-col rounded-[var(--radius-lg)] border">
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Chat conversation"
        className="flex flex-1 flex-col gap-4 overflow-y-auto p-4"
      >
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="text-muted text-sm">
              Ask me anything about Aditya&apos;s projects, skills, or experience — grounded in real
              content from this site, not a generic assistant.
            </p>
            <QuickAskChips onSelect={handleSend} disabled={isStreaming} />
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              isStreaming={isStreaming && index === messages.length - 1}
            />
          ))
        )}
      </div>
      {canRetry ? (
        <div className="border-border flex items-center justify-between gap-3 border-t px-3 py-2">
          <p className="text-muted text-xs">Live reply timed out or failed.</p>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isStreaming}
            onClick={() => void retryLast()}
          >
            Retry
          </Button>
        </div>
      ) : null}
      <div className="border-border border-t p-3">
        <ChatInput onSend={handleSend} disabled={isStreaming} />
      </div>
    </div>
  );
}

export function ChatWindow(): ReactNode {
  return (
    <ErrorBoundary
      fallbackTitle="Chat hit an unexpected error"
      fallbackMessage="Try refreshing this tab, or use Voice / Semantic Search instead."
    >
      <ChatWindowInner />
    </ErrorBoundary>
  );
}
