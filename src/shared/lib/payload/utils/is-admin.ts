import type { Access } from "payload";

import { checkRole } from "../utils/check-role.ts";

export const isAdmin: Access = ({ req: { user } }) =>
  checkRole(["admin"], user);
