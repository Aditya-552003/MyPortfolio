import { ImageOff } from "lucide-react";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";

export interface ScreenshotGalleryProps {
  screenshots?: readonly string[];
}

/** Renders real screenshots when available; otherwise an honest "not captured yet" state. */
export function ScreenshotGallery({ screenshots }: ScreenshotGalleryProps): ReactNode {
  if (!screenshots || screenshots.length === 0) {
    return (
      <Card
        variant="standard"
        className="text-muted flex flex-col items-center gap-2 p-8 text-center"
      >
        <ImageOff className="size-6" aria-hidden />
        <p className="text-sm">Screenshots haven&apos;t been captured for this project yet.</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {screenshots.map((src) => (
        // eslint-disable-next-line @next/next/no-img-element -- gallery source list length/format not yet finalized; revisit with next/image once real assets exist
        <img
          key={src}
          src={src}
          alt=""
          className="border-border w-full rounded-[var(--radius-md)] border"
        />
      ))}
    </div>
  );
}
