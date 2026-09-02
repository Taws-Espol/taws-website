import path from "node:path";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { importExportPlugin } from "@payloadcms/plugin-import-export";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Applications } from "./src/shared/lib/payload/collections/applications.ts";
import { Events } from "./src/shared/lib/payload/collections/events";
import { Gallery } from "./src/shared/lib/payload/collections/gallery.ts";
import { Media } from "./src/shared/lib/payload/collections/media.ts";
import { Members } from "./src/shared/lib/payload/collections/members.ts";
import { Posts } from "./src/shared/lib/payload/collections/posts.ts";
import { Projects } from "./src/shared/lib/payload/collections/projects.ts";
import { Users } from "./src/shared/lib/payload/collections/users.ts";
import { WorkAreas } from "./src/shared/lib/payload/collections/work-areas.ts";
import { Hero } from "./src/shared/lib/payload/globals/hero.ts";
import { History } from "./src/shared/lib/payload/globals/history.ts";
import { Manifesto } from "./src/shared/lib/payload/globals/manifesto.ts";
import { Recruitment } from "./src/shared/lib/payload/globals/recruitment.ts";
import { getAppUrl } from "./src/shared/utils/get-app-url.ts";

export default buildConfig({
  bin: [
    {
      key: "seed",
      scriptPath: path.resolve(process.cwd(), "src/shared/lib/payload/seed.ts"),
    },
  ],
  admin: {
    timezones: {
      defaultTimezone: "America/Bogota",
    },
  },
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    Members,
    Events,
    Projects,
    Gallery,
    Applications,
    Posts,
    WorkAreas,
  ],
  globals: [Hero, Manifesto, History, Recruitment],
  jobs: {
    tasks: [],
    shouldAutoRun: () => process.env.ENABLE_JOB_WORKERS === "true",
    autoRun: [
      {
        cron: "*/5 * * * *", // Every 5 minutes
        limit: 50,
        queue: "default",
      },
    ],
  },
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: "taws",
          generateFileURL: (file) => {
            return `https://cdn.taws.espol.edu.ec/${file.prefix}/${file.filename}`;
          },
        },
      },
      bucket: process.env.PUBLIC_S3_BUCKET_NAME ?? "",
      config: {
        credentials: {
          accessKeyId: process.env.PUBLIC_S3_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.PUBLIC_S3_SECRET_ACCESS_KEY ?? "",
        },
        region: process.env.PUBLIC_S3_REGION ?? "",
        endpoint: process.env.PUBLIC_S3_ENDPOINT ?? "",
        forcePathStyle: true,
      },
    }),
    importExportPlugin({
      collections: [{ slug: "users" }],
    }),
  ],
  secret: process.env.PAYLOAD_SECRET ?? "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL ?? "",
    },
    migrationDir: path.resolve(
      process.cwd(),
      "src/shared/lib/payload/migrations",
    ),
  }),
  sharp,
  localization: {
    locales: ["es"],
    defaultLocale: "es",
  },
  typescript: {
    outputFile: path.resolve(
      process.cwd(),
      "src/shared/lib/payload/types/payload.ts",
    ),
  },
  serverURL: getAppUrl().origin,
});
