// Runs as the last step of `npm run check`.
//
// One check, for the one rule reading cannot confirm. `area-spots.tsx` prints a
// spot's note as two things — a qualifier on the left and a walking time set at
// display size on the right — and it gets them by splitting the string on its
// one `·`. That separator is a convention across twenty-four notes in
// `areas.ts`, and a convention with no check is a tile that quietly renders an
// empty figure the day somebody writes a note without one, or a second one.
import assert from "node:assert/strict";
import { areas, spotParts } from "./areas.ts";

let checked = 0;

for (const area of areas) {
  for (const spot of area.spots) {
    const where = `${area.name} · ${spot.name}`;

    assert.equal(
      spot.note.split(" · ").length,
      2,
      `note is not one qualifier and one walk — ${where}: "${spot.note}"`,
    );

    const { detail, walk } = spotParts(spot.note);
    assert.ok(detail.length > 0, `no qualifier — ${where}`);
    // The tile sets this at text-3xl beside a sentence, so it has to be a
    // duration and not a clause: a figure, the word min, and at most one word
    // after it.
    assert.match(walk, /^\d+ min( walk)?$/, `walk is not a duration — ${where}: "${walk}"`);
    checked += 1;
  }
}

console.log(`ok — ${checked} spot notes split into a qualifier and a walk`);
