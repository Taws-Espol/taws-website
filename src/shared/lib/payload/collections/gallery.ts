import type { CollectionConfig } from "payload";

import { GALLERY_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  labels: { singular: "Album", plural: "Gallery" },
  access: {
    create: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  admin: {
    group: "Content",
    defaultColumns: ["title", "date"],
    useAsTitle: "title",
    description:
      "Photos are published as albums. One album is one occasion, not one picture.",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "images",
      type: "array",
      required: true,
      minRows: 1,
      labels: { singular: "Image", plural: "Images" },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "caption",
          type: "text",
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "gallery", tag: GALLERY_TAG });
      },
    ],
    afterDelete: [
      async ({ req }) => {
        await revalidateCache({ req, source: "gallery", tag: GALLERY_TAG });
      },
    ],
  },
};
