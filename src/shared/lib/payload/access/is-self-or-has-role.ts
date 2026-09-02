import type { Access } from "payload";

import type { Role } from "../types/role.ts";
import { checkRole } from "../utils/check-role.ts";

/** A user always reaches their own record, whatever their role. */
export const isSelfOrHasRole =
  (...roles: Role[]): Access =>
  ({ req: { user } }) => {
    if (!user) return false;
    if (checkRole(roles, user)) return true;

    return { id: { equals: user.id } };
  };
