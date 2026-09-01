import type { getActiveMembers } from "@/features/landing/queries/get-active-members";

export type Member = Awaited<ReturnType<typeof getActiveMembers>>[number];
