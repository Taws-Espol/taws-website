import Link from "next/link";

import { Heading } from "@/shared/components/ui/typography";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <Heading as="h1" variant="display">
        TAWS about
      </Heading>

      <Link href="/">Go to home page</Link>
      <Link href="/about">Go to about page</Link>
      <Link href="/blog">Go to blog page</Link>
      <Link href="/projects">Go to projects page</Link>
    </main>
  );
}
