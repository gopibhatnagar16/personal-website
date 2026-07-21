import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#17170f",
          borderRadius: 7,
          color: "#fbfbf9",
          fontSize: 18,
          fontWeight: 600,
          fontFamily: "sans-serif",
        }}
      >
        G
      </div>
    ),
    { ...size }
  );
}
