import { checkRole } from "./check-role.ts";

/**
 * Payload lists a collection in the nav when the user can read it, and almost
 * everything here is publicly readable so the website can fetch it. Without
 * this, a blogger sees every collection they cannot edit.
 */
export const hideUnlessAdminOrEditor = ({ user }: { user?: unknown }) =>
  !checkRole(["admin", "editor"], user as never);
