import type { CollectionConfig } from "payload";

import { MEDIA_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { isAdminEditorOrBlogger } from "../utils/is-admin-editor-or-blogger.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Media", plural: "Media" },
  upload: {
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
    crop: true,
    focalPoint: true,
  },
  access: {
    create: isAdminEditorOrBlogger,
    read: () => true,
    update: isAdminEditorOrBlogger,
    delete: isAdminOrEditor,
  },
  admin: {
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
