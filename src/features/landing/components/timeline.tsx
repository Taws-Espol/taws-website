import { getHistory } from "@/features/landing/queries/get-history";

import { Heading, Text } from "@/shared/components/ui/typography";

export async function Timeline() {
  const { milestones } = await getHistory();

  if (!milestones?.length) return null;

  return (
    <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {milestones.map((milestone) => (
        <li
          key={milestone.id ?? milestone.year}
          className="bg-card shadow-soft flex flex-col gap-2 rounded-3xl p-6"
        >
          <span className="bg-primary/8 text-primary self-start rounded-full px-3 py-1 text-sm font-semibold">
            {milestone.year}
          </span>

          <Heading as="h3" variant="card" className="mt-1">
            {milestone.title}
          </Heading>

          <Text variant="small" className="text-muted-foreground">
            {milestone.description}
          </Text>
        </li>
      ))}
    </ol>
  );
}
