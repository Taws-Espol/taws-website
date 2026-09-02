import type { z } from "zod";

import { applicationSchema } from "@/features/recruitment/schemas/application";

export type ApplicationInput = z.infer<typeof applicationSchema>;
