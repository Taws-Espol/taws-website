import type { Access } from "payload";

import { checkRole } from "../utils/check-role.ts";

export const isAdminOrEditor: Access = ({ req: { user } }) =>
  checkRole(["admin", "editor"], user);
