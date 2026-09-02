import Image from "next/image";

import { EventAlbumDialog } from "@/features/landing/components/event-album-dialog";
import type { Album } from "@/features/landing/types/album";
import type { Event } from "@/features/landing/types/event";
import { formatEventDate } from "@/features/landing/utils/format-event-date";

import { buttonVariants } from "@/shared/components/ui/button";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";
import { cn } from "@/shared/utils/cn";

type EventCardProps = {
  event: Event;
  album?: Album;
  isPast?: boolean;
};

export function EventCard({ event, album, isPast }: EventCardProps) {
  const cover = typeof event.cover === "object" ? event.cover : null;

  return (
    <article
      className={cn(
        "border-border flex flex-col overflow-hidden rounded-2xl border",
        isPast && "opacity-80",
      )}
    >
      <div className="bg-muted relative aspect-[16/9]">
        {cover?.url ? (
          <Image
            src={cover.url}
            alt={cover.alt ?? event.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <Heading as="h3" className="text-base">
          {event.title}
        </Heading>

        <Eyebrow className="text-muted-foreground">
          {formatEventDate(event.startsAt)} · {event.location}
        </Eyebrow>

        <Text variant="small" className="text-foreground/70 flex-1">
          {event.description}
        </Text>

        <div className="flex flex-wrap items-center gap-3">
          {event.registrationUrl && !isPast ? (
            <a
              href={event.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "sm" })}
            >
              Registrarme
            </a>
          ) : null}

          {album ? <EventAlbumDialog album={album} /> : null}
        </div>
      </div>
    </article>
  );
}
