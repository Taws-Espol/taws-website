import type { Access } from "payload";

import { anyone } from "./anyone.ts";
import { hasRole } from "./has-role.ts";
import type { Role } from "../types/role.ts";
import { checkRole } from "../utils/check-role.ts";

/** The global counterpart of collectionAccess: globals have no create or delete. */
export function globalAccess({
  managedBy,
  read = anyone,
}: {
  managedBy: Role[];
  read?: Access;
}) {
  return {
    access: { read, update: hasRole(...managedBy) },
    hidden: ({ user }: { user?: unknown }) =>
      !checkRole(managedBy, user as never),
  };
}
