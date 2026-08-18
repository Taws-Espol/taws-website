import { MAJORS } from "@/shared/constants/majors";

export function getMajorPayloadOptions() {
  return MAJORS.map(({ value, label }) => ({
    label,
    value,
  }));
}
