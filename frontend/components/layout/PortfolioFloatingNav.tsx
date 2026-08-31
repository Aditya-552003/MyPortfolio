"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

import FloatingMenu, { type MenuItem } from "@/components/ui/liquid-morph-floating-menu";
import { navItems } from "@/config/site";
import { useTheme } from "@/lib/hooks/useTheme";

export function PortfolioFloatingNav(): ReactNode {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const menuItems: MenuItem[] = [
    ...navItems.map((item) => ({
      label: item.label,
      onClick: () => {
        if (pathname === item.href) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          router.push(item.href);
        }
      },
    })),
    {
      label: isDark ? "Light Mode" : "Dark Mode",
      onClick: () => {
        toggleTheme();
      },
    },
  ];

  return (
    <FloatingMenu
      items={menuItems}
      isDark={isDark}
      onToggleTheme={toggleTheme}
    />
  );
}
