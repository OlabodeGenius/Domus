import {
  Agreement02Icon,
  Clock01Icon,
  UserAccountIcon,
  Wallet01Icon,
} from "@hugeicons/core-free-icons";
import { areas } from "@/components/estate/areas";
import { reach } from "@/components/reach";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// The field set is The Agency's, which was the fullest of the three sites read:
// name, email, phone, best time to call, area of interest, message. The middle
// two are what make it a brokerage form rather than a generic contact box — a
// viewing is a phone call at a particular hour about a particular place.
//
// Three layouts render this, so it lives once. Only one is mounted at a time,
// so the ids below cannot collide.

// Read off the book rather than typed a second time. The seven strings here
// were the six area names in the six areas' own order plus an escape hatch, so
// a buyer renaming one in `areas.ts` was renaming it in one of the two places
// this site prints it — and the dropdown was the copy nobody would think to
// check.
export const areaOptions = [
  ...areas.map((area) => area.name),
  "Somewhere else",
];
const times = ["Morning", "Afternoon", "Evening", "Any time"];

// Exported: the off-market list's single field used to be the same pill, and
// two copies of a focus ring is how two of them end up different. That section
// is off the page now, so the export has one caller again — kept because the
// next form on the next page is the same control, not a second design of it.
// border-border spelled out rather than left to `border`: shadcn's own
// SelectTrigger opens with border-input, and --input is hsl(30 5% 84%) against
// --border's 94% — a full ten points darker. Merging `border` over it only sets
// the width, so the two dropdowns were drawing a visibly heavier outline than
// the three inputs beside them. The colour has to be named to win.
//
// h-10 rather than py-2.5: 40px flat, and a height that is stated is a height
// the trigger cannot drift from when its own text size changes. 40 is also
// shadcn's own default for the select trigger, so the dropdowns need no height
// override at all now — the two controls agree by arithmetic rather than by a
// class fighting an attribute selector. The textarea asks for h-auto back,
// since rows={3} is what sizes it.
export const field =
  "mt-2 h-10 w-full rounded-full border border-border bg-card px-5 text-base outline-none transition-colors " +
  "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function BookingForm({
  className,
  area = "Brookline",
}: {
  className?: string;
  /** Which neighborhood the picker opens on. An area's own page passes its
      own, so a visitor who has read one page all the way down does not have to
      tell the form what they were reading. */
  area?: string;
}) {
  return (
    <form className={cn("grid gap-5 sm:grid-cols-2", className)}>
      <label className="block">
        <span className="text-sm font-medium">Name</span>
        {/* text-base rather than text-sm on every input: iOS Safari zooms the
            page when focus lands on anything smaller. */}
        <input
          id="book-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          className={field}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Email</span>
        <input
          id="book-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={field}
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium">Phone</span>
        <input
          id="book-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(617) 555-0000"
          className={field}
        />
      </label>
      {/* Not a native <select>. The hero search made this call already and
          wrote down why: the OS list is the one control on the page that does
          not belong to the design, and it is the control a visitor is most
          likely to open. These two were still drawing it. A <label> cannot
          wrap a button and mean anything, so the visible text is tied to the
          trigger by id instead. */}
      <Picker
        id="book-time"
        name="time"
        label="Best time to call"
        options={times}
        initial="Any time"
      />
      <Picker
        id="book-area"
        name="area"
        label="Area you are looking in"
        options={areaOptions}
        initial={area}
        className="sm:col-span-2"
      />
      <label className="block sm:col-span-2">
        <span className="text-sm font-medium">Anything we should know</span>
        <textarea
          id="book-message"
          name="message"
          rows={3}
          placeholder="A street, a school district, a moving date, whatever matters."
          className={cn(field, "h-auto rounded-lg py-2.5")}
        />
      </label>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
        {/* Drawn at 36 with the hit area pushed back out to 40 — which is now
            exactly the fields' own height, so the button reaches as far as
            anything above it while still drawing lighter than a field. */}
        <Button type="submit" className={cn(reach, "rounded-full")}>
          Book a viewing
        </Button>
        <p className="text-sm text-muted-foreground">
          No obligation, and no fee until a sale completes.
        </p>
      </div>
    </form>
  );
}

// The form's two dropdowns, drawn in the page's own pill rather than the
// operating system's. `field` carries the shape; the trigger's own height and
// text-sm are the two defaults that have to be pushed out of the way for it.
// No height override any more: shadcn's own data-[size=default]:h-10 is the
// 40 the fields take, and it wins on specificity over `field`'s bare h-10
// anyway — two routes to the same number, so the shorter one stays.
//
// pe-4 over `field`'s px-5: an arrow is not a letter, and 20px of air behind a
// 16px glyph reads as a gap rather than an edge. The same 4 the button takes
// when it carries a trailing icon, so every pill with something at its end
// stops in the same place.
export function Picker({
  id,
  name,
  label,
  options,
  initial,
  className,
}: {
  id: string;
  name: string;
  label: string;
  options: readonly string[];
  initial: string;
  className?: string;
}) {
  return (
    <div className={cn("block", className)}>
      <span id={`${id}-label`} className="text-sm font-medium">
        {label}
      </span>
      <Select name={name} defaultValue={initial}>
        <SelectTrigger
          id={id}
          aria-labelledby={`${id}-label`}
          className={cn(field, "cursor-pointer pe-4")}
        >
          <SelectValue />
        </SelectTrigger>
        {/* Item-aligned, which is Base UI's default and the behaviour worth
            keeping: the panel lands *over* the field with the chosen row on
            the value it replaces. What it aligns is the two pieces of **text**,
            not the two boxes — so the panel only sits square on the field when
            the row's text inset matches the trigger's. Ours did not: the
            trigger is a pill at px-5, so its value starts 21px in (1 border +
            20 padding), while a row's text started at 10px (the popup's p-1
            plus the item's own pl-1.5). The panel shifted 11px right to close
            that gap — exactly the difference.
            shadcn's own demo never shows this because its trigger is pl-2.5:
            11px against the row's 10, and one pixel is invisible. The fix is
            arithmetic, not a different alignment mode — see the row's pl-4
            below, which puts the text at 4 + 16 = 20 against the trigger's 21. */}
        <SelectContent className="p-1">
          <SelectGroup className="p-0">
            {options.map((option) => (
              <SelectItem
                key={option}
                value={option}
                // pl-4 rather than the default pl-1.5: this is the number
                // that lines the row up under the trigger's own value. See
                // the note on SelectContent above.
                className="rounded-full py-2 pl-4 text-base"
              >
                {option}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export const copy = {
  eyebrow: "Book a viewing",
  heading: "Tell us the street and we will open the door",
  lede: "An agent replies within two hours, in person rather than by autoresponder. If nothing on the site fits, say so. Most of what we sell is not on it yet.",
  // One icon per line, and four distinct ideas rather than four checkmarks:
  // a checkmark repeated down a list says only that the list is a list, and
  // these four say a clock, a person, a contract and a fee.
  reassurances: [
    { icon: Clock01Icon, line: "An agent replies within 2 hours" },
    { icon: UserAccountIcon, line: "One agent, first call to closing" },
    { icon: Agreement02Icon, line: "No obligation to list or to buy" },
    { icon: Wallet01Icon, line: "No fee until the sale completes" },
  ],
} as const;
