import { getHistory } from "@/features/landing/queries/get-history";

import { Heading, Text } from "@/shared/components/ui/typography";

export async function Timeline() {
  const { milestones } = await getHistory();

  return (
    <div className="border-primary/30 my-8 ml-4 space-y-8 border-l-2 pl-6">
      {milestones?.map((milestone) => (
        <div key={milestone.id ?? milestone.year} className="relative">
          <div className="border-background bg-primary absolute top-1 -left-[31px] h-4 w-4 rounded-full border-4" />
          <span className="text-primary text-sm font-semibold">
            {milestone.year}
          </span>
          <Heading as="h3" className="mt-1 text-xl font-bold">
            {milestone.title}
          </Heading>
          <Text className="text-muted-foreground mt-2">
            {milestone.description}
          </Text>
        </div>
      ))}
    </div>
  );
}
