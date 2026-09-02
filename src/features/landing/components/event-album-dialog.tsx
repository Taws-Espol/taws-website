"use client";

import { AlbumViewer } from "@/features/landing/components/album-viewer";
import type { Album } from "@/features/landing/types/album";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Eyebrow } from "@/shared/components/ui/typography";

export function EventAlbumDialog({ album }: { album: Album }) {
  return (
    <Dialog>
      <DialogTrigger
        className="text-primary focus-visible:ring-ring w-fit rounded-sm underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
        aria-label={`Ver las ${album.images.length} fotos del álbum ${album.title}`}
      >
        <Eyebrow>Ver fotos ({album.images.length})</Eyebrow>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogTitle>{album.title}</DialogTitle>
        <AlbumViewer album={album} />
      </DialogContent>
    </Dialog>
  );
}
