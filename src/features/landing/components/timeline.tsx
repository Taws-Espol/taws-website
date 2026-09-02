import { getHistory } from "@/features/landing/queries/get-history";

import { Heading, Text } from "@/shared/components/ui/typography";

export async function Timeline() {
  const { milestones } = await getHistory();

  if (!milestones?.length) return null;

  return (
    <ol className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {milestones.map((milestone) => (
        <li
          key={milestone.id ?? milestone.year}
          className="flex flex-col gap-2"
        >
          <span className="text-primary text-3xl leading-none font-semibold">
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
