"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";

import { navItems } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export function MobileNav(): ReactNode {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger
        aria-label="Open menu"
        className="text-foreground hover:bg-surface inline-flex size-10 items-center justify-center rounded-full lg:hidden"
      >
        <Menu className="size-5" aria-hidden />
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="bg-background/70 fixed inset-0 z-50 backdrop-blur-sm lg:hidden" />
        <DialogPrimitive.Content
          className="border-border bg-surface fixed top-0 right-0 z-50 flex h-full w-full max-w-xs flex-col gap-1 border-l p-6 shadow-[var(--shadow-lg)] backdrop-blur-[var(--glass-blur)] lg:hidden"
          aria-describedby={undefined}
        >
          <div className="mb-6 flex items-center justify-between">
            <DialogPrimitive.Title className="text-muted text-sm font-semibold">
              Menu
            </DialogPrimitive.Title>
            <DialogPrimitive.Close
              aria-label="Close menu"
              className="text-foreground hover:bg-surface inline-flex size-10 items-center justify-center rounded-full"
            >
              <X className="size-5" aria-hidden />
            </DialogPrimitive.Close>
          </div>
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-[var(--radius-md)] px-4 py-3 text-base font-medium transition-colors duration-[var(--duration-fast)]",
                    isActive ? "bg-primary text-on-primary" : "text-foreground hover:bg-border/50",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
