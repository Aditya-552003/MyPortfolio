import { Mail } from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";

import { SectionContainer } from "@/components/ui/SectionContainer";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons/BrandIcons";
import { siteConfig, socialLinks } from "@/config/site";

const SOCIAL_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  Email: Mail,
  LinkedIn: LinkedinIcon,
  GitHub: GithubIcon,
};

export function Footer(): ReactNode {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t">
      <SectionContainer className="flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-muted text-sm">
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          {socialLinks.map((link) => {
            const Icon = SOCIAL_ICONS[link.label];
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="text-muted hover:bg-surface hover:text-foreground inline-flex size-9 items-center justify-center rounded-full transition-colors duration-[var(--duration-fast)]"
              >
                {Icon ? <Icon className="size-4" aria-hidden /> : link.label}
              </a>
            );
          })}
        </div>
      </SectionContainer>
    </footer>
  );
}
