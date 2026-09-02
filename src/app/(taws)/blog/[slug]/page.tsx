import { Suspense } from "react";

import { PostArticle } from "@/features/blog/components/post-article";

import { Section } from "@/shared/components/ui/section";
import { Skeleton } from "@/shared/components/ui/skeleton";

type PageProps = { params: Promise<{ slug: string }> };

/**
 * The slug is read inside the boundary rather than through
 * generateStaticParams, which cannot return an empty list under Cache
 * Components and so would fail the build on a database with no posts.
 */
export default function Page({ params }: PageProps) {
  return (
    <Section as="main">
      <Suspense
        fallback={
          <div className="mx-auto flex max-w-[68ch] flex-col gap-6">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        }
      >
        <PostArticle params={params} />
      </Suspense>
    </Section>
  );
}
