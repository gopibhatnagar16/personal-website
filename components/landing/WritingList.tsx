"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { useEyes } from "@/components/shared/EyesCursor";

export interface WritingRow {
  slug: string;
  title: string;
  year?: string;
  readTime?: string;
}

export function WritingList({ items }: { items: WritingRow[] }) {
  const bind = useEyes();
  return (
    <section className="section" id="writing">
      <span className="section-label">Writing</span>
      <div className="wlist">
        {items.map((a) => (
          <Link className="wrow" key={a.slug} href={`/writing/${a.slug}`} {...bind("✍️")}>
            <span className="w-date">{a.year}</span>
            <span className="w-title">{a.title}</span>
            <span className="w-read">
              <Clock size={13} strokeWidth={1.75} /> {a.readTime}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
