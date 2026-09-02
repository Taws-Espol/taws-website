import { AlbumCard } from "@/features/landing/components/album-card";
import { getAlbums } from "@/features/landing/queries/get-albums";

import { Section } from "@/shared/components/ui/section";
import { Heading, Text } from "@/shared/components/ui/typography";

export default async function Page() {
  const albums = await getAlbums();

  return (
    <Section as="main">
      <div className="flex flex-col gap-10">
        <Heading as="h1" variant="display">
          Galería
        </Heading>

        {albums.length === 0 ? (
          <Text className="text-foreground/60">
            Todavía no hay álbumes publicados.
          </Text>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
