import type { Payload } from "payload";

import { DEFAULT_WORK_AREAS } from "../../../constants/default-work-areas.ts";

export async function seedWorkAreas(payload: Payload) {
  const { totalDocs } = await payload.count({ collection: "work-areas" });

  if (totalDocs > 0) return;

  for (const data of DEFAULT_WORK_AREAS) {
    await payload.create({ collection: "work-areas", data });
  }

  payload.logger?.info?.(`Seeded ${DEFAULT_WORK_AREAS.length} work areas.`);
}
