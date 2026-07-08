"use client";

import { useCallback, useState } from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface UseChatResult {
  messages: readonly ChatMessage[];
  isStreaming: boolean;
  sendMessage: (message: string) => Promise<void>;
}

/**
 * Stub — Sprint 4 (S4-2) implements real SSE streaming against `/api/chat`.
 * The shape matches the eventual contract so the Playground UI can be built
 * against this hook now without changing its call signature later.
 */
export function useChat(): UseChatResult {
  const [messages] = useState<readonly ChatMessage[]>([]);
  const [isStreaming] = useState(false);

  const sendMessage = useCallback(async (_message: string): Promise<void> => {
    throw new Error("useChat: streaming chat is implemented in Sprint 4.");
  }, []);

  return { messages, isStreaming, sendMessage };
}
