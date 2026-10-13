"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Album02Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ListingGallery } from "@/components/estate/listing-gallery";
import { reach } from "@/components/reach";
import { cn } from "@/lib/utils";

// The reference opens on a tiled photo set rather than on one frame with a
// carousel under it, and a tile a reader presses has to go somewhere. So the
// mosaic is the lid and the gallery this site already owns is what it opens —
// same strip, same thumbnails, same keyboard behaviour, lifted onto a native
// <dialog>. Escape, the focus trap and the backdrop come with the element; the
// only thing written here is the click that opens it and the click on the
// backdrop that shuts it.
export function PhotoMosaic({
  photos,
  className,
}: {
  photos: { src: string; alt: string }[];
  className?: string;
}) {
  const sheet = useRef<HTMLDialogElement>(null);
  // The gallery keeps its own scroll position; this is a copy of it, so the
  // count in the sheet's header can say which photograph is under the reader.
  const [shown, setShown] = useState(0);
  const open = (i: number) => {
    setShown(i);
    sheet.current?.showModal();
    // The gallery mounts at its first slide, so the pressed tile is scrolled
    // to after the sheet has a width to scroll within.
    requestAnimationFrame(() => {
      const strip = sheet.current?.querySelector<HTMLElement>("[data-strip]");
      if (strip) strip.scrollLeft = i * strip.clientWidth;
    });
  };

  // Four tiles at most, whatever the set holds: the lid at half the width
  // across both rows, one wide tile over two narrow ones beside it. Anything
  // past the fourth photograph lives behind the count in the corner, which is
  // how every listing site handles a set of thirty.
  //
  // Every home on the book carries four. A shorter set falls back to two
  // columns, because the four-up leaves a hole the moment a tile is missing
  // and a buyer editing this data down to three should not meet that hole.
  //
  // On a phone the fourth tile comes off and the lid runs the full width: a
  // quarter of 390px is a 78px photograph, which is a thumbnail of a room
  // rather than a picture of one.
  const tiles = photos.slice(0, 4);
  const four = tiles.length === 4;
  const span = four
    ? ["col-span-2 sm:row-span-2", "sm:col-span-2", "", "hidden sm:block"]
    : tiles.map((_, i) => (i === 0 || tiles.length === 2 ? "row-span-2" : ""));

  return (
    <>
      <div className={cn("relative", className)}>
        <div
          className={cn(
            "grid h-105 grid-cols-2 grid-rows-2 gap-2 sm:h-130 sm:gap-3",
            four && "sm:grid-cols-4",
          )}
        >
          {tiles.map((photo, i) => (
            <Tile
              key={photo.src}
              photo={photo}
              onClick={() => open(i)}
              className={span[i]}
            />
          ))}
        </div>

        {/* The count, where every listing site puts it: the low corner of the
            set, on glass so it survives whatever the photograph is doing
            underneath. Positioned rather than placed in the grid, or it would
            take a cell and leave one photograph with nowhere to go. */}
        <button
          type="button"
          onClick={() => open(0)}
          // Named here rather than left to the label, which is gone on a phone:
          // a circle with a picture in it is the whole control at that width.
          aria-label={`All ${photos.length} photos`}
          className={cn(
            // reach first: it carries `relative`, and this control is
            // positioned. Written the other way round tailwind-merge keeps the
            // later `relative` and the pill lands in the page's flow.
            reach,
            "absolute right-4 bottom-4",
            // A 40px circle on a phone and the labelled pill from `sm` up: at
            // 390px the photo set is the screen, and a pill with four words in
            // it sits across the bottom of a photograph rather than in its
            // corner.
            "inline-flex items-center justify-center gap-2 rounded-full bg-card/85 text-sm backdrop-blur-sm transition-colors",
            "size-10 sm:size-auto sm:px-4 sm:py-2",
            "hover:bg-card focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
          )}
        >
          <HugeiconsIcon
            icon={Album02Icon}
            size={16}
            strokeWidth={1.5}
            aria-hidden
          />
          <span className="hidden sm:inline">All {photos.length} photos</span>
        </button>
      </div>

      <dialog
        ref={sheet}
        aria-label="Photographs of this home"
        onClick={(e) => {
          if (e.target === sheet.current) sheet.current.close();
        }}
        className={cn(
          "m-auto w-[min(94vw,1040px)] rounded-lg bg-card p-3 shadow-soft-lg",
          "backdrop:bg-foreground/60 backdrop:backdrop-blur-sm",
        )}
      >
        {/* The header the reference gives a lightbox: where you are in the set
            on one side, the way out on the other. The count is the only thing
            in here that has to be told what the gallery is doing, which is why
            the strip reports its position back up. */}
        <div className="mb-2 flex items-center justify-between">
          <p className="pl-2 text-sm tabular-nums text-muted-foreground">
            {shown + 1}/{photos.length}
          </p>
          <button
            type="button"
            onClick={() => sheet.current?.close()}
            className="inline-flex h-9 items-center gap-2 rounded-full px-3 text-sm transition-colors hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <HugeiconsIcon
              icon={Cancel01Icon}
              size={18}
              strokeWidth={1.5}
              aria-hidden
            />
            Close
          </button>
        </div>
        <ListingGallery
          photos={photos}
          thumbs
          onShown={setShown}
          sizes="(min-width: 1100px) 1000px, 94vw"
          className="aspect-[3/2] rounded-sm"
        />
      </dialog>
    </>
  );
}

function Tile({
  photo,
  onClick,
  className,
}: {
  photo: { src: string; alt: string };
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-sm bg-accent",
        "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        className,
      )}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 1024px) 40vw, 90vw"
        // The photograph dims under the pointer rather than growing into its
        // own frame: a set of four tiles butted together has nowhere to grow
        // to, and the crop shifting under a reader is the cost of the zoom.
        className="object-cover transition-[filter] duration-300 group-hover:brightness-[0.85]"
      />
    </button>
  );
}
