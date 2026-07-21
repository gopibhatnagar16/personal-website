"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CONFIG } from "@/lib/config";
import { useEyes } from "@/components/shared/EyesCursor";

interface Exp {
  name: string;
  color: string;
  initial: string;
  year: string;
  logo?: string;
}

interface TipState {
  index: number | null; // item currently hovered — null hides the tooltip
  shown: number; // last non-null index — keeps content painted while fading out
  x: number; // center of the target item, relative to .exp-row
  dir: 1 | -1; // which way the content slides in from
}

function Badge({ c }: { c: Exp }) {
  // fall back to the lettered circle if the remote logo fails to load
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const showLogo = c.logo && !failed;

  // a cached image can finish loading before the onLoad handler is attached,
  // which left badges blank until a hard reload — check .complete on mount too
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, [c.logo]);

  return (
    <span
      className={"exp-badge" + (showLogo ? " has-logo" : "")}
      style={showLogo ? undefined : { background: c.color }}
    >
      {showLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          className={loaded ? "img-loaded" : ""}
          src={c.logo}
          alt={`${c.name} logo`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      ) : (
        c.initial
      )}
    </span>
  );
}

export function ExperienceRow() {
  const bind = useEyes();
  const items = CONFIG.experience as Exp[];
  const rowRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [tip, setTip] = useState<TipState>({ index: null, shown: 0, x: 0, dir: 1 });
  // widths of each tooltip's content, measured once from hidden clones so the
  // tooltip can transition its width to an exact target instead of the box
  // just snapping to the new content's size.
  const [widths, setWidths] = useState<number[]>([]);

  useLayoutEffect(() => {
    setWidths(measureRefs.current.map((el) => el?.getBoundingClientRect().width ?? 0));
  }, []);

  const moveTo = (i: number) => {
    const row = rowRef.current;
    const item = itemRefs.current[i];
    if (!row || !item) return;
    const rowRect = row.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const x = itemRect.left - rowRect.left + itemRect.width / 2;
    setTip((prev) => ({
      index: i,
      shown: i,
      x,
      dir: prev.shown === i ? prev.dir : i > prev.shown ? 1 : -1,
    }));
  };

  const c = items[tip.shown];
  const width = widths[tip.shown];

  return (
    <section className="section" id="experience">
      <span className="section-label">Experience</span>
      <p className="section-intro">I have 3+ years of work experience, some of which are:</p>
      <div className="exp-row" ref={rowRef} onMouseLeave={() => setTip((prev) => ({ ...prev, index: null }))}>
        {items.map((item, i) => {
          const eyes = bind("💼");
          return (
            <span
              className="exp-item"
              key={item.name}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              onMouseEnter={(e) => {
                moveTo(i);
                eyes.onMouseEnter(e);
              }}
              onMouseMove={(e) => {
                moveTo(i);
                eyes.onMouseMove(e);
              }}
              onMouseLeave={eyes.onMouseLeave}
            >
              <Badge c={item} />
            </span>
          );
        })}

        {/* hidden clones, measured once on mount — give the live tooltip an
            exact pixel width to transition to, instead of one it can only
            snap to, so the box resizes evenly from both sides. */}
        {items.map((item, i) => (
          <span
            className="exp-tip exp-tip-measure"
            key={item.name}
            aria-hidden="true"
            ref={(el) => {
              measureRefs.current[i] = el;
            }}
          >
            <span className="exp-tip-inner">
              <span className="et-name">{item.name}</span>
              <span className="et-yr">{item.year}</span>
            </span>
          </span>
        ))}

        <span
          className={"exp-tip" + (tip.index !== null ? " is-visible" : "")}
          style={{
            transform: `translateX(${tip.x}px) translateX(-50%) translateY(${tip.index !== null ? 0 : 8}px) scale(${tip.index !== null ? 1 : 0.92})`,
            width: width ? `${width}px` : undefined,
          }}
        >
          <span className="exp-tip-inner" key={tip.shown} data-dir={tip.dir}>
            <span className="et-name">{c.name}</span>
            <span className="et-yr">{c.year}</span>
          </span>
        </span>
      </div>
    </section>
  );
}
