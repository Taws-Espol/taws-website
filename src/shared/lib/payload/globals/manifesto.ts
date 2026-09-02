import type { GlobalConfig } from "payload";

import { MANIFESTO_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

export const Manifesto: GlobalConfig = {
  slug: "manifesto",
  label: "Manifesto",
  access: { read: () => true, update: isAdminOrEditor },
  admin: { group: "Landing" },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      required: true,
      defaultValue: "Manifiesto",
    },
    {
      name: "body",
      type: "textarea",
      required: true,
      defaultValue:
        "No esperamos a graduarnos para investigar. Se aprende construyendo, en equipo y a la vista de todos.",
    },
    {
      name: "signature",
      type: "text",
      required: true,
      defaultValue: "TAWS · FIEC · ESPOL",
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "manifesto", tag: MANIFESTO_TAG });
      },
    ],
  },
};
