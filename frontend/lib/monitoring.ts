/**
 * Optional client error reporting — initializes Sentry Browser SDK when
 * NEXT_PUBLIC_SENTRY_DSN is set. Uses @sentry/browser (not @sentry/nextjs)
 * because Next.js 16 is not yet supported by the Next.js Sentry SDK.
 */

import type * as SentryBrowser from "@sentry/browser";

let sentryModule: typeof SentryBrowser | null = null;

async function getSentry(): Promise<typeof SentryBrowser | null> {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
  if (!dsn) return null;
  if (!sentryModule) {
    sentryModule = await import("@sentry/browser");
    sentryModule.init({
      dsn,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 0.1,
    });
  }
  return sentryModule;
}

export function initClientMonitoring(): void {
  if (typeof window === "undefined") return;
  void getSentry();
}

export function captureClientError(error: unknown, context?: Record<string, string>): void {
  void getSentry().then((Sentry) => {
    if (Sentry) {
      Sentry.captureException(error, { extra: context });
    } else {
      console.error(error, context);
    }
  });
}
