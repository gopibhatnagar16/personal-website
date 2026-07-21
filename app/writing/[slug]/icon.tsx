import { listContent } from "@/lib/content";
import { renderContentIcon, ICON_SIZE } from "@/lib/route-icon";

export const size = ICON_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  const entries = await listContent("writing");
  return entries.map((entry) => ({ slug: entry.slug }));
}

export default async function Icon({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderContentIcon("writing", slug);
}
