import type { GlobalConfig } from "payload";

import { MANIFESTO_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { globalAccess } from "../access/global-access.ts";

const { access, hidden } = globalAccess({ managedBy: ["admin", "editor"] });

export const Manifesto: GlobalConfig = {
  slug: "manifesto",
  label: "Manifesto",
  access,
  admin: { hidden, group: "Landing" },
  fields: [
    {
      name: "body",
      type: "textarea",
      required: true,
      defaultValue: "Be different. Be TAWS.",
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
