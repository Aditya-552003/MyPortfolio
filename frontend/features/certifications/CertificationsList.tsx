import type { ReactNode } from "react";
import HowItWorks, { type Step } from "@/components/ui/how-it-works";

const certificationSteps: Step[] = [
  {
    title: "1st Prize — Built with Framework Hackathon",
    issuer: "Flutter Kanpur",
    date: "2026",
    badge: "1st Place Winner",
    image: "/achivements/hackathon.jpg",
    description: "",
    colorTheme: "pink",
  },
  {
    title: "IBM Data Science Professional",
    issuer: "IBM & Coursera",
    date: "2025",
    badge: "IBM Certified",
    image: "/achivements/Coursera.jpg",
    description: "",
    colorTheme: "blue",
  },
  {
    title: "Decode Python with DSA",
    issuer: "Physics Wallah",
    date: "2025",
    badge: "DSA Specialist",
    image: "/achivements/PW.png",
    description: "",
    colorTheme: "green",
  },
  {
    title: "Machine Learning Master Class",
    issuer: "Tutedude",
    date: "2025",
    badge: "ML Certified",
    image: "/achivements/tutedude.jpg",
    description: "",
    colorTheme: "purple",
  },
];

export function CertificationsList({ className }: { className?: string } = {}): ReactNode {
  return (
    <div className={className}>
      <HowItWorks features={certificationSteps} />
    </div>
  );
}
