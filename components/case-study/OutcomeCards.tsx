interface Outcome {
  stat: string;
  description: string;
}

/* 2x2 grid of outcome stats, replacing a plain bullet list. */
export function OutcomeCards({ items }: { items: Outcome[] }) {
  return (
    <div className="cs-outcomes">
      {items.map((item) => (
        <div className="cs-outcome-card" key={item.stat}>
          <span className="cs-outcome-stat">{item.stat}</span>
          <span className="cs-outcome-desc">{item.description}</span>
        </div>
      ))}
    </div>
  );
}
