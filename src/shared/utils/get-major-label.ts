import { MAJORS } from "@/shared/constants/majors";
import type { MajorValue } from "@/shared/types/major";

export function getMajorLabel(value: MajorValue) {
  return MAJORS.find((major) => major.value === value)?.label;
}
