import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ResumeButton } from "@/components/layout/ResumeButton";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { ContactForm, SocialLinks } from "@/features/contact";

const description =
  "Get in touch with Aditya — send a message directly, connect on LinkedIn/GitHub, or download the résumé.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage(): ReactNode {
  return (
    <SectionContainer className="grid grid-cols-1 gap-12 py-16 sm:py-24 lg:grid-cols-[2fr_1fr]">
      <div>
        <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
          Get in Touch
        </h1>
        <p className="text-muted mt-3 max-w-lg">
          Have a question about a project, or want to talk about a role? Send a message and
          I&apos;ll get back to you.
        </p>
        <div className="mt-8 max-w-lg">
          <ContactForm />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-primary text-sm font-semibold tracking-wide uppercase">Connect</h2>
          <div className="mt-3">
            <SocialLinks />
          </div>
        </div>
        <div>
          <h2 className="text-primary text-sm font-semibold tracking-wide uppercase">Résumé</h2>
          <div className="mt-3">
            <ResumeButton />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
