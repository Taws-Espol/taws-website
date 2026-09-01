const WINDOW_MS = 60 * 60 * 1000;
const MAX_SUBMISSIONS = 3;

/**
 * Per-instance and in-memory, so it thins out casual flooding rather than
 * guaranteeing a global limit. Move it to a shared store if the site ever runs
 * more than one instance.
 */
const submissions = new Map<string, number[]>();

export function consumeRateLimit(key: string, now: number) {
  const recent = (submissions.get(key) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  if (recent.length >= MAX_SUBMISSIONS) {
    submissions.set(key, recent);

    return false;
  }

  submissions.set(key, [...recent, now]);

  return true;
}
