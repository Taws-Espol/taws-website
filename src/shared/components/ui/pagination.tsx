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
 *
 * Every link opts out of scrolling. Next keeps the scroll position only while
 * the Page element is still in the viewport, and this control sits below the
 * grid — so from here the default is to jump to the top of the document and
 * make the reader scroll past the hero again on every page.
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
          scroll={false}
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
              scroll={false}
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
          scroll={false}
          className={buttonVariants({ variant: "secondary", size: "sm" })}
        >
          Siguiente
        </Link>
      ) : null}
    </nav>
  );
}
