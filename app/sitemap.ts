import type { MetadataRoute } from "next";
import { listContent } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [work, writing] = await Promise.all([listContent("work"), listContent("writing")]);

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...work.map((entry) => ({
      url: `${SITE_URL}/work/${entry.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...writing.map((entry) => ({
      url: `${SITE_URL}/writing/${entry.slug}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
