import type { getAlbums } from "@/features/landing/queries/get-albums";

export type Album = Awaited<ReturnType<typeof getAlbums>>[number];
