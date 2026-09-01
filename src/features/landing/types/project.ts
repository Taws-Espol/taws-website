import type { getProjects } from "@/features/landing/queries/get-projects";

export type Project = Awaited<ReturnType<typeof getProjects>>[number];
