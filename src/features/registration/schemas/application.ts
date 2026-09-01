import { z } from "zod";

import { WORK_AREAS } from "@/features/landing/constants/work-areas";
import { MAJORS } from "@/shared/constants/majors";

const majorValues = MAJORS.map((major) => major.value);
const workAreaValues = WORK_AREAS.map((area) => area.value);

export const applicationSchema = z.object({
  fullName: z.string().trim().min(3, "Escribe tu nombre completo.").max(120),
  email: z
    .email("Escribe un correo válido.")
    .refine(
      (value) => value.toLowerCase().endsWith("@espol.edu.ec"),
      "Usa tu correo institucional @espol.edu.ec.",
    ),
  major: z.enum(majorValues as [string, ...string[]], {
    error: "Selecciona tu carrera.",
  }),
  interests: z
    .array(z.enum(workAreaValues as [string, ...string[]]))
    .min(1, "Elige al menos un área de interés."),
  message: z.string().trim().max(1000).optional(),
  /** Left empty by people and filled by bots. Never shown, never stored. */
  website: z.string().max(0).optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;
