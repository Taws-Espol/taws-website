import Link from "next/link";

import { MemberCard } from "@/features/landing/components/member-card";
import { getActiveMembers } from "@/features/landing/queries/get-active-members";

import { buttonVariants } from "@/shared/components/ui/button";
import { Section } from "@/shared/components/ui/section";
import { SectionHeader } from "@/shared/components/ui/section-header";

const LANDING_MEMBER_COUNT = 4;

export async function MembersSection() {
  const members = await getActiveMembers();

  if (members.length === 0) return null;

  return (
    <Section>
      <div className="flex flex-col gap-14">
        <SectionHeader
          eyebrow="Comunidad"
          title="Quiénes lo hacen"
          description="Estudiantes de la FIEC que dedican parte de su semestre al club."
          action={
            <Link
              href="/nosotros"
              className={buttonVariants({ variant: "secondary" })}
            >
              Ver los {members.length}
            </Link>
          }
        />

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {members.slice(0, LANDING_MEMBER_COUNT).map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </Section>
  );
}
