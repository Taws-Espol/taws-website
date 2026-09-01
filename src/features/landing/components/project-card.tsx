import type { Project } from "@/features/landing/types/project";
import { getWorkAreaLabel } from "@/features/landing/utils/get-work-area-label";
import { Badge } from "@/shared/components/ui/badge";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

export function ProjectCard({ project }: { project: Project }) {
  const href = project.repositoryUrl ?? project.externalUrl;

  return (
    <article className="border-border flex flex-col gap-3 border-t pt-5">
      <div className="flex flex-wrap gap-2">
        {project.areas.map((area) => (
          <Badge key={area} variant="secondary">
            {getWorkAreaLabel(area)}
          </Badge>
        ))}
      </div>

      <Heading as="h3" className="text-lg">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-secondary focus-visible:ring-ring rounded-sm transition-colors focus-visible:ring-2 focus-visible:outline-none"
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
