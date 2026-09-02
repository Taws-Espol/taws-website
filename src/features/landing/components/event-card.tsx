import { EventAlbumDialog } from "@/features/landing/components/event-album-dialog";
import type { Album } from "@/features/landing/types/album";
import type { Event } from "@/features/landing/types/event";
import { formatEventDate } from "@/features/landing/utils/format-event-date";

import { Eyebrow, Heading } from "@/shared/components/ui/typography";
import { cn } from "@/shared/utils/cn";

type EventCardProps = {
  event: Event;
  album?: Album;
  isPast?: boolean;
};

export function EventCard({ event, album, isPast }: EventCardProps) {
  return (
    <article
      className={cn(
        "border-border flex flex-col gap-2 rounded-2xl border p-5",
        isPast && "opacity-80",
      )}
    >
      <Heading as="h3" className="text-base">
        {event.title}
      </Heading>

      <Eyebrow className="text-foreground/50">
        {formatEventDate(event.startsAt)} · {event.location}
      </Eyebrow>

      {album ? <EventAlbumDialog album={album} /> : null}
    </article>
  );
}
