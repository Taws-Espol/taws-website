import { ProjectCard } from "@/features/landing/components/project-card";
import { getProjects } from "@/features/landing/queries/get-projects";

import { BuildIllustration } from "@/shared/components/illustrations/build-illustration";
import { PageHeader } from "@/shared/components/page-header";
import { Section } from "@/shared/components/ui/section";
import { Text } from "@/shared/components/ui/typography";

export default async function Page() {
  const projects = await getProjects();

  return (
    <main>
      <PageHeader
        eyebrow="Proyectos"
        title="Lo que hemos construido"
        description="Cada proyecto nace de un miembro con una idea y termina, casi siempre, con el código abierto."
        illustration={<BuildIllustration />}
      />

      <Section>
        {projects.length === 0 ? (
          <Text className="text-muted-foreground">
            Todavía no hay proyectos publicados.
          </Text>
        ) : (
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
