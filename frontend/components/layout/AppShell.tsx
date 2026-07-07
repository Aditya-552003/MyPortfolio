import type { ReactNode } from "react";

import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { SkipToContent } from "./SkipToContent";

export interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps): ReactNode {
  return (
    <>
      <SkipToContent />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
