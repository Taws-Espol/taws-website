import { getPayload, type Payload } from "payload";

import payloadConfig from "@payload-config";

export const script = async () => {
  let payload: Payload | undefined;

  try {
    payload = await getPayload({ config: payloadConfig });

    //TODO

    payload.logger.info(`Successfully seeded Payload with admin user ....`);

    process.exit(0);
  } catch (error) {
    payload?.logger.error(error);
    process.exit(1);
  }
};
