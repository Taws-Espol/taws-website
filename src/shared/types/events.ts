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
