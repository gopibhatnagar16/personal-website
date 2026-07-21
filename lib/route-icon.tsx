import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getContentMeta, type ContentKind } from "@/lib/content";

export const ICON_SIZE = { width: 32, height: 32 };

/* per-route tab favicon — swaps the default avatar (app/icon.png) for the
   case study's own thumb while its page is open, so the tab reads at a
   glance in a crowded bar. Falls back to the site default if a piece hasn't
   got a thumb yet. */
export async function renderContentIcon(kind: ContentKind, slug: string) {
  const meta = await getContentMeta(kind, slug);
  const thumbPath = meta?.thumb ?? "/icon.png";
  const buf = await fs.readFile(path.join(process.cwd(), "public", thumbPath));
  const ext = path.extname(thumbPath).slice(1);
  const mime = ext === "jpg" ? "jpeg" : ext || "png";
  const dataUri = `data:image/${mime};base64,${buf.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dataUri} width={ICON_SIZE.width} height={ICON_SIZE.height} style={{ objectFit: "cover" }} />
      </div>
    ),
    ICON_SIZE
  );
}
