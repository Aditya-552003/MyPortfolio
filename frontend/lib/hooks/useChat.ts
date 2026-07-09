"use client";

import { useCallback, useRef, useState } from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface UseChatResult {
  messages: readonly ChatMessage[];
  isStreaming: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
}

interface ChatStreamPayload {
  token?: string;
  error?: string;
  done?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

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

/** Streams a RAG-grounded reply from `/api/chat` (Server-Sent Events over fetch). */
export function useChat(): UseChatResult {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const historyRef = useRef<ChatMessage[]>([]);

  const sendMessage = useCallback(async (message: string): Promise<void> => {
    setError(null);
    const userMessage: ChatMessage = { role: "user", content: message };
    const historyForRequest = historyRef.current;
    historyRef.current = [...historyRef.current, userMessage];

    setMessages((current) => [...current, userMessage, { role: "assistant", content: "" }]);
    setIsStreaming(true);

    let assistantContent = "";

    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: historyForRequest }),
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
      setError(err instanceof Error ? err.message : "Something went wrong.");
      // Drop the user message + empty assistant placeholder so a failed turn doesn't
      // linger in history and get resent on the next attempt.
      historyRef.current = historyForRequest;
      setMessages((current) => current.slice(0, -2));
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return { messages, isStreaming, error, sendMessage };
}
