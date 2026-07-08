import type { ReactNode } from "react";

import { QueryProvider } from "@/components/providers/QueryProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { TooltipProvider } from "@/components/ui/Tooltip";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { SkipToContent } from "./SkipToContent";

export interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps): ReactNode {
  return (
    <QueryProvider>
      <TooltipProvider delayDuration={200}>
        <ToastProvider>
          <SkipToContent />
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </TooltipProvider>
    </QueryProvider>
  );
}
