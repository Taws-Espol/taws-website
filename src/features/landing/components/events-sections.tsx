import { connection } from "next/server";

import { EventCard } from "@/features/landing/components/event-card";
import { getAlbums } from "@/features/landing/queries/get-albums";
import { getEvents } from "@/features/landing/queries/get-events";
import { indexAlbumsByEvent } from "@/features/landing/utils/index-albums-by-event";
import { splitEventsByTime } from "@/features/landing/utils/split-events-by-time";
import { Heading, Text } from "@/shared/components/ui/typography";

export async function EventsSections() {
  await connection();

  const [events, albums] = await Promise.all([getEvents(), getAlbums()]);

  const { upcoming, past } = splitEventsByTime(events, new Date());
  const albumsByEvent = indexAlbumsByEvent(albums);

  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-6">
        <Heading as="h2">Próximos eventos</Heading>

        {upcoming.length === 0 ? (
          <Text className="text-foreground/60">
            No hay eventos próximos programados por el momento.
          </Text>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {past.length > 0 ? (
        <section className="flex flex-col gap-6">
          <Heading as="h2">Eventos pasados</Heading>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                album={albumsByEvent.get(Number(event.id))}
                isPast
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
