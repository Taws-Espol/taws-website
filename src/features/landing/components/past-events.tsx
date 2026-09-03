import { notFound } from "next/navigation";
import { connection } from "next/server";

import { EventCard } from "@/features/landing/components/event-card";
import { getAlbums } from "@/features/landing/queries/get-albums";
import { getEvents } from "@/features/landing/queries/get-events";
import { indexAlbumsByEvent } from "@/features/landing/utils/index-albums-by-event";
import { splitEventsByTime } from "@/features/landing/utils/split-events-by-time";

import { Pagination } from "@/shared/components/ui/pagination";
import { Heading } from "@/shared/components/ui/typography";
import { ITEMS_PER_PAGE } from "@/shared/constants/pagination";
import { getAppUrl } from "@/shared/utils/get-app-url";
import { resolvePage } from "@/shared/utils/resolve-page";

type PastEventsProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

/**
 * Which Events are past depends on the moment the page is read, so the split
 * happens here rather than in the database. Paging the resulting list keeps
 * the whole thing on one cached query instead of a time-keyed one.
 */
export async function PastEvents({ searchParams }: PastEventsProps) {
  await connection();

  const { page: raw } = await searchParams;
  const [events, albums] = await Promise.all([getEvents(), getAlbums()]);
  const { past } = splitEventsByTime(events, new Date());

  const resolved = resolvePage({
    raw,
    total: past.length,
    perPage: ITEMS_PER_PAGE,
  });

  if (!resolved) notFound();

  if (past.length === 0) return null;

  const albumsByEvent = indexAlbumsByEvent(albums);
  const page = past.slice(resolved.offset, resolved.offset + ITEMS_PER_PAGE);

  const canonical = new URL(
    resolved.page === 1 ? "/eventos" : `/eventos?page=${resolved.page}`,
    getAppUrl(),
  ).toString();

  return (
    <section className="flex flex-col gap-6">
      <link rel="canonical" href={canonical} />

      <Heading as="h2">Eventos pasados</Heading>

      <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {page.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            album={albumsByEvent.get(Number(event.id))}
            isPast
          />
        ))}
      </div>

      <div className="pt-10">
        <Pagination
          basePath="/eventos"
          page={resolved.page}
          totalPages={resolved.totalPages}
          label="Paginación de eventos pasados"
        />
      </div>
    </section>
  );
}
