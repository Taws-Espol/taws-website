/**
 * The six things the club actually does. This module stays free of UI so the
 * Payload config can import it; the icons live beside it in `work-area-icons`.
 */
export const WORK_AREAS = [
  {
    value: "web",
    label: "Web",
    description: "Aplicaciones y plataformas que corren en el navegador.",
  },
  {
    value: "mobile",
    label: "Móvil",
    description: "Apps nativas y multiplataforma para Android e iOS.",
  },
  {
    value: "machine-learning",
    label: "Machine learning",
    description: "Modelos que aprenden de los datos y resuelven tareas.",
  },
  {
    value: "data-science",
    label: "Data science",
    description: "Análisis, visualización y decisiones basadas en datos.",
  },
  {
    value: "iot",
    label: "IoT",
    description: "Hardware conectado, sensores y sistemas embebidos.",
  },
  {
    value: "research",
    label: "Investigación",
    description: "Publicaciones, papers y colaboración académica.",
  },
] as const satisfies readonly {
  value: string;
  label: string;
  description: string;
}[];

export type WorkAreaValue = (typeof WORK_AREAS)[number]["value"];

export function getWorkAreaPayloadOptions() {
  return WORK_AREAS.map(({ value, label }) => ({
    label,
    value,
  }));
}
