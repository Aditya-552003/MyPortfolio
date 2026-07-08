"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import type { ReactNode } from "react";

import { createQueryClient } from "@/lib/queryClient";

export function QueryProvider({ children }: { children: ReactNode }): ReactNode {
  const [client] = useState(createQueryClient);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
