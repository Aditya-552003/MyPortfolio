"use client";

import type { ReactNode } from "react";
import { CircularTestimonials } from "@/components/ui/circular-testimonials";
import { projects } from "@/content/projects";
import { useTheme } from "@/lib/hooks/useTheme";

const projectImages: Record<string, string> = {
  emosens: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  "chat-with-code": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  "smart-shortlist": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
};

import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function ProjectsPreview(): ReactNode {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const testimonials = projects.map((p) => ({
    name: p.title,
    designation: `${p.categories.join(" • ")} — ${p.tagline}`,
    quote: p.overview,
    src: projectImages[p.slug] ?? "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  }));

  return (
    <div className="w-full flex justify-center py-4">
      <CircularTestimonials
        testimonials={testimonials}
        autoplay={true}
        colors={{
          name: isDark ? "#EDE8D0" : "#181818",
          designation: isDark ? "#A3A3A3" : "#525252",
          testimony: "var(--foreground)",
          arrowBackground: isDark ? "#EDE8D0" : "#181818",
          arrowForeground: isDark ? "#181818" : "#EDE8D0",
          arrowHoverBackground: isDark ? "#181818" : "#EDE8D0",
        }}
        fontSizes={{
          name: "2rem",
          designation: "1.05rem",
          quote: "1.1rem",
        }}
      />
    </div>
  );
}
