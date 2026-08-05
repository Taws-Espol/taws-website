type TryCatchInput<T> = Promise<T> | (() => Promise<T>);

type TryCatchResult<T> =
  { data: T; error: null } | { data: null; error: Error };

export const tryCatch = async <T>(
  input: TryCatchInput<T>,
): Promise<TryCatchResult<T>> => {
  try {
    const data = await (typeof input === "function" ? input() : input);
    return { data, error: null };
  } catch (_error) {
    const error = _error instanceof Error ? _error : new Error(String(_error));
    return { data: null, error };
  }
};
