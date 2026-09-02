import { WORK_AREAS } from "@/shared/constants/work-areas";

export function getWorkAreaLabel(value: string) {
  return WORK_AREAS.find((area) => area.value === value)?.label ?? value;
}
