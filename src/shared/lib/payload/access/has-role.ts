import type { PayloadRequest } from "payload";

import type { Role } from "../types/role.ts";
import { checkRole } from "../utils/check-role.ts";

/** Returns a boolean, so it fits both access rules and the admin gate. */
export const hasRole =
  (...roles: Role[]) =>
  ({ req: { user } }: { req: PayloadRequest }) =>
    checkRole(roles, user);

export const hasRoleField =
  (...roles: Role[]) =>
  ({ req: { user } }: { req: PayloadRequest }) =>
    checkRole(roles, user);
