import type { getEvents } from "@/features/landing/queries/get-events";

export type Event = Awaited<ReturnType<typeof getEvents>>[number];
