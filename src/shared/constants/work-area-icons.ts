import {
  Analytics01Icon,
  BrainCircuitIcon,
  ChipIcon,
  GlobalIcon,
  MicroscopeIcon,
  SmartPhone01Icon,
} from "@hugeicons/core-free-icons";

import type { WorkAreaValue } from "@/shared/constants/work-areas";

/**
 * Kept apart from `work-areas` so the Payload config can read the areas without
 * pulling an icon set into the server bundle.
 */
export const WORK_AREA_ICONS: Record<WorkAreaValue, typeof GlobalIcon> = {
  web: GlobalIcon,
  mobile: SmartPhone01Icon,
  "machine-learning": BrainCircuitIcon,
  "data-science": Analytics01Icon,
  iot: ChipIcon,
  research: MicroscopeIcon,
};
