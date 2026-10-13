"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

// The reference's product panel carries a position line under the photo, and a
// line that cannot be pressed is a drawing of a control. So this is the one client
// component in the section — the card around it stays a server component and
// hands the photos in as props.
//
// The paging itself is a scroll-snap strip rather than a state machine swapping
// one <Image> for another, which is what makes it behave the way a listing
// carousel is expected to: a thumb swipes it, a trackpad flicks it, and both
// arrive at a photo rather than between two. React only watches — the scroll
// position is the state, and `shown` is read back off it so the dots follow a
// swipe nobody told them about.
export function ListingGallery({
  photos,
  href,
  thumbs = false,
  onShown,
  sizes = "(min-width: 1024px) 360px, (min-width: 640px) 50vw, 90vw",
  className,
}: {
  photos: { src: string; alt: string }[];
  /** Where a slide goes when it is pressed. The card that wraps this stretches
      its own link over everything *except* the gallery — an overlay across a
      scroll strip eats the swipe — so the strip carries the destination
      itself and the card stays clickable end to end. */
  href?: string;
  /** Draws the photo set as a strip of thumbnails under the frame, and drops
      the position line inside it — a strip and a line are the same control
      twice. The card leaves this off; the detail page, where the frame is the
      width of the page and the photos are the section, turns it on. */
  thumbs?: boolean;
  /** Told which photo the strip has landed on, whenever that changes. The
      lightbox is the one caller that needs it — it prints the position in its
      own header, above the frame. */
  onShown?: (i: number) => void;
  /** What the browser is asked to fetch. Defaults to a card-sized frame, which
      is what three of the four callers are. */
  sizes?: string;
  /** The frame's shape, which is the caller's — one card sets an aspect ratio,
      the other a fixed height. The slides fill whatever it is. */
  className?: string;
}) {
  const strip = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);

  const go = (i: number) =>
    strip.current?.scrollTo({
      left: i * strip.current.clientWidth,
      behavior: "smooth",
    });

  const frame = (
    // The panel is the reference's grey inset, kept as a tint rather than as a
    // white well — it is what the photos load onto, and a photo edge against
    // the card's own white would have nothing to sit on.
    <div
      className={cn(
        "group/gallery relative overflow-hidden bg-accent",
        className,
      )}
    >
      <div
        ref={strip}
        // The lightbox opens on the tile that was pressed, and it reaches the
        // strip through this rather than through a prop — the gallery is
        // already mounted by then, so the scroll is the only thing to set.
        data-strip
        onScroll={(e) => {
          const i = Math.round(
            e.currentTarget.scrollLeft / e.currentTarget.clientWidth,
          );
          setShown(i);
          onShown?.(i);
        }}
        className="flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((photo) => (
          <div
            key={photo.src}
            className="relative h-full w-full shrink-0 snap-start"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes={sizes}
              className="object-cover"
            />
            {/* Inert to the keyboard and to a screen reader: the card already
                carries one real link to the same place, and three more of it
                per card is a tab stop for every photograph. This one exists
                for the pointer alone. The arrows and the dot row come later in
                the file and are positioned, so they still take their own
                clicks off the top of it. */}
            {href ? (
              <Link
                href={href}
                tabIndex={-1}
                aria-hidden
                className="absolute inset-0"
              />
            ) : null}
          </div>
        ))}
      </div>

      {/* Airbnb's own scrim, taken at its literal value: transparent for the
          top four fifths, then down to black at a quarter. It darkens only the
          strip of photograph the position line stands on, so the picture keeps
          its brightness everywhere a reader is actually looking — which a pill
          behind the line could not do, because a pill is an object on the photo
          and this is the photo getting darker. Over the whole frame rather than
          the bottom fifth, so the ramp has somewhere to start from. */}
      {thumbs ? null : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_80%,rgba(0,0,0,0.25))]"
        />
      )}

      {/* Arrows on hover, the way a listing carousel does it: a touch screen
          swipes the strip and never sees these, so they are drawn only where a
          pointer exists and only while it is over the card. Each one goes when
          there is nothing left in its direction. */}
      <Arrow
        side="left"
        label="Previous photo"
        onClick={() => go(shown - 1)}
        hidden={shown === 0}
      />
      <Arrow
        side="right"
        label="Next photo"
        onClick={() => go(shown + 1)}
        hidden={shown === photos.length - 1}
      />

      {/* The reference draws the position as a line split into one cell per
          photo, not as dots, and now that the scrim is carrying the contrast
          the line can stand on the photograph bare, the way it does there:
          square cells butted into one 48px bar, and the only difference
          between the cells is which one is at full white. Back up to bottom-3
          — a bare line sits higher than the pill it replaced, which needed the
          extra couple of pixels to stop looking like it was floating. */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-1 z-10 flex justify-center",
          thumbs && "hidden",
        )}
      >
        <div className="pointer-events-auto flex items-center">
          {photos.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Photo ${i + 1} of ${photos.length}`}
              aria-current={i === shown}
              // 20px of height around a 2px bar: the reach is the control's
              // and the drawing is the reference's.
              className="grid h-5 w-5 place-items-center focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              <span
                aria-hidden
                className={cn(
                  "h-[3px] w-full transition-colors",
                  i === shown ? "bg-card" : "bg-card/50",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (!thumbs) return frame;

  // The reference sets its thumbnail strip directly under the photo panel and
  // includes the panel's own photo as the strip's first tile, so the strip is
  // the whole set rather than the remainder. Sized by height and left-aligned
  // rather than stretched across the frame: at the width of the page a third
  // of the strip is 390px, which is a second gallery and not a thumbnail.
  //
  // One cue for the current tile and it is the photograph itself — the others
  // sit back at 55%. A ring would be a second edge on a set of pictures that
  // already have one each.
  return (
    <div className="flex flex-col gap-3">
      {frame}
      <div className="flex gap-2 sm:gap-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Photo ${i + 1} of ${photos.length}`}
            aria-current={i === shown}
            className={cn(
              // Sized by width and an aspect ratio rather than by a height:
              // these are pictures, not controls, and a height on a <button>
              // is what the tap-target rule reads as a control inflated to
              // meet it.
              "relative aspect-[3/2] w-24 shrink-0 overflow-hidden rounded-sm bg-accent transition-opacity sm:w-30",
              "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              i === shown ? "opacity-100" : "opacity-55 hover:opacity-100",
            )}
          >
            {/* alt="" and not the photo's own: the button already says which
                photograph this is, and the frame above carries the description
                once. A second copy is the same picture announced twice. */}
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function Arrow({
  side,
  label,
  onClick,
  hidden,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
  hidden: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      tabIndex={hidden ? -1 : 0}
      className={cn(
        "absolute top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-card/80 backdrop-blur-sm transition-opacity",
        "opacity-0 group-hover/gallery:opacity-100 focus-visible:opacity-100 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
        side === "left" ? "left-3" : "right-3",
        hidden ? "pointer-events-none opacity-0!" : "sm:grid",
      )}
    >
      {side === "left" ? (
        <ChevronLeftIcon className="size-4" aria-hidden />
      ) : (
        <ChevronRightIcon className="size-4" aria-hidden />
      )}
    </button>
  );
}
