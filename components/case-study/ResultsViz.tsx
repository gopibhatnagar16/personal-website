"use client";

import { useState } from "react";

interface Metric {
  label: string;
  value: string;
  dots: number;
  sub: string;
  onEmoji?: string;
  offEmoji?: string;
}

interface Props {
  metrics: Metric[];
  baseDots: number;
  legend?: string;
}

const DEFAULT_ON = "🟣";
const DEFAULT_OFF = "⚪";

/* Results dot-grid viz: metric cards on the left, a waffle grid on the
   right. The grid always renders `baseDots` dots; the selected metric
   fills its share with its emoji (falls back to a plain dot pair). */
export function ResultsViz({ metrics, baseDots, legend }: Props) {
  const [active, setActive] = useState(0);
  const metric = metrics[active];
  const filled = Math.max(0, Math.min(metric.dots, baseDots));
  const onEmoji = metric.onEmoji ?? DEFAULT_ON;
  const offEmoji = metric.offEmoji ?? DEFAULT_OFF;

  return (
    <div className="cs-viz">
      <div className="cs-viz-list" role="tablist" aria-label="Result metrics">
        {metrics.map((m, i) => (
          <button
            key={m.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={"cs-viz-metric" + (i === active ? " active" : "")}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
          >
            <span className="cs-viz-metric-label">{m.label}</span>
            <span className="cs-viz-metric-value">{m.value}</span>
          </button>
        ))}
      </div>

      <div className="cs-viz-panel">
        <div className="cs-viz-head">
          <div>
            <span className="cs-viz-title">{metric.label}</span>
            <span className="cs-viz-sub">{metric.sub}</span>
          </div>
          <span className="cs-viz-value">{metric.value}</span>
        </div>

        <div className="cs-viz-grid" key={active} role="img" aria-label={`${metric.label}: ${metric.value}`}>
          {Array.from({ length: baseDots }, (_, i) => (
            <span
              key={i}
              className={"cs-viz-dot" + (i < filled ? " on" : "")}
              style={{ "--i": i } as React.CSSProperties}
              aria-hidden="true"
            >
              {i < filled ? onEmoji : offEmoji}
            </span>
          ))}
        </div>

        <div className="cs-viz-bar" aria-hidden="true">
          <span style={{ width: `${(filled / baseDots) * 100}%` }} />
        </div>

        {legend && <p className="cs-viz-legend">{legend}</p>}
      </div>
    </div>
  );
}
