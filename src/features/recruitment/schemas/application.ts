import { z } from "zod";

import {
  MAJOR_VALUES,
  WORK_AREA_VALUES,
} from "@/features/recruitment/constants/application-options";
import { recommendationLetterSchema } from "@/features/recruitment/schemas/recommendation-letter";

export const applicationSchema = z.object({
  fullName: z.string().trim().min(3, "Escribe tu nombre completo.").max(120),
  email: z
    .email("Escribe un correo válido.")
    .refine(
      (value) => value.toLowerCase().endsWith("@espol.edu.ec"),
      "Usa tu correo institucional @espol.edu.ec.",
    ),
  major: z.enum(MAJOR_VALUES as [string, ...string[]], {
    error: "Selecciona tu carrera.",
  }),
  semester: z
    .number({ error: "Indica el semestre que cursas." })
    .int("El semestre debe ser un número entero.")
    .min(1, "El semestre debe ser al menos 1."),
  passedProgrammingFundamentals: z.enum(["yes", "no"], {
    error: "Indica si aprobaste Fundamentos de Programación.",
  }),
  recommendationLetter: recommendationLetterSchema.optional(),
  interests: z
    .array(z.enum(WORK_AREA_VALUES as [string, ...string[]]))
    .min(1, "Elige al menos un área de interés."),
  message: z.string().trim().max(1000).optional(),
  /** Left empty by people, filled by bots. Never shown, never stored. */
  website: z.string().max(0).optional(),
});
