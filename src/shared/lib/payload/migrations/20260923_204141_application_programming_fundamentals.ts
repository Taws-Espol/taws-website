import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_applications_passed_programming_fundamentals" AS ENUM('yes', 'no');
  ALTER TABLE "applications" ADD COLUMN "passed_programming_fundamentals" "enum_applications_passed_programming_fundamentals";`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "applications" DROP COLUMN "passed_programming_fundamentals";
  DROP TYPE "public"."enum_applications_passed_programming_fundamentals";`);
}
