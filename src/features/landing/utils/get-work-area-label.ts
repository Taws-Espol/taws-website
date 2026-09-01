import { WORK_AREAS } from "@/features/landing/constants/work-areas";

export function getWorkAreaLabel(value: string) {
  return WORK_AREAS.find((area) => area.value === value)?.label ?? value;
}
