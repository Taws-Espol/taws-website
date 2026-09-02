import { SITE_HOSTNAMES } from "@/shared/constants/site-hostnames";
import { getAppUrl } from "@/shared/utils/get-app-url";

export const UMAMI_TRACKED_DOMAINS = SITE_HOSTNAMES.join(",");

export function isUmamiTrackingEnabled() {
  return SITE_HOSTNAMES.includes(
    getAppUrl().hostname as (typeof SITE_HOSTNAMES)[number],
  );
}
