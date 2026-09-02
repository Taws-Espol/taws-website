import {
  Analytics01Icon,
  BookOpen01Icon,
  BrainIcon,
  CpuIcon,
  Globe02Icon,
  SmartPhone01Icon,
} from "@hugeicons/core-free-icons";

/**
 * Icons cannot be authored in the CMS, so editors pick from this list and the
 * site resolves the name to the drawing.
 */
export const WORK_AREA_ICONS = {
  globe: Globe02Icon,
  phone: SmartPhone01Icon,
  brain: BrainIcon,
  analytics: Analytics01Icon,
  cpu: CpuIcon,
  book: BookOpen01Icon,
} as const;

export type WorkAreaIcon = keyof typeof WORK_AREA_ICONS;

export const WORK_AREA_ICON_OPTIONS = Object.keys(WORK_AREA_ICONS).map(
  (value) => ({ label: value, value }),
);
