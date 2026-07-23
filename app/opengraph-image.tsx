import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { OG_SIZE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";

// root OG image — the bitmoji card, letterboxed onto the standard
// social-share canvas (source isn't 1.91:1, so it's scaled to fit height
// instead of cropped). Distinct from the shared renderOgImage template used
// by /work and /writing case studies.
const META_SIZE = { width: 1280, height: 1013 };

export default async function Image() {
  const meta = await readFile(path.join(process.cwd(), "public/photos/og-meta.jpg"));
  const metaSrc = `data:image/jpeg;base64,${meta.toString("base64")}`;
  const metaWidth = Math.round(OG_SIZE.height * (META_SIZE.width / META_SIZE.height));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF6EF",
        }}
      >
        <img src={metaSrc} width={metaWidth} height={OG_SIZE.height} />
      </div>
    ),
    { ...OG_SIZE }
  );
}
