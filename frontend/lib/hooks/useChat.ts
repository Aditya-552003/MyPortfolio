"use client";

import { useCallback, useRef, useState } from "react";

import { findCachedAnswer } from "@/lib/chatFallbacks";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface UseChatResult {
  messages: readonly ChatMessage[];
  isStreaming: boolean;
  error: string | null;
  canRetry: boolean;
  sendMessage: (message: string) => Promise<void>;
  retryLast: () => Promise<void>;
}

interface ChatStreamPayload {
  token?: string;
  error?: string;
  done?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const CHAT_TIMEOUT_MS = 10_000;

function parseSseEvents(buffer: string): { events: ChatStreamPayload[]; rest: string } {
  const parts = buffer.split("\n\n");
  const rest = parts.pop() ?? "";
  const events: ChatStreamPayload[] = [];

  for (const part of parts) {
    const line = part.trim();
    if (!line.startsWith("data:")) continue;
    const jsonText = line.slice("data:".length).trim();
    if (!jsonText) continue;
    try {
      events.push(JSON.parse(jsonText) as ChatStreamPayload);
    } catch {
      // Ignore a malformed SSE frame rather than breaking the whole stream.
    }
  }

  return { events, rest };
}

function applyCachedFallback(message: string): string {
  return (
    findCachedAnswer(message) ??
    "The live assistant is offline right now. Browse Projects, Skills, or Experience on this site — or retry in a moment."
  );
}

/** Streams a RAG-grounded reply from `/api/chat` (Server-Sent Events over fetch). */
export function useChat(): UseChatResult {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [canRetry, setCanRetry] = useState(false);
  const historyRef = useRef<ChatMessage[]>([]);
  const lastUserMessageRef = useRef<string | null>(null);

  const sendMessage = useCallback(async (message: string): Promise<void> => {
    setError(null);
    setCanRetry(false);
    lastUserMessageRef.current = message;

    const userMessage: ChatMessage = { role: "user", content: message };
    const historyForRequest = historyRef.current;
    historyRef.current = [...historyRef.current, userMessage];

    setMessages((current) => [...current, userMessage, { role: "assistant", content: "" }]);
    setIsStreaming(true);

    let assistantContent = "";
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), CHAT_TIMEOUT_MS);

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: historyForRequest }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const body: unknown = await response.json().catch(() => null);
        const apiMessage =
          body && typeof body === "object" && "error" in body
            ? (body as { error: { message: string } }).error.message
            : null;
        throw new Error(apiMessage ?? "Chat is temporarily unavailable.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const { events, rest } = parseSseEvents(buffer);
        buffer = rest;

        for (const event of events) {
          if (event.error) throw new Error(event.error);
          if (event.token) {
            assistantContent += event.token;
            const nextContent = assistantContent;
            setMessages((current) => {
              const next = [...current];
              next[next.length - 1] = { role: "assistant", content: nextContent };
              return next;
            });
          }
        }
      }

      historyRef.current = [
        ...historyRef.current,
        { role: "assistant", content: assistantContent },
      ];
    } catch (err) {
      const timedOut = err instanceof DOMException && err.name === "AbortError";
      const fallback = applyCachedFallback(message);
      const errorMessage = timedOut
        ? "That took too long (over 10s). Showing a cached answer — tap Retry for a live reply."
        : err instanceof Error
          ? err.message
          : "Something went wrong.";

      setError(errorMessage);
      setCanRetry(true);
      setMessages((current) => {
        const next = [...current];
        next[next.length - 1] = {
          role: "assistant",
          content: `${fallback}\n\n_(Cached fallback — live chat unavailable.)_`,
        };
        return next;
      });
      historyRef.current = [
        ...historyForRequest,
        userMessage,
        { role: "assistant", content: fallback },
      ];
    } finally {
      window.clearTimeout(timeoutId);
      setIsStreaming(false);
    }
  }, []);

  const retryLast = useCallback(async () => {
    const last = lastUserMessageRef.current;
    if (!last) return;
    // Drop the failed turn (user + fallback assistant) before resending.
    historyRef.current = historyRef.current.slice(0, -2);
    setMessages((current) => current.slice(0, -2));
    await sendMessage(last);
  }, [sendMessage]);

  return { messages, isStreaming, error, canRetry, sendMessage, retryLast };
}
