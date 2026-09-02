import type { CollectionConfig } from "payload";

import { WORK_AREAS_TAG } from "../../../constants/cache-tags.ts";
import { WORK_AREA_ICON_OPTIONS } from "../../../constants/work-area-icons.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { hideUnlessAdminOrEditor } from "../utils/hide-unless-admin-or-editor.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

export const WorkAreas: CollectionConfig = {
  slug: "work-areas",
  labels: { singular: "Work area", plural: "Work areas" },
  access: {
    create: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    hidden: hideUnlessAdminOrEditor,
    group: "Landing",
    defaultColumns: ["name", "slug", "order"],
    useAsTitle: "name",
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description:
          "Stable key stored on projects and applications. Changing it orphans existing references.",
      },
    },
    { name: "description", type: "textarea" },
    {
      name: "icon",
      type: "select",
      required: true,
      options: WORK_AREA_ICON_OPTIONS,
    },
    { name: "order", type: "number", required: true, defaultValue: 0 },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({
          req,
          source: "work-areas",
          tag: WORK_AREAS_TAG,
        });
      },
    ],
    afterDelete: [
      async ({ req }) => {
        await revalidateCache({
          req,
          source: "work-areas",
          tag: WORK_AREAS_TAG,
        });
      },
    ],
  },
};
