type ResolvePageArgs = {
  raw: string | string[] | undefined;
  total: number;
  perPage: number;
};

export type ResolvedPage = {
  page: number;
  totalPages: number;
  offset: number;
};

/**
 * Decides which page of a listing was asked for, or that no such page exists.
 *
 * Returning null rather than clamping is the point: a page number nobody can
 * reach should say so, instead of quietly showing the last page under a URL
 * that claims to be a different one.
 *
 * An empty collection still has a first page, so a section with nothing
 * published yet renders its empty state instead of disappearing.
 */
export function resolvePage({
  raw,
  total,
  perPage,
}: ResolvePageArgs): ResolvedPage | null {
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  if (raw === undefined) {
    return { page: 1, totalPages, offset: 0 };
  }

  // A repeated query parameter arrives as an array, which is nobody's intent.
  if (typeof raw !== "string" || !/^\d+$/.test(raw)) return null;

  const page = Number(raw);

  if (page < 1 || page > totalPages) return null;

  return { page, totalPages, offset: (page - 1) * perPage };
}
