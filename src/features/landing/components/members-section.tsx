import Link from "next/link";

import { MemberCard } from "@/features/about/components/member-card";
import { Heading } from "@/shared/components/ui/typography";
import { getActiveMembers } from "@/shared/queries/get-active-members";

interface MembersSectionProps {
  limit?: number;
}

export async function MembersSection({ limit = 5 }: MembersSectionProps) {
  const members = await getActiveMembers();

  if (members.length === 0) return null;

  const visibleMembers = members.slice(0, limit);
  const remainingCount = members.length - visibleMembers.length;

  return (
    <section className="flex flex-col gap-6 py-8">
      <div className="flex items-center justify-between">
        <Heading as="h2">Nuestra Comunidad</Heading>
        <Link
          href="/about"
          className="text-primary text-sm font-medium hover:underline"
        >
          Ver todos ({members.length})
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleMembers.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}

        {remainingCount > 0 && (
          <Link
            href="/about"
            className="border-border bg-card/50 hover:border-primary hover:bg-accent flex flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center transition-all hover:shadow-md"
          >
            <div className="text-primary mb-1 text-3xl font-extrabold">
              +{remainingCount}
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              Ver todos los miembros
            </p>
          </Link>
        )}
      </div>
    </section>
  );
}
