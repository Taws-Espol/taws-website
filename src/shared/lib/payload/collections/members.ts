import type { CollectionConfig } from "payload";

import { MEMBERS_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

import { getMajorPayloadOptions } from "../../../../features/members/constants/majors.ts";

export const Members: CollectionConfig = {
  slug: "members",
  labels: { singular: "Member", plural: "Members" },
  access: {
    create: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    group: "Members",
    defaultColumns: ["fullName", "status", "major", "position", "order"],
    useAsTitle: "fullName",
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "major",
      type: "select",
      options: getMajorPayloadOptions(),
    },
    {
      name: "position",
      type: "text",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Alumni", value: "alumni" },
      ],
    },
    {
      name: "joinedAt",
      type: "date",
    },
    {
      name: "githubUrl",
      type: "text",
    },
    {
      name: "linkedinUrl",
      type: "text",
    },
    {
      name: "order",
      type: "number",
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "members", tag: MEMBERS_TAG });
      },
    ],
    afterDelete: [
      async ({ req }) => {
        await revalidateCache({ req, source: "members", tag: MEMBERS_TAG });
      },
    ],
  },
};
