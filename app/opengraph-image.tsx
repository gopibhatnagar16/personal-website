import { CONFIG } from "@/lib/config";
import { renderOgImage, OG_SIZE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: CONFIG.name,
    title: CONFIG.title,
    subtitle: CONFIG.titleLine2,
  });
}
