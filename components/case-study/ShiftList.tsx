interface Shift {
  from: string;
  to: string;
}

/* Numbered FROM → TO rows, replacing a plain "from X to Y" bullet list. */
export function ShiftList({ items }: { items: Shift[] }) {
  return (
    <div className="cs-shift">
      {items.map((it, i) => (
        <div className="cs-shift-row" key={i}>
          <span className="cs-shift-badge">{i + 1}</span>
          <div className="cs-shift-col">
            <span className="cs-shift-label">From</span>
            <span className="cs-shift-text cs-shift-from">{it.from}</span>
          </div>
          <span className="cs-shift-arrow" aria-hidden="true">→</span>
          <div className="cs-shift-col">
            <span className="cs-shift-label">To</span>
            <span className="cs-shift-text cs-shift-to">{it.to}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
