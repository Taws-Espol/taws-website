import { SITE_HOSTNAMES } from "@/shared/constants/site-hostnames";

function toOrigin(value: string) {
  try {
    return new URL(value.trim()).origin;
  } catch {
    return null;
  }
}

/**
 * Every origin the admin panel is legitimately reached from, for Payload's CSRF
 * allowlist. A session cookie sent from anywhere else is ignored.
 *
 * It is derived from the environment rather than hard-coded because a preview
 * deployment gets its own URL, and an allowlist that misses it locks whoever is
 * reviewing out of the admin panel. Coolify may also hand over several domains
 * in one comma-separated variable, so every entry counts, not just the first.
 */
export function getTrustedOrigins() {
  const fromEnvironment = [process.env.COOLIFY_URL, process.env.APP_URL]
    .filter((value): value is string => Boolean(value))
    .flatMap((value) => value.split(","));

  const origins = [
    ...fromEnvironment,
    ...SITE_HOSTNAMES.map((hostname) => `https://${hostname}`),
  ]
    .map(toOrigin)
    .filter((origin): origin is string => origin !== null);

  return [...new Set(origins)];
}
