import { MemberAvatars } from "@/features/landing/components/member-avatars";
import { ProjectLinks } from "@/features/landing/components/project-links";
import { WorkAreaMark } from "@/features/landing/components/work-area-mark";
import type { Project } from "@/features/landing/types/project";

import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-border flex flex-col gap-3 border-t pt-5">
      <div className="flex flex-wrap gap-2">
        {project.areas.map((area) => (
          <WorkAreaMark key={area} value={area} />
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
