import type { Album } from "@/features/landing/types/album";

export function getAlbumImage(entry: Album["images"][number] | undefined) {
  const image = typeof entry?.image === "object" ? entry.image : null;

  return {
    url: image?.url ?? null,
    alt: image?.alt ?? entry?.caption ?? "",
    caption: entry?.caption ?? null,
  };
}
