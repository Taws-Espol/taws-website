import type { Access } from "payload";

import { anyone } from "./anyone.ts";
import { hasRole } from "./has-role.ts";
import type { Role } from "../types/role.ts";
import { checkRole } from "../utils/check-role.ts";

type CollectionAccessOptions = {
  /** Roles that may create, update and delete. Also what the admin nav shows. */
  managedBy: Role[];
  /** Defaults to public, because the website and the REST API read without a session. */
  read?: Access;
  /** Defaults to the managing roles. Applications override it to accept the public. */
  create?: Access;
};

/**
 * One declaration of who manages a collection, driving both its write rules and
 * whether it appears in the admin nav. Payload lists a collection when the user
 * can read it, and most of these are read by anyone, so without deriving the nav
 * from the write rules every role sees everything it cannot touch.
 *
 * Adding a role to a collection is one string, in one place.
 */
export function collectionAccess({
  managedBy,
  read = anyone,
  create,
}: CollectionAccessOptions) {
  const canManage = hasRole(...managedBy);

  return {
    access: {
      create: create ?? canManage,
      read,
      update: canManage,
      delete: canManage,
    },
    hidden: ({ user }: { user?: unknown }) =>
      !checkRole(managedBy, user as never),
  };
}
