import { Mail } from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";

import { GithubIcon, LinkedinIcon } from "@/components/ui/icons/BrandIcons";
import { socialLinks } from "@/config/site";

const SOCIAL_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Email: Mail,
  LinkedIn: LinkedinIcon,
  GitHub: GithubIcon,
};

export function SocialLinks(): ReactNode {
  return (
    <ul className="flex flex-col gap-3">
      {socialLinks.map((link) => {
        const Icon = SOCIAL_ICONS[link.label];
        return (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="border-border bg-surface text-foreground hover:bg-border/40 flex items-center gap-3 rounded-[var(--radius-md)] border px-4 py-3 text-sm font-medium transition-colors duration-[var(--duration-fast)]"
            >
              {Icon ? <Icon className="text-primary size-5" aria-hidden /> : null}
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
