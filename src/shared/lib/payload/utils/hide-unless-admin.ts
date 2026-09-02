import { checkRole } from "./check-role.ts";

export const hideUnlessAdmin = ({ user }: { user?: unknown }) =>
  !checkRole(["admin"], user as never);
