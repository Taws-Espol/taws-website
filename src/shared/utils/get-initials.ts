/**
 * The two letters that stand in for someone whose photo we do not have.
 * Spanish names often run to four parts; the first two are the ones people
 * recognise, and the rest would only crowd a thirty-two pixel circle.
 */
export function getInitials(fullName: string) {
  return fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toLocaleUpperCase("es") ?? "")
    .join("");
}
