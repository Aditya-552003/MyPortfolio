import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { StructuredData } from "@/components/layout/StructuredData";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { MonitoringProvider } from "@/components/MonitoringProvider";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const title = `${siteConfig.name} — ${siteConfig.tagline}`;
const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: siteConfig.name,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title,
    description: siteConfig.description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.description,
    images: [ogImage.url],
  },
};

export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <ThemeScript />
        <StructuredData />
      </head>
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <MonitoringProvider>
          <AppShell>{children}</AppShell>
        </MonitoringProvider>
      </body>
    </html>
  );
}
