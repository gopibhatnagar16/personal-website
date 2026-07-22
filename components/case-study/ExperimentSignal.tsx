"use client";

import { useState } from "react";
import { DirectionList } from "./DirectionList";

type Group = "base" | "b" | "highlight";

interface Bar {
  label: string;
  sublabel: string;
  percent: number;
  group: Group;
}

interface LegendItem {
  swatch: Group;
  label: string;
}

interface QualItem {
  title: string;
  body: string;
}

interface Props {
  quantLabel?: string;
  quantSub: string;
  bars: Bar[];
  legend: LegendItem[];
  summary: string;
  qualLabel?: string;
  qualItems: QualItem[];
  decision: string;
}

type Mode = "percent" | "lift";

/* Rounds an axis max up to a clean multiple-of-4 step so five evenly spaced
   ticks (0, 25, 50, 75, 100%) land on tidy numbers. */
function axisTicks(max: number) {
  const step = Math.ceil((max * 1.15) / 4 * 10) / 10 || 0.1;
  return Array.from({ length: 5 }, (_, i) => step * i);
}

/* Quantitative-signal bar chart (with a %/×lift toggle) paired with a
   qualitative numbered read and a decision callout — the "what changed,
   what mattered, so what" read for a single experiment. */
export function ExperimentSignal({
  quantLabel = "Quantitative signal",
  quantSub,
  bars,
  legend,
  summary,
  qualLabel = "Qualitative signal",
  qualItems,
  decision,
}: Props) {
  const [mode, setMode] = useState<Mode>("percent");
  const base = bars.find((b) => b.group === "base")?.percent ?? bars[0].percent;

  const values = bars.map((b) => (mode === "percent" ? b.percent : b.percent / base));
  const ticks = axisTicks(Math.max(...values));
  const axisMax = ticks[ticks.length - 1];

  const fmt = (v: number) => (mode === "percent" ? `${v.toFixed(2)}%` : `${v.toFixed(2)}×`);

  return (
    <div className="cs-exps">
      <div className="cs-exps-head">
        <span className="cs-exps-label">{quantLabel}</span>
        <div className="cs-exps-toggle" role="tablist" aria-label="Chart view">
          {(["percent", "lift"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              className={"cs-exps-toggle-btn" + (mode === m ? " active" : "")}
              onClick={() => setMode(m)}
            >
              {m === "percent" ? "%" : "× lift"}
            </button>
          ))}
        </div>
      </div>
      <p className="cs-exps-sub">{quantSub}</p>

      <div className="cs-exps-chart">
        {bars.map((bar, i) => {
          const widthPct = axisMax > 0 ? (values[i] / axisMax) * 100 : 0;
          return (
            <div className="cs-exps-row" key={bar.label + bar.sublabel}>
              <div className="cs-exps-rowlabel">
                <span className="cs-exps-rowtitle">{bar.label}</span>
                <span className="cs-exps-rowsub">{bar.sublabel}</span>
              </div>
              <div className="cs-exps-track">
                <span
                  className={"cs-exps-fill cs-exps-fill-" + bar.group}
                  style={{ width: `${widthPct}%` }}
                  aria-hidden="true"
                />
                <span className="cs-exps-badge" style={{ left: `calc(${widthPct}% + 8px)` }}>
                  {fmt(values[i])}
                </span>
              </div>
            </div>
          );
        })}
        <div className="cs-exps-axis" aria-hidden="true">
          <span />
          <div className="cs-exps-axis-ticks">
            {ticks.map((t, i) => (
              <span key={i}>{mode === "percent" ? `${t.toFixed(1)}%` : `${t.toFixed(1)}×`}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="cs-exps-legend">
        {legend.map((l) => (
          <span className="cs-exps-legend-item" key={l.label}>
            <span className={"cs-exps-swatch cs-exps-swatch-" + l.swatch} aria-hidden="true" />
            {l.label}
          </span>
        ))}
      </div>

      <p className="cs-exps-summary">{summary}</p>

      <span className="cs-exps-label cs-exps-quallabel">{qualLabel}</span>
      <DirectionList
        items={qualItems.map((it, i) => ({ number: String(i + 1).padStart(2, "0"), ...it }))}
      />

      <div className="cs-exps-decision">
        <strong>Decision:</strong> {decision}
      </div>
    </div>
  );
}
