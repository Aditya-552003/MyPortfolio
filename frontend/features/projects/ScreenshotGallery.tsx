import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/Card";

export interface ScreenshotGalleryProps {
  screenshots?: readonly string[];
  projectTitle?: string;
}

function screenshotAlt(src: string, projectTitle?: string): string {
  const filename = src.split("/").pop()?.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ") ?? "screenshot";
  return projectTitle ? `${projectTitle} — ${filename}` : filename;
}

/** Renders real screenshots when available; otherwise an honest "not captured yet" state. */
export function ScreenshotGallery({
  screenshots,
  projectTitle,
}: ScreenshotGalleryProps): ReactNode {
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
        <Image
          key={src}
          src={src}
          alt={screenshotAlt(src, projectTitle)}
          width={1280}
          height={720}
          loading="lazy"
          className="border-border w-full rounded-[var(--radius-md)] border"
        />
      ))}
    </div>
  );
}
