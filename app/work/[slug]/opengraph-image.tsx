import { getContentMeta } from "@/lib/content";
import { renderOgImage, OG_SIZE } from "@/lib/og-image";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = await getContentMeta("work", slug);
  return renderOgImage({
    eyebrow: "Work",
    title: meta?.title ?? "Case study",
    subtitle: meta?.tagline ?? "",
  });
}
