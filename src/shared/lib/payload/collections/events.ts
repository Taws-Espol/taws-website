import type { Access, CollectionConfig } from "payload";
import { revalidateTag } from "next/cache";
import { EVENTS_TAG } from "../../../constants/cache-tags";

const isAdminOrEditor: Access = ({ req: { user } }) => {
  return Boolean(user && (user.role === "admin" || user.role === "editor"));
};

export const Events: CollectionConfig = {
  slug: "events",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "startsAt", "location"],
  },
  access: {
    create: isAdminOrEditor,
    read: () => true,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
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
