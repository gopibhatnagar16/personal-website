import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { OG_SIZE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";

// root OG image — cream backdrop, centered bitmoji avatar (same one used in
// the hero fold's photo fan), "Design Builder" underneath. Distinct from the
// shared renderOgImage template used by /work and /writing case studies.
export default async function Image() {
  const avatar = await readFile(path.join(process.cwd(), "public/photos/hero-emoji.jpg"));
  const avatarSrc = `data:image/jpeg;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          background: "#FAF6EF",
          fontFamily: "sans-serif",
        }}
      >
        <img
          src={avatarSrc}
          width={280}
          height={280}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 20px 60px rgba(23,23,15,0.18)",
          }}
        />
        <span style={{ fontSize: 52, fontWeight: 700, color: "#17170f", letterSpacing: "-0.01em" }}>
          Design Builder
        </span>
      </div>
    ),
    { ...OG_SIZE }
  );
}
