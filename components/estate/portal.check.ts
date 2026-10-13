// Runs as part of `npm run check`, beside `area-spots.check.ts`.
//
// One check, for the one thing reading cannot confirm. The portal home's map
// places every listing inside its own area's block on the drawn plan, and it
// leans on two facts that live in two different files. The first is now a type
// — `Home["area"]` is `AreaName`, so a home the plan has no block for will not
// compile. The second is this: the six blocks in `areas.ts` do not overlap
// each other.
//
// That one is invisible everywhere it matters. Two blocks sharing a corner is
// a plausible drawing, it renders without complaint, and the only symptom is
// two pins from two neighborhoods landing on the same pixel — one home a
// reader can never press, on a map of twenty-one. Nudging a plot is exactly
// the sort of edit somebody makes to improve the drawing.
//
// It imports `areas.ts` alone, which is the file with no imports of its own —
// `node --experimental-strip-types` does not resolve the project's `@/` alias,
// so a check that reached the book through `listings.ts` would not run at all.
import assert from "node:assert/strict";
import { areas } from "./areas.ts";

const apart = (a: (typeof areas)[number], b: (typeof areas)[number]) =>
  a.plot.x + a.plot.w <= b.plot.x ||
  b.plot.x + b.plot.w <= a.plot.x ||
  a.plot.y + a.plot.h <= b.plot.y ||
  b.plot.y + b.plot.h <= a.plot.y;

let pairs = 0;

for (let i = 0; i < areas.length; i += 1) {
  for (let j = i + 1; j < areas.length; j += 1) {
    assert.ok(
      apart(areas[i], areas[j]),
      `${areas[i].name} and ${areas[j].name} overlap on the plan — pins in both would collide`,
    );
    pairs += 1;
  }
}

// And inside the drawing's own frame, which `area-plan.tsx` sets as its
// viewBox. A block hanging off the edge takes its pins with it.
for (const area of areas) {
  assert.ok(
    area.plot.x >= 0 &&
      area.plot.y >= 0 &&
      area.plot.x + area.plot.w <= 800 &&
      area.plot.y + area.plot.h <= 620,
    `${area.name} runs outside the plan's 800×620 frame`,
  );
}

console.log(`ok — ${pairs} plot pairs clear of each other, all six inside the frame`);
