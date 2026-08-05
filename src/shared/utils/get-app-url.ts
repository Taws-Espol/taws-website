export function getAppUrl() {
  const rawUrl =
    process.env.COOLIFY_URL?.split(",")[0] ||
    process.env.APP_URL?.split(",")[0];

  // Use || to ensure empty strings ("") trigger the fallback
  return new URL(rawUrl || "http://localhost:3000");
}
