import type { File } from "payload";

import {
  RECOMMENDATION_LETTER_MAX_BYTES,
  RECOMMENDATION_LETTER_MIME_TYPE,
} from "../constants/recommendation-letter.ts";

export function validateRecommendationLetter(file: File): string | null {
  if (
    file.size > RECOMMENDATION_LETTER_MAX_BYTES ||
    file.data.length > RECOMMENDATION_LETTER_MAX_BYTES
  ) {
    return "El PDF debe pesar máximo 3 MB.";
  }
  if (
    file.mimetype !== RECOMMENDATION_LETTER_MIME_TYPE ||
    !file.name.toLowerCase().endsWith(".pdf") ||
    file.data.subarray(0, 5).toString("ascii") !== "%PDF-"
  ) {
    return "Solo se permiten archivos PDF.";
  }
  return null;
}
