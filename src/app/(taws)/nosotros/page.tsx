import { MemberCard } from "@/features/landing/components/member-card";
import { Timeline } from "@/features/landing/components/timeline";
import { getActiveMembers } from "@/features/landing/queries/get-active-members";

import { Section } from "@/shared/components/ui/section";
import { Heading, Text } from "@/shared/components/ui/typography";

export default async function AboutPage() {
  const members = await getActiveMembers();

  return (
    <Section as="main">
      <div className="flex flex-col gap-12">
        <section className="flex flex-col gap-4">
          <Heading as="h1" variant="display">
            Quiénes Somos
          </Heading>
          <Text className="text-muted-foreground text-lg">
            TAWS es el club de desarrollo de software y ciencias de la
            computación en la Escuela Superior Politécnica del Litoral (ESPOL).
            Fomentamos el aprendizaje colaborativo, la creación de proyectos y
            el impacto tecnológico.
          </Text>
        </section>

        <section className="flex flex-col gap-4">
          <Heading as="h2">Nuestra Historia</Heading>
          <Timeline />
        </section>

        <section className="flex flex-col gap-6">
          <Heading as="h2">Miembros Activos</Heading>
          {members.length === 0 ? (
            <Text>No hay miembros activos registrados actualmente.</Text>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {members.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </section>
      </div>
    </Section>
  );
}
