import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ComingSoon } from "@/app/_components/ComingSoon";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage(): ReactNode {
  return (
    <ComingSoon
      eyebrow="Contact"
      title="Get in Touch"
      description="Contact form, résumé download, and social links — arriving in Sprint 2."
    />
  );
}
