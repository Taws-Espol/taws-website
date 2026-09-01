import type { CollectionConfig } from "payload";

import { getWorkAreaPayloadOptions } from "../../../../features/landing/constants/work-areas.ts";
import { getMajorPayloadOptions } from "../../../utils/get-major-payload-options.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";
import { isAdminOrEditorFieldAccess } from "../utils/is-admin-or-editor-field-access.ts";

/**
 * The only public write on the site, and the only collection holding personal
 * data. Anyone may create; nobody may read without being an admin or editor.
 */
export const Applications: CollectionConfig = {
  slug: "applications",
  labels: { singular: "Application", plural: "Applications" },
  access: {
    create: () => true,
    read: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
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
      type: "select",
      hasMany: true,
      required: true,
      options: getWorkAreaPayloadOptions(),
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
        update: isAdminOrEditorFieldAccess,
      },
      options: [
        { label: "Pending", value: "pending" },
        { label: "Accepted", value: "accepted" },
        { label: "Rejected", value: "rejected" },
      ],
    },
  ],
};
