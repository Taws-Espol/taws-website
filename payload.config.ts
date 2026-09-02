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
import { Hero } from "./src/shared/lib/payload/globals/hero.ts";
import { History } from "./src/shared/lib/payload/globals/history.ts";
import { Manifesto } from "./src/shared/lib/payload/globals/manifesto.ts";
import { Recruitment } from "./src/shared/lib/payload/globals/recruitment.ts";
import { getAppUrl } from "./src/shared/utils/get-app-url.ts";
import { getTrustedOrigins } from "./src/shared/utils/get-trusted-origins.ts";

export default buildConfig({
  bin: [
    {
      key: "seed",
      scriptPath: path.resolve(
        process.cwd(),
        "src/shared/lib/payload/seed/index.ts",
      ),
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
          // Relative on purpose: same origin, no host in code, and next/image
          // treats it as a local path in every environment.
          generateFileURL: ({ filename }) => `/api/media/file/${filename}`,
        },
      },
      bucket: process.env.S3_BUCKET_NAME ?? "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
        },
        region: process.env.S3_REGION ?? "",
        endpoint: process.env.S3_ENDPOINT ?? "",
        forcePathStyle: true,
      },
    }),
    importExportPlugin({
      collections: [{ slug: "applications" }, { slug: "users" }],
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
  /**
   * Club data is meant to be readable by anything, including a page running on
   * someone else's domain. A literal `*` is also the safer of Payload's two
   * options: listing origins makes it send Access-Control-Allow-Credentials and
   * echo the origin back, which would let a listed site act as a logged-in
   * admin. With `*`, browsers refuse to attach cookies at all, so every
   * cross-origin caller is anonymous and sees exactly what the public sees.
   */
  cors: "*",
  /**
   * Without an allowlist Payload honours a session cookie no matter which site
   * the request came from, which lets a hostile page write to an upload
   * collection as whoever is logged in. `multipart/form-data` needs no
   * preflight, so CORS never sees it.
   */
  csrf: getTrustedOrigins(),
});
