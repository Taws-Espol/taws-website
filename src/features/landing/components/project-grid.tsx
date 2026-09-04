import { notFound } from "next/navigation";

import { ProjectCard } from "@/features/landing/components/project-card";
import { countProjects } from "@/features/landing/queries/count-projects";
import { getProjectsPage } from "@/features/landing/queries/get-projects-page";

import { Pagination } from "@/shared/components/ui/pagination";
import { Text } from "@/shared/components/ui/typography";
import { ITEMS_PER_PAGE } from "@/shared/constants/pagination";
import { getAppUrl } from "@/shared/utils/get-app-url";
import { resolvePage } from "@/shared/utils/resolve-page";

type ProjectGridProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export async function ProjectGrid({ searchParams }: ProjectGridProps) {
  const { page: raw } = await searchParams;
  const total = await countProjects();
  const resolved = resolvePage({ raw, total, perPage: ITEMS_PER_PAGE });

  if (!resolved) notFound();

  const projects = await getProjectsPage({
    offset: resolved.offset,
    limit: ITEMS_PER_PAGE,
  });

  const canonical = new URL(
    resolved.page === 1 ? "/proyectos" : `/proyectos?page=${resolved.page}`,
    getAppUrl(),
  ).toString();

  // Emitted before the empty state, not after: a section with nothing in it
  // still needs to say which URL it is.
  if (projects.length === 0) {
    return (
      <>
        <link rel="canonical" href={canonical} />
        <Text className="text-muted-foreground">
          Todavía no hay proyectos publicados.
        </Text>
      </>
    );
  }

  return (
    <div className="flex flex-col gap-16">
      <link rel="canonical" href={canonical} />

      <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <Pagination
        basePath="/proyectos"
        page={resolved.page}
        totalPages={resolved.totalPages}
        label="Paginación de proyectos"
      />
    </div>
  );
}
