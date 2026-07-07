import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export function generateOgImage(): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        backgroundColor: "#050816",
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(14,165,233,0.35), transparent 60%), radial-gradient(circle at 80% 80%, rgba(124,58,237,0.35), transparent 60%)",
      }}
    >
      <div
        style={{
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: "#94a3b8",
        }}
      >
        {siteConfig.tagline}
      </div>
      <div style={{ fontSize: 96, fontWeight: 800, color: "#ffffff" }}>{siteConfig.name}</div>
      <div style={{ fontSize: 32, color: "#94a3b8" }}>{siteConfig.mission}</div>
    </div>,
    { ...OG_SIZE },
  );
}
