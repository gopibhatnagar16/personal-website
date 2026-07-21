import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";
import { getContentMeta, listContent } from "@/lib/content";

export async function generateStaticParams() {
  const entries = await listContent("work");
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getContentMeta("work", slug);
  if (!meta) return {};

  return {
    title: meta.title,
    description: meta.tagline,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      type: "article",
      url: `/work/${slug}`,
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

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CaseStudyPage kind="work" slug={slug} />;
}
