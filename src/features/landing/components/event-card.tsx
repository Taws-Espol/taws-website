import { Calendar03Icon, Location01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

import { EventAlbumDialog } from "@/features/landing/components/event-album-dialog";
import type { Album } from "@/features/landing/types/album";
import type { Event } from "@/features/landing/types/event";
import { formatEventDate } from "@/features/landing/utils/format-event-date";

import { buttonVariants } from "@/shared/components/ui/button";
import { Heading, Text } from "@/shared/components/ui/typography";

type EventCardProps = {
  event: Event;
  album?: Album;
  isPast?: boolean;
};

export function EventCard({ event, album, isPast }: EventCardProps) {
  const cover = typeof event.cover === "object" ? event.cover : null;

  return (
    <article className="flex h-full flex-col gap-4">
      <div className="bg-surface relative aspect-[16/9] overflow-hidden rounded-3xl">
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

      <div className="flex flex-1 flex-col gap-2.5">
        <Heading as="h3" variant="card">
          {event.title}
        </Heading>

        <div className="text-muted-foreground flex flex-col gap-1.5 text-sm">
          <span className="inline-flex items-center gap-2">
            <HugeiconsIcon
              icon={Calendar03Icon}
              aria-hidden="true"
              className="text-primary size-4"
            />
            {formatEventDate(event.startsAt)}
          </span>

          <span className="inline-flex items-center gap-2">
            <HugeiconsIcon
              icon={Location01Icon}
              aria-hidden="true"
              className="text-primary size-4"
            />
            {event.location}
          </span>
        </div>

        <Text variant="small" className="text-muted-foreground flex-1">
          {event.description}
        </Text>

        <div className="flex flex-wrap items-center gap-2 pt-2">
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
