"use client";

import { useState } from "react";

interface Step {
  value: string;
  label: string;
  sub: string;
  caption: string;
  dots?: number;
  cards?: string[];
}

/* Deterministic phyllotaxis scatter — same output on server and client,
   so no hydration mismatch and no Math.random. Returns % positions. */
function scatter(n: number): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  const GOLDEN = 2.399963229728653;
  for (let i = 0; i < n; i++) {
    const r = Math.sqrt((i + 0.5) / n) * 46;
    const a = i * GOLDEN;
    const jx = Math.sin(i * 12.9898) * 2.4;
    const jy = Math.sin(i * 78.233) * 2.4;
    // rounded so server and client serialize the identical style string
    pts.push({
      x: Math.round((50 + r * Math.cos(a) + jx) * 100) / 100,
      y: Math.round((50 + r * Math.sin(a) + jy) * 100) / 100,
    });
  }
  return pts;
}

/* Stepped research-funnel interaction: numbered pills, a dot-cluster
   visual per step (previous step's cluster stays behind, faded), a
   "Reveal next →" link, and a caption under a hairline. */
export function ResearchFlow({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const prev = active > 0 ? steps[active - 1] : null;
  const next = active < steps.length - 1 ? steps[active + 1] : null;

  return (
    <div className="cs-rf">
      <div className="cs-rf-pills">
        {steps.map((s, i) => (
          <span className="cs-rf-pill-wrap" key={s.label}>
            {i > 0 && <span className="cs-rf-pill-arrow" aria-hidden="true">→</span>}
            <button
              type="button"
              className={"cs-rf-pill" + (i === active ? " active" : "")}
              onClick={() => setActive(i)}
            >
              <span className="cs-rf-pill-num">{i + 1}</span>
              {s.value} {s.label}
            </button>
          </span>
        ))}
      </div>

      <div className="cs-rf-stage" key={active}>
        <div className="cs-rf-text">
          <span className="cs-rf-value">
            <em>{step.value}</em> {step.label}
          </span>
          <span className="cs-rf-sub">{step.sub}</span>
          {next && (
            <button type="button" className="cs-rf-reveal" onClick={() => setActive(active + 1)}>
              Reveal {next.value} {next.label} →
            </button>
          )}
        </div>

        <div className="cs-rf-visual" aria-hidden="true">
          {prev?.dots && (
            <div className="cs-rf-cluster faded">
              {scatter(prev.dots).map((p, i) => (
                <span key={i} className="cs-rf-dot" style={{ left: `${p.x}%`, top: `${p.y}%` }} />
              ))}
            </div>
          )}
          {step.cards ? (
            <div className="cs-rf-cards">
              {step.cards.map((c) => (
                <span className="cs-rf-card" key={c}>{c}</span>
              ))}
            </div>
          ) : (
            step.dots && (
              <div className="cs-rf-cluster">
                {scatter(step.dots).map((p, i) => (
                  <span key={i} className="cs-rf-dot on" style={{ left: `${p.x}%`, top: `${p.y}%` }} />
                ))}
              </div>
            )
          )}
        </div>
      </div>

      <p className="cs-rf-caption">{step.caption}</p>
    </div>
  );
}
