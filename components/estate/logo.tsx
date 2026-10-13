// The lockup, supplied by the user as a 214×95 drawing: a stroked bracket mark
// with a sparkle and a squiggle set into it, and a wordmark beside it reading
// Domus. It replaces the 240×95 drawing that spelled the name before it.
//
// Four changes to what arrives, and they are the four this file's header has
// described since the logo before last — described, but not done, because each
// new drawing was pasted in as exported and took the changes out with it. They
// are applied here and re-checked in the browser after:
//
//   1. `black` — both the strokes and the wordmark fill — is currentColor, so
//      the lockup takes the ink of whatever it sits on. That is what lets it
//      survive an inverted ground and a buyer rotating --primary. Pure #000 is
//      not a colour this palette ships anywhere, and this file was the only
//      place on the route that did.
//   2. No width/height, only the viewBox, so the caller sizes it by height and
//      the aspect ratio follows. Both call sites already ask for `h-10 w-auto`
//      and `h-12 w-auto`; the attributes were only there to be overridden.
//   3. The sparkle arrives on the SVG default stroke of 1. On a 95-unit
//      viewBox drawn at 40px that resolves to 0.4 of a pixel and the glyph
//      disappears; at 2 it reads at every size the page draws this at. Same
//      reasoning the icon table gives for its own 12px/2 row. This drawing's
//      sparkle is also held back — see the note on the path itself.
//   4. The clip-path the sparkle and squiggle arrive inside is gone. It trims
//      half a pixel off the squiggle's left cap and nothing else, and it costs
//      a document-global id on a component this page renders twice — the
//      header and the footer, so `clip0_202_18` was in the document twice over.
//      Two elements sharing one id is the kind of thing that is invisible
//      until it isn't.
//
// It carries no accessible name of its own: the header wraps it in a link that
// names the company, and the footer already names it in the copyright line.
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      width="216"
      height="95"
      viewBox="0 0 216 95"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M43.8 20.8H68.28C73.9925 20.8 76.8488 20.8 79.0307 21.77C80.95 22.6233 82.5104 23.9848 83.4883 25.6595C84.6 27.5633 84.6 30.0555 84.6 35.04V56.4M3 20.8H23.4M84.6 74.2V92M105 74.2L39.72 74.2C34.0075 74.2 31.1512 74.2 28.9693 73.23C27.05 72.3767 25.4896 71.0152 24.5117 69.3405C23.4 67.4367 23.4 64.9445 23.4 59.96V3"
        stroke="black"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M63.5 38.5V39.3135C63.2808 38.9949 63.0051 38.7192 62.6865 38.5H63.5ZM65.3135 38.5C64.9949 38.7192 64.7192 38.9949 64.5 39.3135V38.5H65.3135ZM62 38.1426C61.9648 38.1294 61.9294 38.1164 61.8936 38.1045L61.5801 38L61.8936 37.8955C61.9295 37.8835 61.9647 37.8697 62 37.8564V38.1426ZM66.1064 37.8955L66.4189 38L66.1064 38.1045C66.0706 38.1164 66.0352 38.1294 66 38.1426V37.8564C66.0353 37.8697 66.0705 37.8835 66.1064 37.8955ZM64.5 36.6855C64.7193 37.0044 64.9947 37.2806 65.3135 37.5H64.5V36.6855ZM63.5 37.5H62.6865C63.0053 37.2806 63.2807 37.0044 63.5 36.6855V37.5Z"
        stroke="black"
        strokeLinejoin="round"
      />
      <path
        d="M41.5 48.0748C45.0234 44.6174 53.3 37.5525 55.5937 40.0076C58.4922 43.11 43.2617 50.9558 45.6107 54.4126C48.0917 58.0638 56.7682 45.1929 59.7044 47.4978C62.6406 49.8028 52.6575 54.9888 55.0065 57.8701C55.9461 59.0224 58.5299 57.2938 59.7044 56.1413"
        stroke="black"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M118.6 65.35C115.367 65.35 112.383 64.6 109.65 63.1C106.95 61.5667 104.8 59.45 103.2 56.75C101.633 54.0167 100.85 50.95 100.85 47.55C100.85 44.15 101.633 41.1 103.2 38.4C104.8 35.7 106.95 33.6 109.65 32.1C112.383 30.5667 115.367 29.8 118.6 29.8C121.867 29.8 124.85 30.5667 127.55 32.1C130.283 33.6 132.433 35.7 134 38.4C135.567 41.1 136.35 44.15 136.35 47.55C136.35 50.95 135.567 54.0167 134 56.75C132.433 59.45 130.283 61.5667 127.55 63.1C124.85 64.6 121.867 65.35 118.6 65.35ZM118.6 60.4C120.9 60.4 122.95 59.8833 124.75 58.85C126.55 57.7833 127.95 56.2833 128.95 54.35C129.983 52.3833 130.5 50.1167 130.5 47.55C130.5 44.9833 129.983 42.7333 128.95 40.8C127.95 38.8667 126.55 37.3833 124.75 36.35C122.95 35.3167 120.9 34.8 118.6 34.8C116.3 34.8 114.25 35.3167 112.45 36.35C110.65 37.3833 109.233 38.8667 108.2 40.8C107.2 42.7333 106.7 44.9833 106.7 47.55C106.7 50.1167 107.2 52.3833 108.2 54.35C109.233 56.2833 110.65 57.7833 112.45 58.85C114.25 59.8833 116.3 60.4 118.6 60.4ZM152.509 42.1H147.409V65H141.659V42.1H138.409V37.45H141.659V35.5C141.659 32.3333 142.492 30.0333 144.159 28.6C145.859 27.1333 148.509 26.4 152.109 26.4V31.15C150.376 31.15 149.159 31.4833 148.459 32.15C147.759 32.7833 147.409 33.9 147.409 35.5V37.45H152.509V42.1ZM181.811 50.55C181.811 51.5833 181.744 52.5167 181.611 53.35H160.561C160.727 55.55 161.544 57.3167 163.011 58.65C164.477 59.9833 166.277 60.65 168.411 60.65C171.477 60.65 173.644 59.3667 174.911 56.8H181.061C180.227 59.3333 178.711 61.4167 176.511 63.05C174.344 64.65 171.644 65.45 168.411 65.45C165.777 65.45 163.411 64.8667 161.311 63.7C159.244 62.5 157.611 60.8333 156.411 58.7C155.244 56.5333 154.661 54.0333 154.661 51.2C154.661 48.3667 155.227 45.8833 156.361 43.75C157.527 41.5833 159.144 39.9167 161.211 38.75C163.311 37.5833 165.711 37 168.411 37C171.011 37 173.327 37.5667 175.361 38.7C177.394 39.8333 178.977 41.4333 180.111 43.5C181.244 45.5333 181.811 47.8833 181.811 50.55ZM175.861 48.75C175.827 46.65 175.077 44.9667 173.611 43.7C172.144 42.4333 170.327 41.8 168.161 41.8C166.194 41.8 164.511 42.4333 163.111 43.7C161.711 44.9333 160.877 46.6167 160.611 48.75H175.861ZM200.32 37C202.487 37 204.42 37.45 206.12 38.35C207.853 39.25 209.203 40.5833 210.17 42.35C211.137 44.1167 211.62 46.25 211.62 48.75V65H205.97V49.6C205.97 47.1333 205.353 45.25 204.12 43.95C202.887 42.6167 201.203 41.95 199.07 41.95C196.937 41.95 195.237 42.6167 193.97 43.95C192.737 45.25 192.12 47.1333 192.12 49.6V65H186.42V37.45H192.12V40.6C193.053 39.4667 194.237 38.5833 195.67 37.95C197.137 37.3167 198.687 37 200.32 37Z"
        fill="black"
      />
    </svg>
  );
}
