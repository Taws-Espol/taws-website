import Link from "next/link";

import { FeaturedProjectCard } from "@/features/landing/components/featured-project-card";
import { ProjectCard } from "@/features/landing/components/project-card";
import { getProjects } from "@/features/landing/queries/get-projects";
import { selectFeaturedProjects } from "@/features/landing/utils/select-featured-projects";

import { buttonVariants } from "@/shared/components/ui/button";
import { Section } from "@/shared/components/ui/section";
import { SectionHeader } from "@/shared/components/ui/section-header";

export async function ProjectsSection() {
  const projects = await getProjects();
  const { featured, supporting } = selectFeaturedProjects(projects);

  if (!featured) return null;

  return (
    <Section>
      <div className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="Proyectos"
          title="Lo que hemos construido"
          description="Trabajo de miembros del club, casi siempre con el código abierto."
          action={
            <Link
              href="/proyectos"
              className={buttonVariants({ variant: "secondary" })}
            >
              Ver todos
            </Link>
          }
        />

        <FeaturedProjectCard project={featured} />

        <div className="grid gap-x-8 gap-y-12 md:grid-cols-3">
          {supporting.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </Section>
  );
}
