import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";

import { EVENTS_TAG } from "../../../constants/cache-tags";
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
      type: "richText",
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
      () => {
        revalidateTag(EVENTS_TAG, "default");
      },
    ],
    afterDelete: [
      () => {
        revalidateTag(EVENTS_TAG, "default");
      },
    ],
  },
};
