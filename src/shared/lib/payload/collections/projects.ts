import type { CollectionConfig } from "payload";

import { PROJECTS_TAG } from "../../../constants/cache-tags.ts";
import { getWorkAreaPayloadOptions } from "../../../constants/work-areas.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { collectionAccess } from "../access/collection-access.ts";

const { access, hidden } = collectionAccess({ managedBy: ["admin", "editor"] });

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Project", plural: "Projects" },
  access,
  admin: {
    hidden,
    group: "Content",
    defaultColumns: ["title", "status", "featured", "year"],
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
      admin: {
        description: "Two or three lines. This is what the card shows.",
      },
    },
    {
      name: "areas",
      type: "select",
      hasMany: true,
      required: true,
      options: getWorkAreaPayloadOptions(),
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Completed", value: "completed" },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "The large card at the top of the projects section. Only the most recent featured project is shown.",
      },
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "year",
      type: "number",
    },
    {
      name: "repositoryUrl",
      type: "text",
    },
    {
      name: "externalUrl",
      type: "text",
    },
    {
      name: "members",
      type: "relationship",
      relationTo: "members",
      hasMany: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "projects", tag: PROJECTS_TAG });
      },
    ],
    afterDelete: [
      async ({ req }) => {
        await revalidateCache({ req, source: "projects", tag: PROJECTS_TAG });
      },
    ],
  },
};
