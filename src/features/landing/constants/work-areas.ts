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
  { value: "mobile", label: "Mobile", icon: SmartPhone01Icon },
  { value: "machine-learning", label: "Machine Learning", icon: BrainIcon },
  { value: "data-science", label: "Data Science", icon: Analytics01Icon },
  { value: "iot", label: "IoT", icon: CpuIcon },
  { value: "research", label: "Research", icon: BookOpen01Icon },
] as const;

export type WorkAreaValue = (typeof WORK_AREAS)[number]["value"];

export function getWorkAreaPayloadOptions() {
  return WORK_AREAS.map(({ value, label }) => ({
    label,
    value,
  }));
}
