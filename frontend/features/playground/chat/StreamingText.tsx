import type { ReactNode } from "react";

export interface StreamingTextProps {
  text: string;
  isStreaming: boolean;
}

/** Renders streamed text with a blinking cursor while tokens are still arriving. */
export function StreamingText({ text, isStreaming }: StreamingTextProps): ReactNode {
  return (
    <span className="whitespace-pre-wrap">
      {text}
      {isStreaming ? (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-current motion-reduce:animate-none"
        />
      ) : null}
    </span>
  );
}
