import { connection } from "next/server";

import { EventCard } from "@/features/landing/components/event-card";
import { getEvents } from "@/features/landing/queries/get-events";
import { splitEventsByTime } from "@/features/landing/utils/split-events-by-time";

import { Heading, Text } from "@/shared/components/ui/typography";

/** Never paginated: there are rarely many at once, and they are the reason
 *  most people opened the page. */
export async function UpcomingEvents() {
  await connection();

  const events = await getEvents();
  const { upcoming } = splitEventsByTime(events, new Date());

  return (
    <section className="flex flex-col gap-6">
      <Heading as="h2">Próximos eventos</Heading>

      {upcoming.length === 0 ? (
        <Text className="text-muted-foreground">
          No hay eventos próximos programados por el momento.
        </Text>
      ) : (
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </section>
  );
}
