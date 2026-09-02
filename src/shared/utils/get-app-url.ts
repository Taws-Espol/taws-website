export function getAppUrl() {
  const rawUrl =
    process.env.COOLIFY_URL?.split(",")[0] ||
    process.env.APP_URL?.split(",")[0];

  return new URL(rawUrl || "http://localhost:3000");
}
