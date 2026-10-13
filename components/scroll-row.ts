// A row of pills that scrolls sideways instead of wrapping, and only below sm.
// Wrapping is right on a desktop control row and wrong on a phone: four or five
// filter pills stack into three lines there and push the results they filter
// off the first screen, where one scrolling line costs nothing and still reads
// as a row. The bar is hidden — a native scrollbar under a row of pills is the
// tell that this was a desktop layout left to cope.
//
// `w-full` because the row usually sits in a wrapping flex beside a sort or a
// filter button: without it the track is sized to its own content and overflows
// the line rather than scrolling inside it. The pills carry `shrink-0`
// themselves — a pill squeezed narrow enough to fit is the failure this is
// replacing, not the fix.
//
// py-1/-my-1 is room for a focus ring. A scroll container clips on both axes,
// and `ring-3` on the first or last pill is drawn outside the pill's own box;
// the padding gives it somewhere to land and the margin takes the space back.
export const scrollRow =
  "flex w-full overflow-x-auto py-1 -my-1 [scrollbar-width:none] sm:w-auto sm:flex-wrap sm:overflow-visible [&::-webkit-scrollbar]:hidden";
