import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "applications" ADD COLUMN "semester" numeric;
  ALTER TABLE "applications" ADD COLUMN "prefix" varchar DEFAULT 'recommendation-letters';
  ALTER TABLE "applications" ADD COLUMN "url" varchar;
  ALTER TABLE "applications" ADD COLUMN "thumbnail_u_r_l" varchar;
  ALTER TABLE "applications" ADD COLUMN "filename" varchar;
  ALTER TABLE "applications" ADD COLUMN "mime_type" varchar;
  ALTER TABLE "applications" ADD COLUMN "filesize" numeric;
  ALTER TABLE "applications" ADD COLUMN "width" numeric;
  ALTER TABLE "applications" ADD COLUMN "height" numeric;
  ALTER TABLE "applications" ADD COLUMN "focal_x" numeric;
  ALTER TABLE "applications" ADD COLUMN "focal_y" numeric;
  CREATE UNIQUE INDEX "applications_filename_idx" ON "applications" USING btree ("filename");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "applications_filename_idx";
  ALTER TABLE "applications" DROP COLUMN "semester";
  ALTER TABLE "applications" DROP COLUMN "prefix";
  ALTER TABLE "applications" DROP COLUMN "url";
  ALTER TABLE "applications" DROP COLUMN "thumbnail_u_r_l";
  ALTER TABLE "applications" DROP COLUMN "filename";
  ALTER TABLE "applications" DROP COLUMN "mime_type";
  ALTER TABLE "applications" DROP COLUMN "filesize";
  ALTER TABLE "applications" DROP COLUMN "width";
  ALTER TABLE "applications" DROP COLUMN "height";
  ALTER TABLE "applications" DROP COLUMN "focal_x";
  ALTER TABLE "applications" DROP COLUMN "focal_y";`);
}
