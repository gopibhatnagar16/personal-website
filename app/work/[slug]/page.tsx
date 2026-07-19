import { CaseStudyPage } from "@/components/case-study/CaseStudyPage";

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CaseStudyPage kind="work" slug={slug} />;
}
