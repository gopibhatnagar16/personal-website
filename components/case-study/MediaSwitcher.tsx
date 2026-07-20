"use client";

import { useState } from "react";
import { CaseImage } from "./CaseImage";

interface Slide {
  label: string;
  caption?: string;
  src?: string;
  alt?: string;
}

/* Numbered tab switcher over an image/figure area — one tab per
   exploration/variant, active tab underlined in the accent color. */
export function MediaSwitcher({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  const current = slides[active];

  return (
    <div className="cs-switcher">
      <div className="cs-sw-tabs" role="tablist">
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
          </button>
        ))}
      </div>
      <div className="cs-sw-panel" key={active}>
        <CaseImage src={current.src} alt={current.alt ?? current.label} caption={current.caption} />
      </div>
    </div>
  );
}
