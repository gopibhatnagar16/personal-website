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
  kind: "card" | "circle" | "rect" | "square" | "sticker" | "polaroid" | "magnet";
  g?: number;
  emoji?: string;
  bg?: string;
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
  location: "Chennai", // ← shown in the footer "Currently"
  lastUpdated: "July 2026", // ← footer "Last updated"
  title: "Design Builder.",
  titleLine2: "Partly in canvas, rest in codebase.",
  ideology: [
    "I care about craft more than category. Whether it's a Figma frame or a component in the codebase, I sweat the same details — the easing on a transition, the tension in a wordmark, the reason a flow feels effortless when nobody can say why.",
    "Good work is mostly patience: the unglamorous back-and-forth of making something feel obvious. I like living close to the pixels and close to the code, because that's where the craft actually happens.",
  ],

  personalIntro:
    "Outside of work I'm usually chasing a sunrise hike, pulling a bad shot of coffee, or losing an evening to a game I have no business being this invested in. This is a rough pinboard of that half of my life — drag things around.",

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

  // draggable placeholders — add src (image) or video (mp4/webm) from
  // /public/tidbits/ to swap the grey card for real media, e.g.
  // { ...t1, src: "/tidbits/photo.jpg" } or { ...t2, video: "/tidbits/clip.mp4" }
  tidbits: [
    { id: "t1", x: 24, y: 44, w: 210, h: 140, kind: "card", g: 0 },
    { id: "t2", x: 300, y: 24, w: 178, h: 208, kind: "card", g: 1 },
    { id: "t3", x: 540, y: 66, w: 220, h: 150, kind: "card", g: 2 },
    { id: "t4", x: 150, y: 224, w: 190, h: 120, kind: "card", g: 3 },
    { id: "t5", x: 440, y: 246, w: 160, h: 112, kind: "card", g: 4 },
  ] as CanvasItem[],

  // pegboard — polaroids, fridge magnets, and stickers pinned to a fixed
  // Personal board (not an infinite-pan canvas). x/y are percentages of the
  // board's own width/height so the layout holds regardless of the board's
  // rendered size; w/h stay px. src (image) or video (mp4/webm) is resolved
  // from /public/personal/.
  pegboard: [
    { id: "p1", x: 2, y: 5, w: 148, h: 182, kind: "polaroid", rot: -7, src: "/personal/closing-time.jpg", caption: "closing time" },
    { id: "p2", x: 37, y: 8, w: 148, h: 182, kind: "polaroid", rot: -4, src: "/personal/long-table.jpg", caption: "long table" },
    { id: "p3", x: 72, y: 3, w: 148, h: 182, kind: "polaroid", rot: 6, src: "/personal/morning-brew.jpg", caption: "morning brew" },

    { id: "m1", x: 4, y: 48, w: 96, h: 96, kind: "magnet", rot: -6, src: "/personal/lunch-break.jpg" },
    { id: "m2", x: 23, y: 53, w: 88, h: 88, kind: "magnet", rot: 5, src: "/personal/quiet-dusk.jpg" },
    { id: "m3", x: 41, y: 46, w: 100, h: 100, kind: "magnet", rot: -3, src: "/personal/studio-days.jpg" },
    { id: "m4", x: 60, y: 52, w: 86, h: 86, kind: "magnet", rot: 7, src: "/personal/match-day.jpg" },
    { id: "m5", x: 78, y: 48, w: 96, h: 96, kind: "magnet", rot: -5, video: "/personal/one-more-turn.mp4" },

    { id: "s1", x: 1, y: 79, w: 76, h: 76, kind: "sticker", emoji: "✌️", bg: "#F5A623", rot: -8 },
    { id: "s2", x: 15, y: 84, w: 78, h: 78, kind: "sticker", emoji: "🎧", bg: "#4B47E5", rot: -10 },
    { id: "s3", x: 29, y: 77, w: 68, h: 68, kind: "sticker", emoji: "🌱", bg: "#00998F", rot: 5 },
    { id: "s4", x: 43, y: 84, w: 70, h: 70, kind: "sticker", emoji: "☕", bg: "#3395FF", rot: 6 },
    { id: "s5", x: 57, y: 78, w: 74, h: 74, kind: "sticker", emoji: "⭐", bg: "#E4181C", rot: 9 },
    { id: "s6", x: 71, y: 84, w: 66, h: 66, kind: "sticker", emoji: "🔥", bg: "#8A5CF6", rot: -6 },
    { id: "s7", x: 85, y: 77, w: 78, h: 78, kind: "sticker", rot: 4, video: "/personal/side-project.mp4" },
  ] as CanvasItem[],

  photos: [] as string[], // avatar fan (last = front)
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
