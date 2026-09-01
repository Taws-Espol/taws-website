"use client";

import Image from "next/image";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { useAlbumViewer } from "@/features/landing/hooks/use-album-viewer";
import type { Album } from "@/features/landing/types/album";
import { getAlbumImage } from "@/features/landing/utils/get-album-image";
import { Button } from "@/shared/components/ui/button";
import { Eyebrow, Text } from "@/shared/components/ui/typography";

export function AlbumViewer({ album }: { album: Album }) {
  const { index, goToPrevious, goToNext } = useAlbumViewer(album.images.length);

  const current = getAlbumImage(album.images[index]);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-muted relative aspect-[3/2] overflow-hidden rounded-xl">
        {current.url ? (
          <Image
            src={current.url}
            alt={current.alt}
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-contain"
          />
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Imagen anterior"
          onClick={goToPrevious}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} aria-hidden="true" />
        </Button>

        <div className="flex flex-col items-center gap-1 text-center">
          {current.caption ? (
            <Text variant="small">{current.caption}</Text>
          ) : null}

          <Eyebrow aria-live="polite" className="text-foreground/50">
            {index + 1} de {album.images.length}
          </Eyebrow>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Imagen siguiente"
          onClick={goToNext}
        >
          <HugeiconsIcon icon={ArrowRight01Icon} aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
