import { EventAlbumDialog } from "@/features/landing/components/event-album-dialog";
import { getAlbums } from "@/features/landing/queries/get-albums";
import { indexAlbumsByEvent } from "@/features/landing/utils/index-albums-by-event";
import { Section } from "@/shared/components/ui/section";
import { Heading, Text } from "@/shared/components/ui/typography";
import { getEvents } from "@/features/landing/queries/get-events";

export default async function EventsPage() {
  const [{ upcomingEvents, pastEvents }, albums] = await Promise.all([
    getEvents(),
    getAlbums(),
  ]);

  const albumsByEvent = indexAlbumsByEvent(albums);

  return (
    <Section as="main">
      <div className="flex flex-col gap-8">
        <Heading as="h1" variant="display">
          Eventos
        </Heading>

        {/* Sección Próximos Eventos */}
        <section className="flex flex-col gap-4">
          <Heading as="h2">Próximos eventos</Heading>
          {upcomingEvents.length === 0 ? (
            <Text>No hay eventos próximos programados por el momento.</Text>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <article
                  key={event.id}
                  className="rounded-lg border p-4 shadow-sm"
                >
                  <Heading as="h3">{event.title}</Heading>
                  <Text className="mt-1 text-sm">
                    {new Date(event.startsAt).toLocaleDateString()} -{" "}
                    {event.location}
                  </Text>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Sección Eventos Pasados */}
        {pastEvents.length > 0 && (
          <section className="flex flex-col gap-4">
            <Heading as="h2">Eventos pasados</Heading>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event) => {
                const album = albumsByEvent.get(Number(event.id));

                return (
                  <article
                    key={event.id}
                    className="flex flex-col gap-1 rounded-lg border p-4 opacity-80 shadow-sm"
                  >
                    <Heading as="h3">{event.title}</Heading>
                    <Text className="text-sm">
                      {new Date(event.startsAt).toLocaleDateString()} -{" "}
                      {event.location}
                    </Text>
                    {album ? <EventAlbumDialog album={album} /> : null}
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </Section>
  );
}
