import type { Metadata } from "next";

import { MemberCard } from "@/features/about/components/member-card";
import { Timeline } from "@/features/about/components/timeline";
import { Section } from "@/shared/components/ui/section";
import { Heading, Text } from "@/shared/components/ui/typography";
import { getActiveMembers } from "@/shared/queries/get-active-members";

export const metadata: Metadata = {
  title: "Sobre Nosotros | TAWS",
  description:
    "Conoce la historia del club TAWS, nuestra trayectoria desde 2007 y los miembros activos que forman parte de la comunidad.",
};

export default async function AboutPage() {
  const members = await getActiveMembers();

  return (
    <Section as="main">
      <div className="flex flex-col gap-12">
        {/* Sección Quiénes Somos */}
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

        {/* Sección Historia / Timeline */}
        <section className="flex flex-col gap-4">
          <Heading as="h2">Nuestra Historia</Heading>
          <Timeline />
        </section>

        {/* Sección Grid de Miembros */}
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
