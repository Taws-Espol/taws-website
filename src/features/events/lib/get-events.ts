import { getPayload } from "payload";
import config from "@payload-config";

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: unknown;
  startsAt: string;
  endsAt?: string;
  location: string;
  cover: unknown;
  registrationUrl?: string;
}

export async function getEvents() {
  const payload = await getPayload({ config });

  const response = await payload.find({
    collection: "events",
    sort: "startsAt",
    limit: 100,
    overrideAccess: true,
  });

  const docs = response.docs as unknown as Event[];
  const now = new Date();

  const upcomingEvents = docs.filter(
    (event) => new Date(event.startsAt) >= now,
  );

  const pastEvents = docs
    .filter((event) => new Date(event.startsAt) < now)
    .reverse();

  return {
    upcomingEvents,
    pastEvents,
  };
}
