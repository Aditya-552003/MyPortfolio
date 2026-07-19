"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";
import { captureClientError } from "@/lib/monitoring";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): ReactNode {
  useEffect(() => {
    captureClientError(error, { digest: error.digest ?? "unknown" });
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground flex min-h-screen flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-muted max-w-md text-center text-sm">
          An unexpected error occurred. You can retry, or head back to the homepage.
        </p>
        <div className="flex gap-3">
          <Button type="button" variant="primary" onClick={reset}>
            Try again
          </Button>
          <Button href="/" variant="secondary">
            Go home
          </Button>
        </div>
      </body>
    </html>
  );
}
