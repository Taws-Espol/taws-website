import { getPayload, type Payload } from "payload";

import payloadConfig from "@payload-config";

import { seed } from "./seed.ts";

export const script = async () => {
  let payload: Payload | undefined;

  try {
    payload = await getPayload({ config: payloadConfig });

    await seed(payload);

    process.exit(0);
  } catch (error) {
    payload?.logger.error(error);
    process.exit(1);
  }
};
