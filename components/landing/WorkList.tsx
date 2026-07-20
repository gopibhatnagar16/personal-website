"use client";

import { useState } from "react";
import Link from "next/link";
import { SHAPE_GREYS } from "@/lib/config";
import { useEyes } from "@/components/shared/EyesCursor";

export interface WorkRow {
  slug?: string;
  title: string;
  year?: string;
  upcoming?: boolean;
  thumb?: string;
  preview?: string;
}

export function WorkList({ items }: { items: WorkRow[] }) {
  const bind = useEyes();
  const [prev, setPrev] = useState({ show: false, x: 0, y: 0, g: 0, preview: "" });

  return (
    <section className="section" id="work">
      <span className="section-label">work</span>
      <div className="list">
        {items.map((w, i) => {
          const eyes = bind("📑");
          const handlers = {
            onMouseEnter: (e: React.MouseEvent) => {
              setPrev({ show: true, x: e.clientX, y: e.clientY, g: i, preview: w.preview ?? "" });
              eyes.onMouseEnter(e);
            },
            onMouseMove: (e: React.MouseEvent) => {
              setPrev({ show: true, x: e.clientX, y: e.clientY, g: i, preview: w.preview ?? "" });
              eyes.onMouseMove(e);
            },
            onMouseLeave: () => {
              setPrev((p) => ({ ...p, show: false }));
              eyes.onMouseLeave();
            },
          };
          const inner = (
            <>
              <span
                className="thumb"
                style={{
                  backgroundImage: w.thumb ? `url(${w.thumb})` : SHAPE_GREYS[i % SHAPE_GREYS.length],
                }}
              />
              <span className="rx-title">{w.title}</span>
              {w.upcoming ? (
                <span className="rx-badge">Upcoming</span>
              ) : (
                <span className="rx-date">{w.year}</span>
              )}
            </>
          );
          return w.slug ? (
            <Link className="rowx" key={w.title} href={`/work/${w.slug}`} {...handlers}>
              {inner}
            </Link>
          ) : (
            <div className="rowx" key={w.title} {...handlers}>
              {inner}
            </div>
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
          <span
            className="wp-img"
            style={{
              backgroundImage: prev.preview ? `url(${prev.preview})` : SHAPE_GREYS[prev.g % SHAPE_GREYS.length],
            }}
          />
        </div>
      )}
    </section>
  );
}
