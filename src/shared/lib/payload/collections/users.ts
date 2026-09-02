import type { CollectionConfig } from "payload";

import { hasRole, hasRoleField } from "../access/has-role.ts";
import { isSelfOrHasRole } from "../access/is-self-or-has-role.ts";
import { ensureFirstUserIsAdmin } from "../utils/ensure-first-user-is-admin.ts";

export const Users: CollectionConfig = {
  slug: "users",
  labels: { singular: "User", plural: "Users" },
  auth: true,
  access: {
    admin: hasRole("admin", "editor", "blogger", "viewer"),
    create: hasRole("admin"),
    delete: hasRole("admin"),
    read: isSelfOrHasRole("admin"),
    unlock: hasRole("admin"),
    update: isSelfOrHasRole("admin"),
  },
  admin: {
    hidden: ({ user }: { user?: unknown }) =>
      (user as { role?: string } | undefined)?.role !== "admin",
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
        create: hasRoleField("admin"),
        read: () => true,
        update: hasRoleField("admin"),
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
          label: "Blogger",
          value: "blogger",
        },
        {
          label: "Viewer",
          value: "viewer",
        },
      ],
    },
  ],
};
