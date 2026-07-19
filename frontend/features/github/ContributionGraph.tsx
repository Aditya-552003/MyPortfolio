"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";

export interface ContributionGraphProps {
  username: string;
  profileUrl: string;
}

/**
 * Embeds a public contribution graph image. GitHub's REST API doesn't expose the
 * contribution calendar without GraphQL + auth, so — per the sprint plan — we use a
 * public image service instead, with a graceful text fallback if it fails to load.
 */
export function ContributionGraph({ username, profileUrl }: ContributionGraphProps): ReactNode {
  const [failed, setFailed] = useState(false);
  const chartUrl = `https://ghchart.rshah.org/0ea5e9/${username}`;

  if (failed) {
    return (
      <p className="text-muted text-sm">
        Contribution graph unavailable right now —{" "}
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-4"
        >
          view the full profile on GitHub
        </a>
        .
      </p>
    );
  }

  return (
    <Image
      src={chartUrl}
      alt={`${username}'s GitHub contribution graph`}
      width={800}
      height={112}
      loading="lazy"
      className="h-auto w-full max-w-full"
      onError={() => setFailed(true)}
    />
  );
}
