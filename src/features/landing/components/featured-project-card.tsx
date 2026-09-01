import Image from "next/image";

import type { Project } from "@/features/landing/types/project";
import { getWorkAreaLabel } from "@/features/landing/utils/get-work-area-label";
import { Badge } from "@/shared/components/ui/badge";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

export function FeaturedProjectCard({ project }: { project: Project }) {
  const href = project.repositoryUrl ?? project.externalUrl;
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
          <Badge key={area}>{getWorkAreaLabel(area)}</Badge>
        ))}
      </div>

      <Heading as="h3">
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

      <Text className="text-foreground/70 max-w-[60ch]">{project.summary}</Text>

      {project.year ? (
        <Eyebrow className="text-foreground/50">{project.year}</Eyebrow>
      ) : null}
    </article>
  );
}
