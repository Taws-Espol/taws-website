import type { WorkAreaIcon } from "@/shared/constants/work-area-icons";

type DefaultWorkArea = {
  name: string;
  slug: string;
  icon: WorkAreaIcon;
  order: number;
};

/** Seeded on first boot so a fresh database is never missing the taxonomy. */
export const DEFAULT_WORK_AREAS: DefaultWorkArea[] = [
  { name: "Web", slug: "web", icon: "globe", order: 1 },
  { name: "Móvil", slug: "mobile", icon: "phone", order: 2 },
  {
    name: "Machine learning",
    slug: "machine-learning",
    icon: "brain",
    order: 3,
  },
  { name: "Data science", slug: "data-science", icon: "analytics", order: 4 },
  { name: "IoT", slug: "iot", icon: "cpu", order: 5 },
  { name: "Investigación", slug: "research", icon: "book", order: 6 },
];
