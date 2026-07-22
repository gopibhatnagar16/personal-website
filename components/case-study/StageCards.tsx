interface Stage {
  title: string;
  description: string;
}

/* Equal-height row of merchant-journey stages, replacing a plain bullet list. */
export function StageCards({ items }: { items: Stage[] }) {
  return (
    <div className="cs-stages">
      {items.map((item) => (
        <div className="cs-stage-card" key={item.title}>
          <span className="cs-stage-title">{item.title}</span>
          <p className="cs-stage-desc">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
