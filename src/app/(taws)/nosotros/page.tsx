import { MemberCard } from "@/features/landing/components/member-card";
import { Timeline } from "@/features/landing/components/timeline";
import { getActiveMembers } from "@/features/landing/queries/get-active-members";

import { TeamIllustration } from "@/shared/components/illustrations/team-illustration";
import { PageHeader } from "@/shared/components/page-header";
import { Section } from "@/shared/components/ui/section";
import { SectionHeader } from "@/shared/components/ui/section-header";
import { Text } from "@/shared/components/ui/typography";

export default async function Page() {
  const members = await getActiveMembers();

  return (
    <main>
      <PageHeader
        eyebrow="Nosotros"
        title="Un club, no una materia"
        description="TAWS es el grupo estudiantil de investigación en tecnología de la FIEC. Nos juntamos a construir, romper y publicar cosas desde 2007."
        illustration={<TeamIllustration />}
      />

      <Section>
        <div className="flex flex-col gap-14">
          <SectionHeader eyebrow="Historia" title="Cómo llegamos hasta aquí" />

          <Timeline />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col gap-14">
          <SectionHeader
            eyebrow="Miembros"
            title="Quiénes están hoy"
            description="Los estudiantes que sostienen el club este semestre."
          />

          {members.length === 0 ? (
            <Text className="text-muted-foreground">
              No hay miembros activos registrados actualmente.
            </Text>
          ) : (
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </Section>
    </main>
  );
}
