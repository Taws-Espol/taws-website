import type { CollectionConfig } from "payload";

import { checkRole } from "../utils/check-role.ts";
import { ensureFirstUserIsAdmin } from "../utils/ensure-first-user-is-admin.ts";
import { isAdminFieldAccess } from "../utils/is-admin-field-access.ts";
import { isAdminOrSelf } from "../utils/is-admin-or-self.ts";
import { isAdmin } from "../utils/is-admin.ts";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "User", plural: "Users" },
  auth: true,
  access: {
    admin: ({ req: { user } }) =>
      checkRole(["admin", "editor", "viewer"], user),
    create: isAdmin,
    delete: isAdmin,
    read: isAdminOrSelf,
    unlock: isAdmin,
    update: isAdminOrSelf,
  },
  admin: {
    group: "Users",
    defaultColumns: ["name", "email", "role", "createdAt", "updatedAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      access: {
        create: isAdminFieldAccess,
        read: () => true,
        update: isAdminFieldAccess,
      },
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Editor",
          value: "editor",
        },
        {
          label: "Viewer",
          value: "viewer",
        },
      ],
    },
  ],
};
