import type { CollectionConfig } from "payload";
import { APIError } from "payload";

import { validateRecommendationLetter } from "../../../../features/recruitment/utils/validate-recommendation-letter.ts";
import { getWorkAreaPayloadOptions } from "../../../constants/work-areas.ts";
import { getMajorPayloadOptions } from "../../../utils/get-major-payload-options.ts";
import { anyone } from "../access/anyone.ts";
import { collectionAccess } from "../access/collection-access.ts";
import { hasRole, hasRoleField } from "../access/has-role.ts";

/**
 * The only public write on the site, and the only collection holding personal
 * data. Anyone may create; nobody may read without being an admin or editor.
 */
const { access, hidden } = collectionAccess({
  managedBy: ["admin", "editor"],
  read: hasRole("admin", "editor"),
  create: anyone,
});

export const Applications: CollectionConfig = {
  slug: "applications",
  labels: { singular: "Application", plural: "Applications" },
  upload: {
    filesRequiredOnCreate: false,
    mimeTypes: ["application/pdf"],
    bulkUpload: false,
    pasteURL: false,
  },
  hooks: {
    beforeOperation: [
      ({ operation, req }) => {
        if ((operation === "create" || operation === "update") && req.file) {
          const error = validateRecommendationLetter(req.file);
          if (error) throw new APIError(error, 400);
        }
      },
    ],
  },
  access,
  admin: {
    hidden,
    group: "Recruitment",
    description: "Recommendation letters are optional PDF files, up to 3 MB.",
    defaultColumns: [
      "fullName",
      "email",
      "major",
      "semester",
      "passedProgrammingFundamentals",
      "status",
      "createdAt",
    ],
    useAsTitle: "fullName",
  },
  fields: [
    {
      name: "fullName",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "major",
      type: "select",
      required: true,
      options: getMajorPayloadOptions(),
    },
    {
      name: "semester",
      type: "number",
      label: "Semester (required)",
      // Keep the database column nullable for applications submitted before
      // this field existed. Validation requires it for every new submission.
      min: 1,
      validate: (value: number | null | undefined) =>
        Number.isInteger(value) && Number(value) >= 1
          ? true
          : "Enter the semester as a positive whole number.",
    },
    {
      name: "passedProgrammingFundamentals",
      type: "select",
      label: "Passed Fundamentals of Programming (required)",
      // Existing applications have no answer; require an explicit answer on writes.
      options: [
        { label: "Yes", value: "yes" },
        { label: "No", value: "no" },
      ],
      validate: (value: unknown) =>
        value === "yes" || value === "no"
          ? true
          : "Indicate whether you passed Fundamentals of Programming.",
    },
    {
      name: "interests",
      type: "select",
      hasMany: true,
      required: true,
      options: getWorkAreaPayloadOptions(),
    },
    {
      name: "message",
      type: "textarea",
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      access: {
        create: () => false,
        update: hasRoleField("admin", "editor"),
      },
      options: [
        { label: "Pending", value: "pending" },
        { label: "Accepted", value: "accepted" },
        { label: "Rejected", value: "rejected" },
      ],
    },
  ],
};
