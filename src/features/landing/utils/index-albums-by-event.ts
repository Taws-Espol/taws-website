import type { Album } from "@/features/landing/types/album";

export function indexAlbumsByEvent(albums: Album[]) {
  const byEvent = new Map<number, Album>();

  for (const album of albums) {
    const eventId =
      typeof album.event === "object" ? album.event?.id : album.event;

    if (typeof eventId === "number") byEvent.set(eventId, album);
  }

  return byEvent;
}
