import { z } from "zod";

import {
  RECOMMENDATION_LETTER_MAX_BYTES,
  RECOMMENDATION_LETTER_MIME_TYPE,
} from "../constants/recommendation-letter.ts";

export const recommendationLetterSchema = z
  .file()
  .min(1, "El archivo está vacío.")
  .max(RECOMMENDATION_LETTER_MAX_BYTES, "El PDF debe pesar máximo 3 MB.")
  .mime(RECOMMENDATION_LETTER_MIME_TYPE, "Solo se permiten archivos PDF.")
  .refine((file) => file.name.toLowerCase().endsWith(".pdf"), {
    message: "Solo se permiten archivos PDF.",
  });
