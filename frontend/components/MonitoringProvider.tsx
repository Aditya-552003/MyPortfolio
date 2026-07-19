"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

import { initClientMonitoring } from "@/lib/monitoring";

/** Initializes optional Sentry client monitoring once per session. */
export function MonitoringProvider({ children }: { children: ReactNode }): ReactNode {
  useEffect(() => {
    initClientMonitoring();
  }, []);

  return children;
}
