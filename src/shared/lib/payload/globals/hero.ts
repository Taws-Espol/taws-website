import type { GlobalConfig } from "payload";

import { HERO_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { globalAccess } from "../access/global-access.ts";

const { access, hidden } = globalAccess({ managedBy: ["admin", "editor"] });

export const Hero: GlobalConfig = {
  slug: "hero",
  label: "Hero",
  access,
  admin: { hidden, group: "Landing" },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      required: true,
      defaultValue: "Convocatoria abierta",
    },
    {
      name: "headline",
      type: "text",
      required: true,
      defaultValue: "Aprender tecnología es un proyecto en grupo",
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      defaultValue:
        "Somos TAWS, el grupo de investigación en tecnologías web, móviles y data science de la ESPOL. Desde 2007, en la FIEC.",
    },
    {
      name: "primaryCta",
      type: "group",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          defaultValue: "Quiero postular",
        },
        {
          name: "href",
          type: "text",
          required: true,
          defaultValue: "/postula",
        },
      ],
    },
    {
      name: "secondaryCta",
      type: "group",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
          defaultValue: "Ver proyectos",
        },
        {
          name: "href",
          type: "text",
          required: true,
          defaultValue: "/proyectos",
        },
      ],
    },
    {
      name: "memberCountLabel",
      type: "text",
      required: true,
      defaultValue: "miembros activos",
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "hero", tag: HERO_TAG });
      },
    ],
  },
};
