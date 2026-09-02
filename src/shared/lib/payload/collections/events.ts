import type { CollectionConfig } from "payload";

import { EVENTS_TAG } from "../../../constants/cache-tags";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { collectionAccess } from "../access/collection-access.ts";

const { access, hidden } = collectionAccess({ managedBy: ["admin", "editor"] });

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    hidden,
    useAsTitle: "title",
    defaultColumns: ["title", "startsAt", "location"],
  },
  access,
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "startsAt",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "endsAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "registrationUrl",
      type: "text",
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "events", tag: EVENTS_TAG });
      },
    ],
    afterDelete: [
      async ({ req }) => {
        await revalidateCache({ req, source: "events", tag: EVENTS_TAG });
      },
    ],
  },
};
