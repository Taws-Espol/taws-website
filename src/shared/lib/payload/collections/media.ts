import type { CollectionConfig } from "payload";

import { MEDIA_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { collectionAccess } from "../access/collection-access.ts";

const { access, hidden } = collectionAccess({
  managedBy: ["admin", "editor", "blogger"],
});

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Media", plural: "Media" },
  upload: {
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
    crop: true,
    focalPoint: true,
  },
  access,
  admin: {
    hidden,
    group: "Media",
    defaultColumns: ["filename", "alt", "createdAt"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "media", tag: MEDIA_TAG });
      },
    ],
  },
};
