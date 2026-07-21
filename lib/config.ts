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
  kind: "card" | "circle" | "rect" | "square" | "sticker" | "polaroid" | "video";
  g?: number;
  emoji?: string;
  bg?: string;
  rot?: number;
  caption?: string;
  img?: string; // photo/artwork, shown as the card's background image
  video?: string; // kind: "video" — autoplaying, muted, looping clip
  poster?: string; // poster frame for kind: "video"
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
    { title: "Onboarding", thumb: "/work/onboarding-mini.png", preview: "/work/onboarding-maxi.png" },
  ],

  // pinned to the cutting mat — sketches, renders and clips pulled from Figma
  tidbits: [
    { id: "t1", x: 20, y: 36, w: 210, h: 104, kind: "card", img: "/tidbits/sketches.png", rot: -2 },
    { id: "t2", x: 250, y: 14, w: 170, h: 113, kind: "card", img: "/tidbits/device-render.png", rot: 3 },
    { id: "t3", x: 440, y: 36, w: 230, h: 58, kind: "card", img: "/tidbits/spotify-strip.png", rot: -1 },
    { id: "t4", x: 36, y: 150, w: 170, h: 134, kind: "card", img: "/tidbits/alphabet.png", rot: 2 },
    { id: "t5", x: 560, y: 110, w: 190, h: 140, kind: "card", img: "/tidbits/comic.png", rot: -3 },
    { id: "t6", x: 240, y: 160, w: 150, h: 155, kind: "card", img: "/tidbits/expression-poster.png", rot: 4 },
    { id: "t7", x: 420, y: 140, w: 150, h: 156, kind: "card", img: "/tidbits/spiral.png", rot: -2 },
    {
      id: "t8",
      x: 560,
      y: 10,
      w: 190,
      h: 90,
      kind: "video",
      video: "/tidbits/adventure.mp4",
      poster: "/tidbits/adventure-poster.jpg",
      rot: 2,
    },
    {
      id: "t9",
      x: 40,
      y: 275,
      w: 170,
      h: 113,
      kind: "video",
      video: "/tidbits/paper-boat.mp4",
      poster: "/tidbits/paper-boat-poster.jpg",
      rot: -3,
    },
  ] as CanvasItem[],

  // pegboard — polaroids + stickers pinned to a fixed Personal board (not an
  // infinite-pan canvas). x/y are percentages of the board's own width/height
  // so the layout holds regardless of the board's rendered size; w/h stay px.
  pegboard: [
    { id: "p1", x: 2, y: 5, w: 148, h: 182, kind: "polaroid", g: 0, rot: -7, caption: "sunrise hike" },
    { id: "p2", x: 37, y: 8, w: 148, h: 182, kind: "polaroid", g: 4, rot: -4, caption: "studio days" },
    { id: "p3", x: 72, y: 3, w: 148, h: 182, kind: "polaroid", g: 2, rot: 6, caption: "morning brew" },

    { id: "s1", x: 2, y: 65, w: 88, h: 88, kind: "sticker", emoji: "✌️", bg: "#F5A623", rot: -8 },
    { id: "s2", x: 19, y: 69, w: 92, h: 92, kind: "sticker", emoji: "🎧", bg: "#4B47E5", rot: -10 },
    { id: "s3", x: 36, y: 63, w: 80, h: 80, kind: "sticker", emoji: "🌱", bg: "#00998F", rot: 5 },
    { id: "s4", x: 53, y: 71, w: 82, h: 82, kind: "sticker", emoji: "☕", bg: "#3395FF", rot: 6 },
    { id: "s5", x: 70, y: 64, w: 86, h: 86, kind: "sticker", emoji: "⭐", bg: "#E4181C", rot: 9 },
    { id: "s6", x: 87, y: 68, w: 78, h: 78, kind: "sticker", emoji: "🔥", bg: "#8A5CF6", rot: -6 },
  ] as CanvasItem[],

  photos: [
    "/photos/hero-closeup.jpg",
    "/photos/hero-speaking.jpg",
    "/photos/hero-mirror.jpg",
    "/photos/hero-thumbsup.jpg",
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
