import type { CollectionConfig } from "payload";

import { getMajorPayloadOptions } from "../../../utils/get-major-payload-options.ts";
import { anyone } from "../access/anyone.ts";
import { collectionAccess } from "../access/collection-access.ts";
import { hasRole, hasRoleField } from "../access/has-role.ts";

/**
 * The only public write on the site, and the only collection holding personal
 * data. Anyone may create; nobody may read without being an admin or editor.
 */
const { access, hidden } = collectionAccess({
  managedBy: ["admin", "editor"],
  read: hasRole("admin", "editor"),
  create: anyone,
});

export const Applications: CollectionConfig = {
  slug: "applications",
  labels: { singular: "Application", plural: "Applications" },
  access,
  admin: {
    hidden,
    group: "Recruitment",
    defaultColumns: ["fullName", "email", "major", "status", "createdAt"],
    useAsTitle: "fullName",
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "major",
      type: "select",
      required: true,
      options: getMajorPayloadOptions(),
    },
    {
      name: "interests",
      type: "relationship",
      relationTo: "work-areas",
      hasMany: true,
      required: true,
    },
    {
      name: "message",
      type: "textarea",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      access: {
        create: () => false,
        update: hasRoleField("admin", "editor"),
      },
      options: [
        { label: "Pending", value: "pending" },
        { label: "Accepted", value: "accepted" },
        { label: "Rejected", value: "rejected" },
      ],
    },
  ],
};
