import { notFound } from "next/navigation";

import { AlbumCard } from "@/features/landing/components/album-card";
import { countAlbums } from "@/features/landing/queries/count-albums";
import { getAlbumsPage } from "@/features/landing/queries/get-albums-page";

import { Pagination } from "@/shared/components/ui/pagination";
import { Text } from "@/shared/components/ui/typography";
import { ITEMS_PER_PAGE } from "@/shared/constants/pagination";
import { getAppUrl } from "@/shared/utils/get-app-url";
import { resolvePage } from "@/shared/utils/resolve-page";

type AlbumGridProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export async function AlbumGrid({ searchParams }: AlbumGridProps) {
  const { page: raw } = await searchParams;
  const total = await countAlbums();
  const resolved = resolvePage({ raw, total, perPage: ITEMS_PER_PAGE });

  if (!resolved) notFound();

  const albums = await getAlbumsPage({
    offset: resolved.offset,
    limit: ITEMS_PER_PAGE,
  });

  if (albums.length === 0) {
    return (
      <Text className="text-muted-foreground">
        Todavía no hay álbumes publicados.
      </Text>
    );
  }

  const canonical = new URL(
    resolved.page === 1 ? "/galeria" : `/galeria?page=${resolved.page}`,
    getAppUrl(),
  ).toString();

  return (
    <div className="flex flex-col gap-16">
      <link rel="canonical" href={canonical} />

      <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>

      <Pagination
        basePath="/galeria"
        page={resolved.page}
        totalPages={resolved.totalPages}
        label="Paginación de la galería"
      />
    </div>
  );
}
