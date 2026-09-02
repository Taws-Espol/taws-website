import {
  Globe02Icon,
  SmartPhone01Icon,
  BrainIcon,
  Analytics01Icon,
  CpuIcon,
  BookOpen01Icon,
} from "@hugeicons/core-free-icons";

export const WORK_AREAS = [
  { value: "web", label: "Web", icon: Globe02Icon },
  { value: "mobile", label: "Móvil", icon: SmartPhone01Icon },
  { value: "machine-learning", label: "Machine learning", icon: BrainIcon },
  { value: "data-science", label: "Data science", icon: Analytics01Icon },
  { value: "iot", label: "IoT", icon: CpuIcon },
  { value: "research", label: "Investigación", icon: BookOpen01Icon },
] as const;

export type WorkAreaValue = (typeof WORK_AREAS)[number]["value"];

export function getWorkAreaPayloadOptions() {
  return WORK_AREAS.map(({ value, label }) => ({
    label,
    value,
  }));
}
