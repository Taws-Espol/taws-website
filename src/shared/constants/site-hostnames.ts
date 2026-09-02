/**
 * Where this site is served from in production. Anything that has to decide
 * whether a host is really us — analytics, and the CSRF allowlist — reads this
 * rather than repeating the list.
 */
export const SITE_HOSTNAMES = [
  "taws.espol.edu.ec",
  "www.taws.espol.edu.ec",
] as const;
