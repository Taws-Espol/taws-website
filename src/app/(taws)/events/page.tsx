import { getEvents } from "@/shared/queries/get-events";

export const revalidate = 0;

export default async function EventsPage() {
  const { upcomingEvents, pastEvents } = await getEvents();

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="mb-8 text-4xl font-bold">Eventos</h1>

      {/* Sección Próximos Eventos */}
      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Próximos eventos</h2>
        {upcomingEvents.length === 0 ? (
          <p className="text-muted-foreground">
            No hay eventos próximos programados por el momento.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <article
                key={event.id}
                className="rounded-lg border p-4 shadow-sm"
              >
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {new Date(event.startsAt).toLocaleDateString()} -{" "}
                  {event.location}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Sección Eventos Pasados */}
      {pastEvents.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Eventos pasados</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <article
                key={event.id}
                className="rounded-lg border p-4 opacity-80 shadow-sm"
              >
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">
                  {new Date(event.startsAt).toLocaleDateString()} -{" "}
                  {event.location}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
