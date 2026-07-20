import { listContent } from "@/lib/content";
import { CONFIG } from "@/lib/config";
import { LandingClient } from "@/components/landing/LandingClient";

export default async function Home() {
  const [workEntries, writingEntries] = await Promise.all([
    listContent("work"),
    listContent("writing"),
  ]);

  const work = [
    ...workEntries.map((w) => ({ slug: w.slug, title: w.title, year: w.year, thumb: w.thumb, preview: w.preview })),
    ...CONFIG.upcomingWork.map((w) => ({ title: w.title, upcoming: true, thumb: w.thumb, preview: w.preview })),
  ];
  const writing = writingEntries.map((a) => ({
    slug: a.slug,
    title: a.title,
    year: a.year,
    readTime: a.readTime,
  }));

  return <LandingClient work={work} writing={writing} />;
}
