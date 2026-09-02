import Image from "next/image";

import { MemberAvatars } from "@/features/landing/components/member-avatars";
import { ProjectLinks } from "@/features/landing/components/project-links";
import { WorkAreaMark } from "@/features/landing/components/work-area-mark";
import type { Project } from "@/features/landing/types/project";

import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

export function FeaturedProjectCard({ project }: { project: Project }) {
  const cover = typeof project.cover === "object" ? project.cover : null;

  return (
    <article className="flex flex-col gap-5">
      <div className="bg-primary/5 relative aspect-[16/10] overflow-hidden rounded-3xl">
        {cover?.url ? (
          <Image
            src={cover.url}
            alt={cover.alt ?? project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        {project.areas.map((area) => (
          <WorkAreaMark key={area} value={area} />
        ))}
      </div>

      <Heading as="h3">{project.title}</Heading>

      <Text className="text-foreground/70 max-w-[60ch]">{project.summary}</Text>

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
