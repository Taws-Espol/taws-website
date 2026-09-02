import type { Project } from "@/features/landing/types/project";

import { Badge } from "@/shared/components/ui/badge";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

export function ProjectCard({ project }: { project: Project }) {
  const href = project.repositoryUrl ?? project.externalUrl;

  return (
    <article className="border-border flex flex-col gap-3 border-t pt-5">
      <div className="flex flex-wrap gap-2">
        {project.areas.map((area) =>
          typeof area === "object" ? (
            <Badge key={area.id} variant="secondary">
              {area.name}
            </Badge>
          ) : null,
        )}
      </div>

      <Heading as="h3" className="text-lg">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:ring-ring rounded-sm underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
          >
            {project.title}
          </a>
        ) : (
          project.title
        )}
      </Heading>

      <Text variant="small" className="text-foreground/70">
        {project.summary}
      </Text>

      {project.year ? (
        <Eyebrow className="text-foreground/50">{project.year}</Eyebrow>
      ) : null}
    </article>
  );
}
