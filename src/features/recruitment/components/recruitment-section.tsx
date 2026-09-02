import { connection } from "next/server";

import { ApplicationForm } from "@/features/recruitment/components/application-form";
import { getRecruitmentWindow } from "@/features/recruitment/queries/get-recruitment-window";
import { isRecruitmentOpen } from "@/features/recruitment/utils/is-recruitment-open";

import { DoorIllustration } from "@/shared/components/illustrations/door-illustration";
import { Section } from "@/shared/components/ui/section";
import { Eyebrow, Heading, Text } from "@/shared/components/ui/typography";

const CLOSED_FALLBACK =
  "La convocatoria está cerrada por ahora. Síguenos en redes para enterarte de la próxima.";

const STEPS = [
  "Envías el formulario",
  "Resuelves una prueba técnica",
  "Conversamos en una entrevista",
];

/**
 * `hideWhenClosed` is for the landing, where a closed window should leave no
 * trace. The dedicated page still answers, because someone reaching it from a
 * saved link deserves to be told rather than shown an empty screen.
 */
export async function RecruitmentSection({
  hideWhenClosed = false,
}: {
  hideWhenClosed?: boolean;
}) {
  await connection();

  const window = await getRecruitmentWindow();
  const isOpen = isRecruitmentOpen(window, new Date());

  if (!isOpen && hideWhenClosed) return null;

  return (
    <Section>
      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
        <div className="flex flex-col gap-6">
          <Eyebrow className="text-primary">Únete</Eyebrow>

          <Heading as="h2" className="max-w-[16ch]">
            {isOpen ? "Postulaciones abiertas" : "Postulaciones cerradas"}
          </Heading>

          <Text variant="lead" className="text-muted-foreground max-w-[46ch]">
            Abrimos una convocatoria por semestre y el proceso dura tres
            semanas.
          </Text>

          {isOpen ? (
            <ol className="flex flex-col gap-3">
              {STEPS.map((step, index) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="bg-primary/8 text-primary flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                    {index + 1}
                  </span>
                  <Text variant="small">{step}</Text>
                </li>
              ))}
            </ol>
          ) : null}

          <DoorIllustration className="mt-4" />
        </div>

        {isOpen ? (
          <ApplicationForm />
        ) : (
          <div className="bg-card shadow-soft rounded-[2rem] p-8">
            <Text className="text-muted-foreground max-w-[46ch]">
              {window.closedMessage ?? CLOSED_FALLBACK}
            </Text>
          </div>
        )}
      </div>
    </Section>
  );
}
