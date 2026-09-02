import { ProjectCard } from "@/features/landing/components/project-card";
import { getProjects } from "@/features/landing/queries/get-projects";

import { Section } from "@/shared/components/ui/section";
import { Heading, Text } from "@/shared/components/ui/typography";

export default async function Page() {
  const projects = await getProjects();

  return (
    <Section as="main">
      <div className="flex flex-col gap-10">
        <Heading as="h1" variant="display">
          Proyectos
        </Heading>

        {projects.length === 0 ? (
          <Text className="text-foreground/60">
            Todavía no hay proyectos publicados.
          </Text>
        ) : (
          <div className="grid gap-x-10 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
