import type { MetadataRoute } from "next";
import { CONFIG } from "@/lib/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${CONFIG.name} — ${CONFIG.title}`,
    short_name: CONFIG.name,
    description: CONFIG.titleLine2,
    start_url: "/",
    display: "standalone",
    background_color: "#fbfbf9",
    theme_color: "#17170f",
    icons: [{ src: "/icon.png", sizes: "64x64", type: "image/png" }],
  };
}
