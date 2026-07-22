/* ------------------------------------------------------------------ *
 *  EDIT ME — site-wide content and links. Case-study copy lives in
 *  content/work/*.mdx and content/writing/*.mdx.
 * ------------------------------------------------------------------ */

export interface CanvasItem {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: "card" | "circle" | "rect" | "square" | "polaroid" | "sticker" | "html";
  g?: number;
  rot?: number;
  caption?: string;
  // real media — src (image) shows as-is; video (mp4/webm) autoplays muted/looped,
  // with src used as its poster frame if both are set.
  src?: string;
  video?: string;
  // kind:"html" only — path to a self-contained HTML file (own CSS/JS), rendered
  // in an iframe. Interactive on hover only; never draggable.
  html?: string;
}

export const CONFIG = {
  name: "Gopi Bhatnagar",
  email: "gopibhatnagar@gmail.com", // ← change me
  socials: {
    linkedin: "https://www.linkedin.com/in/gopibhatnagar/",
    twitter: "https://x.com/BhatnagarGopi",
    resume: "https://drive.google.com/file/d/1tws4WgJ8PrAxY4QqtYWyBDtLgO6rch3A/view",
  },
  timeZone: "Asia/Kolkata",
  tzLabel: "GMT+5:30",
  location: "Bangalore", // ← shown in the footer "Currently"
  lastUpdated: "July 2026", // ← footer "Last updated"
  title: "Design Builder.",
  titleLine2: "Partly in canvas, partly in codebase.",
  ideology: [
    "Hi, I'm Gopi Bhatnagar. Somewhere between designing and vibe-coding, I stopped picking a lane and just started doing both.",
    "Most of my experience is on complex, enterprise-scale products - the kind where good intentions meet real constraints. I'm curious about people, products, and how technology shapes both, and I'm still figuring a lot of it out.",
  ],

  personalHeader: "Off duty, not off imagination.",
  personalIntro:
    'Design pulled me in because it turns "what if" into something real. When I\'m not working, I\'m probably:',
  personalHobbies: ["Out playing sports", "Buried in a non-fiction book", "Hunting down a new drink to try"],

  // logo: each company's own brand mark, exported from Figma.
  // initial stays as the fallback if a logo ever fails to load.
  experience: [
    { name: "Razorpay", color: "#3395FF", initial: "R", year: "2023 — NOW", logo: "/logos/razorpay.png" },
    { name: "Scaler", color: "#4B47E5", initial: "S", year: "2022 — 2023", logo: "/logos/scaler.png" },
    { name: "Kidzovo", color: "#F5A623", initial: "K", year: "2022", logo: "/logos/kidzovo.png" },
    { name: "TCS", color: "#E4181C", initial: "T", year: "2021", logo: "/logos/tcs.png" },
    { name: "Wongdoody", color: "#FF4E7A", initial: "W", year: "2021", logo: "/logos/wongdoody.png" },
    { name: "Ciena", color: "#00998F", initial: "C", year: "2020", logo: "/logos/ciena.png" },
  ],

  // rows shown in Work without a case-study page yet
  upcomingWork: [
    { title: "Onboarding", thumb: "/work/onboarding/thumb.png", preview: "/work/onboarding/preview.png" },
  ],

  // pinned to the cutting mat — sketches, renders and clips pulled from Figma.
  // sizes/rotation/position are deliberately scattered and oversized, and
  // most still sit beyond the mat's default viewport on purpose — dragging
  // the mat (or the pieces themselves) pans them into view, like digging
  // through a real pile. t1/t2/t9 are placed to land fully in view on load
  // so the mat doesn't read empty before anyone's touched it.
  tidbits: [
    { id: "t1", x: -80, y: 60, w: 280, h: 190, kind: "card", src: "/tidbits/sketches.png", rot: -6 },
    { id: "t2", x: 520, y: 55, w: 230, h: 200, kind: "card", src: "/tidbits/device-render.png", rot: 9 },
    { id: "t3", x: 900, y: 120, w: 270, h: 100, kind: "card", src: "/tidbits/spotify-strip.png", rot: -4 },
    { id: "t4", x: -380, y: 380, w: 250, h: 210, kind: "card", src: "/tidbits/alphabet.png", rot: 5 },
    { id: "t5", x: 980, y: 520, w: 280, h: 230, kind: "card", src: "/tidbits/comic.png", rot: -7 },
    { id: "t6", x: 180, y: 480, w: 230, h: 230, kind: "card", src: "/tidbits/expression-poster.png", rot: 6 },
    {
      id: "t7",
      x: 800,
      y: -220,
      w: 230,
      h: 230,
      kind: "card",
      video: "/tidbits/spiral.mp4",
      src: "/tidbits/spiral-poster.jpg",
      rot: -9,
    },
    {
      id: "t8",
      x: 1220,
      y: 260,
      w: 260,
      h: 150,
      kind: "card",
      video: "/tidbits/adventure.mp4",
      src: "/tidbits/adventure-poster.jpg",
      rot: 4,
    },
    {
      id: "t9",
      x: 270,
      y: 210,
      w: 240,
      h: 170,
      kind: "card",
      video: "/tidbits/paper-boat.mp4",
      src: "/tidbits/paper-boat-poster.jpg",
      rot: -5,
    },
  ] as CanvasItem[],

  // pegboard — rebuilt from the "Peg board" frame in the Figma file
  // (design/MS7NHmuW2sxQjm35x4k501, "June - July 2026" page). Polaroids +
  // laptop-sticker cutouts pinned to a fixed Personal board (not an
  // infinite-pan canvas). x/y are percentages of the board's own
  // width/height so the layout holds regardless of the board's rendered
  // size; w/h stay px. src (image) is resolved from /public/personal/.
  // html items are the two interactive widgets shared alongside the design —
  // rendered as sandboxed iframes, hover-only (see DraggableCanvas), never
  // draggable, so they're excluded from the drag-handler wiring.
  pegboard: [
    // -- top row: chat screenshots + the two shared HTML widgets --
    { id: "charmie", x: 2, y: 3, w: 190, h: 72, kind: "rect", rot: -3, src: "/personal/slack-charmie.png" },
    { id: "pouch", x: 30, y: 1, w: 190, h: 180, kind: "html", html: "/personal/widgets/pouch.html" },
    { id: "unconventional", x: 57, y: 1, w: 300, h: 125, kind: "html", html: "/personal/widgets/unconventional.html" },

    // -- second row: food/lifestyle stickers, "closing time", tote, flowers, window sill --
    { id: "coffee-hand", x: 1, y: 19, w: 95, h: 150, kind: "sticker", rot: -6, src: "/personal/coffee-hand.png" },
    { id: "sandwich", x: 15, y: 18, w: 130, h: 130, kind: "sticker", rot: 5, src: "/personal/sandwich-plate.png" },
    { id: "closing-time", x: 33, y: 16, w: 135, h: 137, kind: "polaroid", rot: -4, src: "/personal/closing-time.png", caption: "closing time" },
    { id: "tote-bag", x: 53, y: 14, w: 130, h: 155, kind: "sticker", rot: 12, src: "/personal/tote-bag.png" },
    { id: "flower-bouquet", x: 70, y: 16, w: 120, h: 117, kind: "sticker", rot: 7, src: "/personal/flower-bouquet.png" },
    { id: "window-sill", x: 84, y: 21, w: 170, h: 172, kind: "polaroid", rot: -20, src: "/personal/window-sill.png", caption: "window sill" },

    // -- third row: chalkboard, mug, Soni screenshot, shoe, oatmeal bowl --
    { id: "chalkboard", x: 2, y: 41, w: 110, h: 145, kind: "sticker", rot: -5, src: "/personal/chalkboard-quote.png" },
    { id: "coffee-mug", x: 19, y: 45, w: 90, h: 91, kind: "sticker", rot: 0, src: "/personal/coffee-mug.png" },
    { id: "soni", x: 29, y: 41, w: 190, h: 54, kind: "rect", rot: 3, src: "/personal/slack-soni.png" },
    { id: "sneaker", x: 47, y: 47, w: 150, h: 83, kind: "sticker", rot: -8, src: "/personal/sneaker.png" },
    { id: "oatmeal-bowl", x: 64, y: 43, w: 140, h: 114, kind: "sticker", rot: 6, src: "/personal/oatmeal-bowl.png" },

    // -- fourth row: camera, paper bag, vinil screenshot, match day --
    { id: "instax-camera", x: 1, y: 59, w: 100, h: 106, kind: "sticker", rot: -9, src: "/personal/instax-camera.png" },
    { id: "paper-bag", x: 15, y: 57, w: 110, h: 132, kind: "polaroid", rot: 4, src: "/personal/paper-bag.png" },
    { id: "vinil", x: 31, y: 59, w: 210, h: 44, kind: "rect", rot: -3, src: "/personal/slack-vinil.png" },
    { id: "match-day", x: 77, y: 57, w: 140, h: 150, kind: "polaroid", rot: 5, src: "/personal/match-day.png", caption: "match day" },

    // -- bottom row: studio days, cosmic sticker, dinner table, mango --
    { id: "studio-days", x: 1, y: 79, w: 115, h: 142, kind: "polaroid", rot: -7, src: "/personal/studio-days.png", caption: "studio days" },
    { id: "cosmic-text", x: 16, y: 83, w: 110, h: 92, kind: "sticker", rot: 8, src: "/personal/cosmic-text.png" },
    { id: "dinner-table", x: 31, y: 81, w: 105, h: 140, kind: "polaroid", rot: -5, src: "/personal/dinner-table.png" },
    { id: "mango-hand", x: 51, y: 78, w: 100, h: 133, kind: "polaroid", rot: 6, src: "/personal/mango-hand.png" },
  ] as CanvasItem[],

  photos: [
    "/photos/hero-closeup.jpg",
    "/photos/hero-thumbsup.jpg",
    "/photos/hero-mirror.jpg",
    "/photos/hero-emoji.jpg",
  ] as string[], // avatar fan (last = front)
};

export const AVATAR_GREYS = [
  "linear-gradient(135deg,#dedede,#cfcfcf)",
  "linear-gradient(135deg,#e6e6e6,#d8d8d8)",
  "linear-gradient(135deg,#eeeeee,#e0e0e0)",
  "linear-gradient(135deg,#ababab,#909090)",
];

export const SHAPE_GREYS = [
  "linear-gradient(135deg,#e8e8e4,#d8d8d3)",
  "linear-gradient(135deg,#dcdcd7,#cbcbc5)",
  "linear-gradient(135deg,#efefeb,#dedeD8)",
  "linear-gradient(135deg,#d3d3ce,#c2c2bc)",
  "linear-gradient(135deg,#e4e4df,#d2d2cc)",
  "linear-gradient(135deg,#eaeae5,#d9d9d3)",
  "linear-gradient(135deg,#d8d8d2,#c6c6c0)",
];
