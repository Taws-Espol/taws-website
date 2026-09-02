import type { Access } from "payload";

import { checkRole } from "../utils/check-role.ts";

export const isAdminEditorOrBlogger: Access = ({ req: { user } }) =>
  checkRole(["admin", "editor", "blogger"], user);
