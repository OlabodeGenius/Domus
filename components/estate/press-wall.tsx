// The marks are logoipsum placeholders out of public/logos/: free SVG, licensed
// in writing for templates that are sold, and no real publication's trademark
// for the buyer to inherit. The names beside them are invented for the same
// reason — a template that ships a real masthead is shipping a claim it cannot
// support.
//
// Six of the nine files, chosen for aspect ratio rather than for drawing: they
// run 4.2 to 5.8 wide-to-tall, so one height renders a row that looks aligned.
// The ratio is carried here because a mask has no intrinsic size — the box has
// to state it, which is also the style's "size them by height" rule written as
// a number.
const marks = [
  { file: "1.svg", name: "The Harbor Review", ratio: 169 / 40 },
  { file: "9.svg", name: "Bay State Weekly", ratio: 186 / 41 },
  { file: "5.svg", name: "Commonwealth Home", ratio: 240 / 49 },
  { file: "7.svg", name: "North Shore Journal", ratio: 218 / 40 },
  { file: "3.svg", name: "Charles & Main", ratio: 257 / 45 },
  { file: "6.svg", name: "Beacon Property Desk", ratio: 233 / 40 },
];

// The reference is pure black with white marks on it. That field is gone: the
// page already spends a dark ground on the closing band, and a second one this
// high up makes the two argue rather than answer each other.
//
// What the field was doing was fencing — it is what made a sentence and a grid
// read as one object rather than as two things that happen to be adjacent.
// A rule above and a rule below does the same job with no ink to spare, which
// is why the two <Divider>s sit around this section in page.tsx and are part
// of the section's design rather than incidental page furniture. Remove either
// one and the strip goes back to floating.
//
// Contained rather than edge to edge, which is the style's rule for every band
// whose content does not itself bleed — and with the box gone the section is
// simply the page column, so it needs no gutter-cancelling of its own.
export function PressWall() {
  return (
    <section
      id="press"
      className="reveal mx-auto w-full max-w-[1200px] px-6 sm:px-8"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[40fr_60fr] lg:gap-16">
        {/* A statement rather than an eyebrow and a heading: the reference
            spends its left two fifths on one two-line sentence, and this row
            has to earn its place with a fact rather than with "trusted by",
            which is not information. The count is the six marks beside it, so
            the sentence and the grid state the same thing twice — which is
            what makes the grid legible without a label.

            No weight on it, and now that it is page ink rather than light on
            black it needs none: the display rule holds. max-w-[30ch] is what
            breaks it after "up", giving the reference's two even lines. */}
        <p className="max-w-[30ch] text-2xl tracking-tight text-balance md:text-3xl">
          Our listings were written up by these six desks last year.
        </p>

        {/* Bare marks on a shared grid — no rules and no tiles, which is what
            the reference has. text-muted-foreground on the list rather than on
            each mark, because bg-current below reads whatever ink it inherits:
            the marks were full white on the black field and full near-black
            here would out-weigh the sentence they sit beside. A mark is a
            credential, not a headline. */}
        <ul className="grid grid-cols-2 gap-x-8 gap-y-12 text-muted-foreground sm:grid-cols-3">
          {marks.map((mark) => (
            <li key={mark.file} className="flex items-center justify-center">
              {/* Flat, one ink: the file's own near-black is discarded along
                  with everything else that is not shape, and bg-current picks
                  up the list's own colour. The height is fixed and the width
                  follows from the ratio, which is the only way a row of mixed
                  aspect ratios reads as aligned. */}
              <span
                role="img"
                aria-label={mark.name}
                className="block h-6 max-w-[150px] bg-current [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                style={{
                  aspectRatio: mark.ratio,
                  maskImage: `url(/logos/${mark.file})`,
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
