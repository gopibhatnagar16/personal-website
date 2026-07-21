import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/* Shared visual for opengraph-image.tsx / twitter-image.tsx across routes —
   kept token-matched to styles/tokens.css light theme since crawlers render
   OG images without our theme script. */
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#fbfbf9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#9e2c6a", display: "flex" }} />
          <span style={{ fontSize: 28, color: "#6e6d62", letterSpacing: "0.02em" }}>{eyebrow}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: title.length > 40 ? 56 : 68,
              color: "#17170f",
              fontWeight: 600,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {title}
          </span>
          <span style={{ fontSize: 30, color: "#3a3a33", lineHeight: 1.4, maxWidth: 900 }}>{subtitle}</span>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
