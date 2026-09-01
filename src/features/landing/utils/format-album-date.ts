export function formatAlbumDate(date: string) {
  return new Intl.DateTimeFormat("es-EC", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Guayaquil",
  }).format(new Date(date));
}
