"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { navItems, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

import { MobileNav } from "./MobileNav";
import { ResumeButton } from "./ResumeButton";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar(): ReactNode {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "border-border sticky top-0 z-40 w-full border-b",
        "bg-background/80 supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:backdrop-blur-[var(--glass-blur)]",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8 2xl:max-w-[1600px]">
        <Link href="/" className="text-foreground text-base font-semibold tracking-tight">
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
                  isActive ? "text-primary" : "text-muted hover:text-foreground",
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
    </header>
  );
}
