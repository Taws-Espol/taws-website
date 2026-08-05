import type { FieldAccess } from "payload";

import { checkRole } from "../utils/check-role.ts";

export const isAdminFieldAccess: FieldAccess = ({ req: { user } }) =>
  checkRole(["admin"], user);
