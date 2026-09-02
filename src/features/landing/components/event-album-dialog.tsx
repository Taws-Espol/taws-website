"use client";

import { AlbumViewer } from "@/features/landing/components/album-viewer";
import type { Album } from "@/features/landing/types/album";

import { buttonVariants } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";

export function EventAlbumDialog({ album }: { album: Album }) {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({ variant: "secondary", size: "sm" })}
        aria-label={`Ver las ${album.images.length} fotos del álbum ${album.title}`}
      >
        Ver fotos ({album.images.length})
      </DialogTrigger>

      <DialogContent variant="sheet">
        <DialogTitle>{album.title}</DialogTitle>
        <AlbumViewer album={album} />
      </DialogContent>
    </Dialog>
  );
}
