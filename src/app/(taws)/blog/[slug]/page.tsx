import { Heading } from "@/shared/components/ui/typography";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <Heading as="h1" variant="display">
        TAWS blog post
      </Heading>
    </main>
  );
}
