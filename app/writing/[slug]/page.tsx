import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";
import { getContentMeta, listContent } from "@/lib/content";

export async function generateStaticParams() {
  const entries = await listContent("writing");
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getContentMeta("writing", slug);
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.tagline,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      type: "article",
      url: `/writing/${slug}`,
      title: meta.title,
      description: meta.tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.tagline,
    },
  };
}

export default async function WritingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CaseStudyPage kind="writing" slug={slug} />;
}
