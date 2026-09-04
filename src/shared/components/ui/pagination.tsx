import Link from "next/link";

import { buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/utils/cn";

function href(basePath: string, page: number) {
  return page === 1 ? basePath : `${basePath}?page=${page}`;
}

/**
 * Page navigation as links, so a page can be opened in a new tab and a crawler
 * can follow it. The first page is the bare path rather than `?page=1`, so
 * there is only ever one URL for it.
 */
export function Pagination({
  basePath,
  page,
  totalPages,
  label,
}: {
  basePath: string;
  page: number;
  totalPages: number;
  label: string;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label={label} className="flex items-center justify-center gap-2">
      {page > 1 ? (
        <Link
          href={href(basePath, page - 1)}
          rel="prev"
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          Anterior
        </Link>
      ) : null}

      <ul className="flex items-center gap-1">
        {pages.map((number) => (
          <li key={number}>
            <Link
              href={href(basePath, number)}
              aria-current={number === page ? "page" : undefined}
              aria-label={`Página ${number}`}
              className={cn(
                buttonVariants({
                  variant: number === page ? "default" : "ghost",
                  size: "icon-sm",
                }),
              )}
            >
              {number}
            </Link>
          </li>
        ))}
      </ul>

      {page < totalPages ? (
        <Link
          href={href(basePath, page + 1)}
          rel="next"
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          Siguiente
        </Link>
      ) : null}
    </nav>
  );
}
