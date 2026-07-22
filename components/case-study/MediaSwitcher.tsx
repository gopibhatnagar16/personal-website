"use client";

import { useEffect, useState } from "react";
import { CaseImage } from "./CaseImage";

interface Slide {
  label: string;
  caption?: string;
  src?: string;
  alt?: string;
}

const AUTOPLAY_MS = 5000;

/* Media switcher — numbered horizontal tab row above an image/figure panel,
   each tab with a pill-shaped autoplay progress bar. Clicking a tab jumps
   directly and resets the timer; hovering the tab row pauses autoplay. */
export function MediaSwitcher({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = slides[active];
  const autoplay = slides.length > 1;

  useEffect(() => {
    if (!autoplay || paused) return;
    const id = setTimeout(() => {
      setActive((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused, autoplay, slides.length]);

  return (
    <div className="cs-switcher">
      <div
        className="cs-sw-tabs"
        role="tablist"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((s, i) => (
          <button
            key={s.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={"cs-sw-tab" + (i === active ? " active" : "")}
            onClick={() => setActive(i)}
          >
            <span className="cs-sw-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="cs-sw-label">{s.label}</span>
            <span className="cs-sw-track" aria-hidden="true">
              {i === active && (
                <span
                  key={active}
                  className={"cs-sw-fill" + (autoplay ? "" : " static")}
                  style={
                    autoplay
                      ? {
                          animationDuration: `${AUTOPLAY_MS}ms`,
                          animationPlayState: paused ? "paused" : "running",
                        }
                      : undefined
                  }
                />
              )}
            </span>
          </button>
        ))}
      </div>
      <div className="cs-sw-panel" key={active}>
        <CaseImage src={current.src} alt={current.alt ?? current.label} caption={current.caption} />
      </div>
    </div>
  );
}
