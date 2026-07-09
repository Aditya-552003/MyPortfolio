import type { ReactNode } from "react";

import type { EmotionPrediction } from "@/lib/hooks/useEmotion";

export interface EmotionResultBarsProps {
  emotions: readonly EmotionPrediction[];
}

// Matches the real EmoSens API's documented color-per-emotion scheme (docs/api_spec.md).
const EMOTION_COLORS: Record<string, string> = {
  joy: "hsl(45, 95%, 58%)",
  sadness: "hsl(220, 80%, 55%)",
  anger: "hsl(5, 85%, 52%)",
  fear: "hsl(270, 70%, 55%)",
  surprise: "hsl(190, 85%, 50%)",
  neutral: "hsl(215, 15%, 55%)",
};

export function EmotionResultBars({ emotions }: EmotionResultBarsProps): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      {emotions.map((emotion) => {
        const percentage = Math.round(emotion.confidence * 100);
        const color = EMOTION_COLORS[emotion.label] ?? "var(--primary)";
        return (
          <div key={emotion.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-foreground font-medium capitalize">{emotion.label}</span>
              <span className="text-muted">{percentage}%</span>
            </div>
            <div className="bg-border/60 h-2.5 overflow-hidden rounded-full">
              <div
                className="h-full rounded-full transition-[width] duration-700 ease-[var(--ease-out)]"
                style={{ width: `${percentage}%`, backgroundColor: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
