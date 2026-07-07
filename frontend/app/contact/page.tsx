import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ComingSoon } from "@/app/_components/ComingSoon";

const description = "Contact form, résumé download, and social links — arriving in Sprint 2.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage(): ReactNode {
  return <ComingSoon eyebrow="Contact" title="Get in Touch" description={description} />;
}
