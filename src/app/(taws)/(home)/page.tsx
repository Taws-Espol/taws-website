import Link from "next/link";

import { MembersSection } from "@/features/landing/components/members-section";
import { Heading } from "@/shared/components/ui/typography";

export default function Page() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center gap-8 py-8">
      <Heading as="h1" variant="display">
        TAWS home
      </Heading>

      <nav className="text-primary flex flex-wrap gap-4 hover:underline">
        <Link href="/">Go to home page</Link>
        <Link href="/about">Go to about page</Link>
        <Link href="/blog">Go to blog page</Link>
        <Link href="/projects">Go to projects page</Link>
      </nav>

      <div className="w-full">
        <MembersSection />
      </div>
    </main>
  );
}
