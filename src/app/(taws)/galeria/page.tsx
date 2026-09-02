import { AlbumCard } from "@/features/landing/components/album-card";
import { getAlbums } from "@/features/landing/queries/get-albums";

import { GalleryIllustration } from "@/shared/components/illustrations/gallery-illustration";
import { PageHeader } from "@/shared/components/page-header";
import { Section } from "@/shared/components/ui/section";
import { Text } from "@/shared/components/ui/typography";

export default async function Page() {
  const albums = await getAlbums();

  return (
    <main>
      <PageHeader
        eyebrow="Galería"
        title="Cómo se ve el club por dentro"
        description="Fotos de eventos, sesiones de trabajo y todo lo que pasó entre semestre y semestre."
        illustration={<GalleryIllustration />}
      />

      <Section>
        {albums.length === 0 ? (
          <Text className="text-muted-foreground">
            Todavía no hay álbumes publicados.
          </Text>
        ) : (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
