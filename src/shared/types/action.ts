/**
 * Error returned by a server action.
 *
 * Only `code` (machine-readable) and `message` (internal, for logs).
 * Callers map `code` to UI: i18n, which form fields to highlight, etc.
 */
export type ActionError<Code extends string = string> = {
  code: Code;
  /** Internal, English-only. Not shown to users. */
  message: string;
};

export type ActionResponse<T, Code extends string = string> =
  { data: T; error: null } | { data: null; error: ActionError<Code> };
