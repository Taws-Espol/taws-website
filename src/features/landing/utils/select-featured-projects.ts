import type { Project } from "@/features/landing/types/project";

const SUPPORTING_COUNT = 3;

export function selectFeaturedProjects(projects: Project[]) {
  const featured = projects.find((project) => project.featured) ?? projects[0];

  const supporting = projects
    .filter((project) => project.id !== featured?.id)
    .slice(0, SUPPORTING_COUNT);

  return { featured, supporting };
}
