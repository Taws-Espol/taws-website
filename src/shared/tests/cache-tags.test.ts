import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import * as cacheTags from "@/shared/constants/cache-tags";

const FEATURES_DIR = "src/features";
const COLLECTIONS_DIR = "src/shared/lib/payload/collections";
const GLOBALS_DIR = "src/shared/lib/payload/globals";

/** A directory that does not exist yet reads as empty, not as a crash. */
function readAll(dir: string) {
  if (!existsSync(dir)) return "";

  return readdirSync(dir)
    .filter((file) => file.endsWith(".ts") && !file.endsWith(".test.ts"))
    .map((file) => readFileSync(join(dir, file), "utf8"))
    .join("\n");
}

/** Every feature's queries, so a new feature's tags are covered automatically. */
function readAllFeatureQueries() {
  return readdirSync(FEATURES_DIR)
    .map((feature) => join(FEATURES_DIR, feature, "queries"))
    .filter((dir) => existsSync(dir))
    .map(readAll)
    .join("\n");
}

const consumers = readAllFeatureQueries();
const producers = `${readAll(COLLECTIONS_DIR)}\n${readAll(GLOBALS_DIR)}`;
const TAG_NAMES = Object.keys(cacheTags);

/**
 * #152: BLOG_TAG was declared and never used, and every query shared one
 * LANDING_TAG so editing any content flushed every page. These assertions keep
 * the vocabulary honest — a tag nothing reads, or nothing revalidates, is a bug.
 */
describe("cache tags", () => {
  it("declares a tag per content source, with no duplicate values", () => {
    const values = Object.values(cacheTags);

    expect(new Set(values).size).toBe(values.length);
  });

  /**
   * Both halves of the invariant need a query to exist before they can hold, so
   * they stay quiet until the first one ships. The guard lifts itself: the
   * moment any feature has a queries directory, every tag is on the hook.
   */
  describe.skipIf(consumers === "")("wiring", () => {
    it.each(TAG_NAMES)("%s is read by at least one query", (tag) => {
      expect(consumers).toContain(tag);
    });

    it.each(TAG_NAMES)(
      "%s is revalidated by at least one collection or global",
      (tag) => {
        expect(producers).toContain(tag);
      },
    );
  });

  it("leaves no query on a catch-all tag", () => {
    expect(consumers).not.toContain("LANDING_TAG");
  });
});
