import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "manifesto" DROP COLUMN "eyebrow";
  ALTER TABLE "manifesto" DROP COLUMN "signature";`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "manifesto" ADD COLUMN "eyebrow" varchar DEFAULT 'Manifiesto' NOT NULL;
  ALTER TABLE "manifesto" ADD COLUMN "signature" varchar DEFAULT 'TAWS · FIEC · ESPOL' NOT NULL;`);
}
