import { MemberAvatars } from "@/features/landing/components/member-avatars";
import { ProjectLinks } from "@/features/landing/components/project-links";
import type { Project } from "@/features/landing/types/project";
import { getWorkAreaLabel } from "@/features/landing/utils/get-work-area-label";

import { Badge } from "@/shared/components/ui/badge";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

export function ProjectCard({ project }: { project: Project }) {
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
        {project.title}
      </Heading>

      <Text variant="small" className="text-foreground/70">
        {project.summary}
      </Text>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <ProjectLinks project={project} />

        <MemberAvatars members={project.members} />
      </div>

      {project.year ? (
        <Eyebrow className="text-muted-foreground">{project.year}</Eyebrow>
      ) : null}
    </article>
  );
}
