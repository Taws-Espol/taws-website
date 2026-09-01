import { connection } from "next/server";

import { ApplicationForm } from "@/features/registration/components/application-form";
import { getRecruitmentWindow } from "@/features/registration/queries/get-recruitment-window";
import { isRecruitmentOpen } from "@/features/registration/utils/is-recruitment-open";
import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

const CLOSED_FALLBACK =
  "La convocatoria está cerrada por ahora. Síguenos en redes para enterarte de la próxima.";

export async function RecruitmentSection() {
  await connection();

  const window = await getRecruitmentWindow();
  const isOpen = isRecruitmentOpen(window, new Date());

  return (
    <Section variant="inverted">
      <div className="grid items-start gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Eyebrow className="opacity-70">Únete</Eyebrow>

          <Heading as="h2" className="max-w-[16ch]">
            {isOpen ? "Postulaciones abiertas" : "Postulaciones cerradas"}
          </Heading>

          <Text className="max-w-[46ch] opacity-80">
            Abrimos una convocatoria por semestre. Tres semanas de proceso:
            postulación, prueba técnica y entrevista.
          </Text>
        </div>

        {isOpen ? (
          <ApplicationForm />
        ) : (
          <Text className="max-w-[46ch] opacity-80">
            {window.closedMessage ?? CLOSED_FALLBACK}
          </Text>
        )}
      </div>
    </Section>
  );
}
