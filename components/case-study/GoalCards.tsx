interface Goal {
  label: string;
  body: string;
  highlight?: boolean;
}

/* Two-up goal cards, one optionally highlighted in the accent color. */
export function GoalCards({ items }: { items: Goal[] }) {
  return (
    <div className="cs-goals">
      {items.map((it) => (
        <div className={"cs-goal-card" + (it.highlight ? " highlight" : "")} key={it.label}>
          <span className="cs-goal-label">{it.label}</span>
          <p className="cs-goal-body">{it.body}</p>
        </div>
      ))}
    </div>
  );
}
