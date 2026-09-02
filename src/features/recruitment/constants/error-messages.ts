import type { SubmitApplicationCode } from "@/features/recruitment/actions/submit-application";

export const ERROR_MESSAGES: Record<SubmitApplicationCode, string> = {
  "invalid-input": "Revisa los datos del formulario e inténtalo de nuevo.",
  "window-closed": "La convocatoria se cerró mientras llenabas el formulario.",
  "rate-limited": "Ya enviaste varias postulaciones. Intenta más tarde.",
  unknown: "No pudimos enviar tu postulación. Inténtalo de nuevo.",
};
