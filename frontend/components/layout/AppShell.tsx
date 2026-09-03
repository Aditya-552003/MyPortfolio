import type { ReactNode } from "react";

import { QueryProvider } from "@/components/providers/QueryProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ToastProvider } from "@/components/ui/Toast";
import { TooltipProvider } from "@/components/ui/Tooltip";

import { Footer } from "./Footer";
import { PortfolioFloatingNav } from "./PortfolioFloatingNav";
import { SkipToContent } from "./SkipToContent";

export interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps): ReactNode {
  return (
    <QueryProvider>
      <SmoothScrollProvider>
        <TooltipProvider delayDuration={200}>
          <ToastProvider>
            <SkipToContent />
            <PortfolioFloatingNav />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </TooltipProvider>
      </SmoothScrollProvider>
    </QueryProvider>
  );
}
