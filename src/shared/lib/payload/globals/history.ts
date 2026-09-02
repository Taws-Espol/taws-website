import type { GlobalConfig } from "payload";

import { HISTORY_TAG } from "../../../constants/cache-tags.ts";
import { revalidateCache } from "../../../utils/revalidate-cache.ts";
import { isAdminOrEditor } from "../utils/is-admin-or-editor.ts";

export const History: GlobalConfig = {
  slug: "history",
  label: "History",
  access: { read: () => true, update: isAdminOrEditor },
  admin: { group: "Landing" },
  fields: [
    {
      name: "milestones",
      type: "array",
      required: true,
      minRows: 1,
      labels: { singular: "Milestone", plural: "Milestones" },
      defaultValue: [
        {
          year: "2007",
          title: "Fundación de TAWS",
          description:
            "Nace el Club Social de Lenguajes de Programación en la FIEC de la ESPOL.",
        },
        {
          year: "2015",
          title: "Consolidación de proyectos e investigación",
          description:
            "El club amplía sus áreas de trabajo hacia desarrollo web e inteligencia artificial.",
        },
        {
          year: "2024",
          title: "Renovación digital e impacto comunitario",
          description:
            "Modernización de la infraestructura del club y fortalecimiento de talleres.",
        },
      ],
      fields: [
        { name: "year", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ req }) => {
        await revalidateCache({ req, source: "history", tag: HISTORY_TAG });
      },
    ],
  },
};
