import Image from "next/image";

import { MemberAvatars } from "@/features/landing/components/member-avatars";
import { ProjectLinks } from "@/features/landing/components/project-links";
import type { Project } from "@/features/landing/types/project";

import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";
import { WorkAreaTag } from "@/shared/components/ui/work-area-tag";

export function FeaturedProjectCard({ project }: { project: Project }) {
  const cover = typeof project.cover === "object" ? project.cover : null;

  return (
    <article className="bg-card shadow-lift grid overflow-hidden rounded-[2rem] md:grid-cols-2">
      <div className="bg-surface relative aspect-[16/10] md:aspect-auto md:min-h-[22rem]">
        {cover?.url ? (
          <Image
            src={cover.url}
            alt={cover.alt ?? project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}

        <span className="bg-brand-accent text-brand-accent-foreground absolute top-5 left-5 rounded-full px-3 py-1">
          <Eyebrow>Destacado</Eyebrow>
        </span>
      </div>

      <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
        <div className="flex flex-wrap gap-1.5">
          {project.areas.map((area) => (
            <WorkAreaTag key={area} value={area} />
          ))}
        </div>

        <Heading as="h3">{project.title}</Heading>

        <Text className="text-muted-foreground">{project.summary}</Text>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <ProjectLinks project={project} />

          <MemberAvatars members={project.members} />
        </div>
      </div>
    </article>
  );
}
