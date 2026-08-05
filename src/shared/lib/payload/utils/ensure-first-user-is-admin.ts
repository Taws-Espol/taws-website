import type { FieldHook } from "payload";

export const ensureFirstUserIsAdmin: FieldHook = async ({
  req,
  operation,
  value,
}) => {
  if (operation === "create") {
    const users = await req.payload.find({ collection: "users", limit: 1 });
    if (users.totalDocs === 0) return "admin";
    if (!value) return "viewer";
  }
  return value;
};
