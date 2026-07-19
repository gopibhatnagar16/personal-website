import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";

export default async function WritingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CaseStudyPage kind="writing" slug={slug} />;
}
