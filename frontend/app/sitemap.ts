import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { projects } from "@/content/projects";

const STATIC_ROUTES = [
  "",
  "/about",
  "/skills",
  "/projects",
  "/playground",
  "/experience",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...projectEntries];
}
