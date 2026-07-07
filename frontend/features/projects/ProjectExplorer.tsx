"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { projects } from "@/content/projects";

import { CategoryFilter, type CategoryFilterValue } from "./CategoryFilter";
import { ProjectCard } from "./ProjectCard";

export function ProjectExplorer(): ReactNode {
  const [category, setCategory] = useState<CategoryFilterValue>("All");
  const prefersReducedMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      category === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(category)),
    [category],
  );

  const transition = prefersReducedMotion ? { duration: 0 } : { duration: 0.2 };

  return (
    <div className="flex flex-col gap-8">
      <h2 className="sr-only">Projects</h2>
      <CategoryFilter value={category} onChange={setCategory} />

      {filtered.length === 0 ? (
        <p className="text-muted text-sm">No projects tagged &ldquo;{category}&rdquo; yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.96 }}
                transition={transition}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
