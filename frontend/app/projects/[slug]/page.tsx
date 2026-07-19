import { CheckCircle2, Rocket } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ProjectStructuredData } from "@/components/layout/ProjectStructuredData";
import { Reveal } from "@/components/ui/Reveal";
import { SectionContainer } from "@/components/ui/SectionContainer";
import { siteConfig } from "@/config/site";
import { projects } from "@/content/projects";
import {
  ApiEndpointsList,
  ArchitectureDiagram,
  ChallengesList,
  FolderTree,
  IconList,
  LessonsList,
  MetricsPanel,
  ProjectHero,
  ScreenshotGallery,
  TechStackGrid,
} from "@/features/projects";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): Array<{ slug: string }> {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.tagline,
      url: `${siteConfig.url}/projects/${slug}`,
      type: "article",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.tagline,
      images: ["/opengraph-image"],
    },
  };
}

function DetailSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}): ReactNode {
  return (
    <section aria-labelledby={id}>
      <Reveal>
        <h2 id={id} className="text-foreground text-2xl font-bold tracking-tight">
          {title}
        </h2>
        <div className="mt-4">{children}</div>
      </Reveal>
    </section>
  );
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps): Promise<ReactNode> {
  const { slug } = await params;
  const project = projects.find((candidate) => candidate.slug === slug);

  if (!project) notFound();

  return (
    <SectionContainer className="flex flex-col gap-12 py-16 sm:py-24">
      <ProjectStructuredData project={project} />
      <ProjectHero project={project} />

      <DetailSection id="overview-heading" title="Overview">
        <p className="text-muted max-w-3xl">{project.overview}</p>
      </DetailSection>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <DetailSection id="problem-heading" title="Problem">
          <p className="text-muted">{project.problem}</p>
        </DetailSection>
        <DetailSection id="solution-heading" title="Solution">
          <p className="text-muted">{project.solution}</p>
        </DetailSection>
      </div>

      <DetailSection id="features-heading" title="Features">
        <IconList items={project.features} icon={CheckCircle2} iconClassName="text-accent" />
      </DetailSection>

      <DetailSection id="architecture-heading" title="Architecture">
        <ArchitectureDiagram steps={project.architecture} />
      </DetailSection>

      <DetailSection id="tech-stack-heading" title="Technology stack">
        <TechStackGrid groups={project.techStack} />
      </DetailSection>

      <DetailSection id="folder-structure-heading" title="Folder structure">
        <FolderTree structure={project.folderStructure} />
      </DetailSection>

      {project.modelInfo ? (
        <DetailSection id="model-heading" title="Model">
          <p className="text-muted max-w-3xl">{project.modelInfo}</p>
        </DetailSection>
      ) : null}

      {project.metrics || project.confusionMatrix ? (
        <DetailSection id="metrics-heading" title="Performance metrics">
          <MetricsPanel metrics={project.metrics} confusionMatrix={project.confusionMatrix} />
        </DetailSection>
      ) : null}

      <DetailSection id="screenshots-heading" title="Screenshots">
        <ScreenshotGallery projectTitle={project.title} />
      </DetailSection>

      {project.apiEndpoints ? (
        <DetailSection id="api-heading" title="API documentation">
          <ApiEndpointsList endpoints={project.apiEndpoints} />
        </DetailSection>
      ) : null}

      <DetailSection id="challenges-heading" title="Challenges">
        <ChallengesList challenges={project.challenges} />
      </DetailSection>

      <DetailSection id="future-heading" title="Future improvements">
        <IconList items={project.futureImprovements} icon={Rocket} iconClassName="text-secondary" />
      </DetailSection>

      <DetailSection id="lessons-heading" title="Lessons learned">
        <LessonsList lessons={project.lessonsLearned} />
      </DetailSection>
    </SectionContainer>
  );
}
