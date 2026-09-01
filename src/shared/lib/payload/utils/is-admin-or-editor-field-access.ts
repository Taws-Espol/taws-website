import type { FieldAccess } from "payload";

import { checkRole } from "../utils/check-role.ts";

export const isAdminOrEditorFieldAccess: FieldAccess = ({ req: { user } }) =>
  checkRole(["admin", "editor"], user);
