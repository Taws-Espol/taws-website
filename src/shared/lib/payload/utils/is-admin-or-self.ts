import type { Access } from "payload";

import { checkRole } from "../utils/check-role.ts";

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (checkRole(["admin"], user)) return true;
  return { id: { equals: user.id } };
};
