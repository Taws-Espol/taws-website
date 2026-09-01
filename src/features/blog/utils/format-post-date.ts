export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("es-EC", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "America/Guayaquil",
  }).format(new Date(date));
}
