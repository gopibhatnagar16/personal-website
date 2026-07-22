"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { SHAPE_GREYS } from "@/lib/config";
import { useEyes } from "@/components/shared/EyesCursor";

export interface WritingRow {
  slug: string;
  title: string;
  year?: string;
  readTime?: string;
  preview?: string;
  previewVideo?: string;
}

export function WritingList({ items }: { items: WritingRow[] }) {
  const bind = useEyes();
  const [prev, setPrev] = useState({ show: false, x: 0, y: 0, g: 0, preview: "", previewVideo: "" });

  return (
    <section className="section" id="writing">
      <span className="section-label">Writing</span>
      <div className="wlist">
        {items.map((a, i) => {
          const eyes = bind("✍️");
          const handlers = {
            onMouseEnter: (e: React.MouseEvent) => {
              setPrev({ show: true, x: e.clientX, y: e.clientY, g: i, preview: a.preview ?? "", previewVideo: a.previewVideo ?? "" });
              eyes.onMouseEnter(e);
            },
            onMouseMove: (e: React.MouseEvent) => {
              setPrev({ show: true, x: e.clientX, y: e.clientY, g: i, preview: a.preview ?? "", previewVideo: a.previewVideo ?? "" });
              eyes.onMouseMove(e);
            },
            onMouseLeave: () => {
              setPrev((p) => ({ ...p, show: false }));
              eyes.onMouseLeave();
            },
          };
          return (
            <Link className="wrow" key={a.slug} href={`/writing/${a.slug}`} {...handlers}>
              <span className="w-date">{a.year}</span>
              <span className="w-title">{a.title}</span>
              <span className="w-read">
                <Clock size={13} strokeWidth={1.75} /> {a.readTime}
              </span>
            </Link>
          );
        })}
      </div>

      {prev.show && (
        <div
          className="work-preview"
          style={{
            left: Math.min(prev.x + 24, window.innerWidth - 284),
            top: Math.max(14, prev.y - 92),
          }}
        >
          {prev.previewVideo ? (
            <video className="wp-img" src={prev.previewVideo} poster={prev.preview} autoPlay loop muted playsInline />
          ) : (
            <span
              className="wp-img"
              style={{
                backgroundImage: prev.preview ? `url(${prev.preview})` : SHAPE_GREYS[prev.g % SHAPE_GREYS.length],
              }}
            />
          )}
        </div>
      )}
    </section>
  );
}
