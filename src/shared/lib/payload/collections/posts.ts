import type { CollectionConfig } from "payload";

import { POSTS_TAG } from "../../../constants/cache-tags.ts";
import { postTag } from "../../../utils/post-tag.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { slugify } from "../../../utils/slugify.ts";
import { collectionAccess } from "../access/collection-access.ts";
import { countLexicalWords } from "../utils/count-lexical-words.ts";

const WORDS_PER_MINUTE = 200;

const { access, hidden } = collectionAccess({
  managedBy: ["admin", "editor", "blogger"],
  read: ({ req: { user } }) =>
    Boolean(user) || { _status: { equals: "published" } },
});

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Post", plural: "Posts" },
  versions: { drafts: true },
  access,
  admin: {
    hidden,
    group: "Content",
    defaultColumns: ["title", "category", "author", "publishedAt"],
    useAsTitle: "title",
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
      index: true,
      admin: {
        description:
          "Se genera del título al crear la publicación. Cámbialo antes de publicar si hace falta; después, cambiarlo rompe los enlaces ya compartidos.",
      },
      hooks: {
        /**
         * Only on create, and only when the editor left it empty. Following the
         * title afterwards would mean that fixing a typo in a headline silently
         * changes the URL, breaking every link already shared and everything a
         * search engine has indexed.
         */
        beforeValidate: [
          ({ value, data, operation }) => {
            if (operation !== "create") return value;
            if (typeof value === "string" && value.trim()) return value;

            const title = typeof data?.title === "string" ? data.title : "";

            return slugify(title) || value;
          },
        ],
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Tutorial", value: "tutorial" },
        { label: "Anuncio", value: "anuncio" },
        { label: "Proyecto", value: "proyecto" },
        { label: "Evento", value: "evento" },
      ],
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "members",
      required: true,
    },
    {
      name: "publishedAt",
      type: "date",
      required: true,
    },
    {
      name: "readingTime",
      type: "number",
      admin: {
        readOnly: true,
        description: "Worked out from the content. Editing it does nothing.",
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) =>
            Math.max(
              1,
              Math.round(
                countLexicalWords(siblingData.content) / WORDS_PER_MINUTE,
              ),
            ),
        ],
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req }) => {
        await revalidateCache({ req, source: "posts", tag: POSTS_TAG });
        await revalidateCache({
          req,
          source: "posts",
          tag: postTag(doc.id as number),
        });
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        await revalidateCache({ req, source: "posts", tag: POSTS_TAG });
        await revalidateCache({
          req,
          source: "posts",
          tag: postTag(doc.id as number),
        });
      },
    ],
  },
};
