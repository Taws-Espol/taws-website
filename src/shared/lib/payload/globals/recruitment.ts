import type { GlobalConfig } from "payload";

import { RECRUITMENT_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { globalAccess } from "../access/global-access.ts";

const { access, hidden } = globalAccess({ managedBy: ["admin", "editor"] });

export const Recruitment: GlobalConfig = {
  slug: "recruitment",
  label: "Recruitment",
  access,
  admin: {
    hidden,
    group: "Recruitment",
    description:
      "The dates the club accepts applications. Open and closed are worked out from these; there is no switch to flip.",
  },
  fields: [
    {
      name: "opensAt",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "closesAt",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "closedMessage",
      type: "textarea",
      admin: {
        description: "Shown in place of the form outside the window.",
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({
          req,
          source: "recruitment",
          tag: RECRUITMENT_TAG,
        });
      },
    ],
  },
};
