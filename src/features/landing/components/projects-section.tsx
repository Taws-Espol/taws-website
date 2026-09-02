import Link from "next/link";

import { FeaturedProjectCard } from "@/features/landing/components/featured-project-card";
import { ProjectCard } from "@/features/landing/components/project-card";
import { getProjects } from "@/features/landing/queries/get-projects";
import { selectFeaturedProjects } from "@/features/landing/utils/select-featured-projects";

import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading } from "@/shared/components/ui/typography";

export async function ProjectsSection() {
  const projects = await getProjects();
  const { featured, supporting } = selectFeaturedProjects(projects);

  if (!featured) return null;

  return (
    <Section>
      <div className="flex flex-col gap-10">
        <div className="flex items-end justify-between gap-6">
          <Heading as="h2">Proyectos</Heading>

          <Link
            href="/projects"
            className="text-foreground/60 hover:text-foreground focus-visible:ring-ring rounded-sm underline-offset-4 transition-colors hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            <Eyebrow>Ver todos</Eyebrow>
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          <FeaturedProjectCard project={featured} />

          <div className="flex flex-col gap-6">
            {supporting.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
