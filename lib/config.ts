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
  kind: "card" | "circle" | "rect" | "square" | "polaroid" | "sticker";
  g?: number;
  rot?: number;
  caption?: string;
  // real media — src (image) shows as-is; video (mp4/webm) autoplays muted/looped,
  // with src used as its poster frame if both are set.
  src?: string;
  video?: string;
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
    "I'm Gopi Bhatnagar. Somewhere between designing and vibe-coding, I stopped picking a lane and just started doing both.",
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

  // pegboard — polaroids + laptop-sticker cutouts pinned to a fixed Personal
  // board (not an infinite-pan canvas). x/y are percentages of the board's
  // own width/height so the layout holds regardless of the board's rendered
  // size; w/h stay px. src (image) or video (mp4/webm) is resolved from
  // /public/personal/. Positions are hand-scattered (not a grid) for an
  // organic, pinned-to-a-corkboard feel.
  pegboard: [
    { id: "p1", x: 2, y: 4, w: 105, h: 130, kind: "polaroid", rot: -7, src: "/personal/closing-time.jpg", caption: "closing time" },
    { id: "p2", x: 35, y: 6, w: 105, h: 130, kind: "polaroid", rot: 8, src: "/personal/long-table.jpg", caption: "long table" },
    { id: "p3", x: 68, y: 2, w: 105, h: 130, kind: "polaroid", rot: -5, src: "/personal/morning-brew.jpg", caption: "morning brew" },

    { id: "p4", x: 18, y: 37, w: 105, h: 130, kind: "polaroid", rot: 6, src: "/personal/lunch-break.jpg", caption: "lunch break" },
    { id: "p5", x: 50, y: 34, w: 105, h: 130, kind: "polaroid", rot: -8, src: "/personal/quiet-dusk.jpg", caption: "quiet dusk" },
    { id: "p6", x: 83, y: 38, w: 105, h: 130, kind: "polaroid", rot: 4, src: "/personal/studio-days.jpg", caption: "studio days" },

    { id: "p7", x: 8, y: 65, w: 105, h: 130, kind: "polaroid", rot: -6, src: "/personal/match-day.jpg", caption: "match day" },
    { id: "p9", x: 62, y: 65, w: 105, h: 130, kind: "polaroid", rot: -4, src: "/personal/window-flowers.png", caption: "window sill" },

    // laptop-sticker cutouts — transparent die-cut PNGs, no card/frame, just
    // the image + a drop shadow (see .ci-sticker), scattered in the gaps
    // between the polaroid rows.
    { id: "s1", x: 20, y: 3, w: 80, h: 110, kind: "sticker", rot: 10, src: "/personal/tote-bag.png" },
    { id: "s2", x: 52, y: 8, w: 108, h: 92, kind: "sticker", rot: -9, src: "/personal/balloon-letters.png" },
    { id: "s3", x: 87, y: 8, w: 86, h: 86, kind: "sticker", rot: 6, src: "/personal/latte-art.png" },
    { id: "s4", x: 3, y: 22, w: 60, h: 107, kind: "sticker", rot: -8, src: "/personal/sandwich.png" },
    { id: "s5", x: 30, y: 20, w: 62, h: 110, kind: "sticker", rot: 9, src: "/personal/coffee-note.png" },
    { id: "s6", x: 60, y: 18, w: 80, h: 107, kind: "sticker", rot: -6, src: "/personal/rose-bouquet.png" },
    { id: "s7", x: 2, y: 48, w: 136, h: 51, kind: "sticker", rot: 5, src: "/personal/sneakers.png" },
    // slack screenshot — sized up from its original 124x47 (kept aspect) and
    // recentered into the gap left by the removed "one more turn" polaroid.
    { id: "s8", x: 33, y: 50, w: 170, h: 65, kind: "sticker", rot: -4, src: "/personal/team-note.png" },
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
