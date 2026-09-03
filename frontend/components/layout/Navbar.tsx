"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { navItems, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

import { MobileNav } from "./MobileNav";
import { ResumeButton } from "./ResumeButton";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar(): ReactNode {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(() => pathname === "/");

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const handleComplete = (): void => {
      setIsLoading(false);
    };

    window.addEventListener("hero-loading-complete", handleComplete);

    // Safety fallback timer to ensure navbar is never stuck hidden
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3600);

    return () => {
      window.removeEventListener("hero-loading-complete", handleComplete);
      clearTimeout(timer);
    };
  }, [pathname]);

  return (
    <motion.header
      initial={pathname === "/" ? { opacity: 0, y: -48 } : { opacity: 1, y: 0 }}
      animate={
        isLoading && pathname === "/"
          ? { opacity: 0, y: -48, pointerEvents: "none" }
          : { opacity: 1, y: 0, pointerEvents: "auto" }
      }
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/80 text-foreground supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:backdrop-blur-[var(--glass-blur)]"
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8 2xl:max-w-[1600px]">
        <Link
          href="/"
          className="text-base font-semibold tracking-tight transition-colors text-foreground hover:opacity-80"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors duration-[var(--duration-fast)]",
                  isActive
                    ? "font-semibold text-foreground bg-accent/40"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/20",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ResumeButton className="hidden sm:inline-flex" />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
}
