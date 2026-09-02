import Image from "next/image";

import { MemberAvatars } from "@/features/landing/components/member-avatars";
import { ProjectLinks } from "@/features/landing/components/project-links";
import type { Project } from "@/features/landing/types/project";

import { Heading, Text } from "@/shared/components/ui/typography";
import { WorkAreaTag } from "@/shared/components/ui/work-area-tag";

export function ProjectCard({ project }: { project: Project }) {
  const cover = typeof project.cover === "object" ? project.cover : null;

  return (
    <article className="bg-card shadow-soft hover:shadow-lift flex h-full flex-col overflow-hidden rounded-3xl transition-shadow">
      <div className="bg-surface relative aspect-[16/10]">
        {cover?.url ? (
          <Image
            src={cover.url}
            alt={cover.alt ?? project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap gap-1.5">
          {project.areas.map((area) => (
            <WorkAreaTag key={area} value={area} />
          ))}
        </div>

        <Heading as="h3" variant="card">
          {project.title}
        </Heading>

        <Text variant="small" className="text-muted-foreground flex-1">
          {project.summary}
        </Text>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <ProjectLinks project={project} />

          <MemberAvatars members={project.members} />
        </div>
      </div>
    </article>
  );
}
