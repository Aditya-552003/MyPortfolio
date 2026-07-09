import { Bot, User } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils/cn";
import type { ChatMessage as ChatMessageData } from "@/lib/hooks/useChat";

import { StreamingText } from "./StreamingText";

export interface ChatMessageProps {
  message: ChatMessageData;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming = false }: ChatMessageProps): ReactNode {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex items-start gap-3", isUser && "flex-row-reverse")}>
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-on-primary" : "bg-surface text-primary",
        )}
        aria-hidden
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </span>
      <div
        className={cn(
          "max-w-[80%] rounded-[var(--radius-md)] border px-4 py-2.5 text-sm",
          isUser
            ? "border-primary/30 bg-primary/10 text-foreground"
            : "border-border bg-surface text-foreground",
        )}
      >
        {message.content ? (
          <StreamingText text={message.content} isStreaming={isStreaming} />
        ) : (
          <span className="text-muted">Thinking…</span>
        )}
      </div>
    </div>
  );
}
