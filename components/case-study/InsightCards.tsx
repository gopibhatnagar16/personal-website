interface Insight {
  title: string;
  body: string;
}

/* 3-up equal-height card grid, replacing a plain bullet list. */
export function InsightCards({ items }: { items: Insight[] }) {
  return (
    <div className="cs-insights">
      {items.map((item) => (
        <div className="cs-insight-card" key={item.title}>
          <span className="cs-insight-title">{item.title}</span>
          <p className="cs-insight-body">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
