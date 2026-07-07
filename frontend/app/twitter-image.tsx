import { siteConfig } from "@/config/site";

import { OG_SIZE, generateOgImage } from "./_og/generateOgImage";

export const alt = siteConfig.name;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image(): ReturnType<typeof generateOgImage> {
  return generateOgImage();
}
