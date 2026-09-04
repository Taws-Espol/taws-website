import { notFound } from "next/navigation";

import { EventCard } from "@/features/landing/components/event-card";
import { getAlbums } from "@/features/landing/queries/get-albums";
import { getEventsByTime } from "@/features/landing/queries/get-events-by-time";
import { indexAlbumsByEvent } from "@/features/landing/utils/index-albums-by-event";

import { Pagination } from "@/shared/components/ui/pagination";
import { Heading } from "@/shared/components/ui/typography";
import { ITEMS_PER_PAGE } from "@/shared/constants/pagination";
import { getAppUrl } from "@/shared/utils/get-app-url";
import { resolvePage } from "@/shared/utils/resolve-page";

type PastEventsProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

/**
 * Paging happens here rather than in the database: the split by time already
 * costs one read of every Event, and slicing what it returns keeps the whole
 * section on that single cached query.
 */
export async function PastEvents({ searchParams }: PastEventsProps) {
  const { page: raw } = await searchParams;
  const [{ past }, albums] = await Promise.all([
    getEventsByTime(),
    getAlbums(),
  ]);

  const resolved = resolvePage({
    raw,
    total: past.length,
    perPage: ITEMS_PER_PAGE,
  });

  if (!resolved) notFound();

  const albumsByEvent = indexAlbumsByEvent(albums);
  const page = past.slice(resolved.offset, resolved.offset + ITEMS_PER_PAGE);

  const canonical = new URL(
    resolved.page === 1 ? "/eventos" : `/eventos?page=${resolved.page}`,
    getAppUrl(),
  ).toString();

  if (past.length === 0) {
    // Still says which URL this is, even with nothing to show.
    return <link rel="canonical" href={canonical} />;
  }

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
