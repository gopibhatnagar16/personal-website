interface DotItem {
  lead: string;
  text: string;
}

/* Dot-marker row list — a bold lead phrase and description per row,
   divided by hairlines. Used where a prose "X (reason), Y (reason)"
   sentence reads better broken into scannable rows. */
export function DotList({ items }: { items: DotItem[] }) {
  return (
    <div className="cs-dot-list">
      {items.map((it) => (
        <div className="cs-dot-row" key={it.lead}>
          <span className="cs-dot-marker" aria-hidden="true" />
          <span className="cs-dot-lead">{it.lead}</span>
          <span className="cs-dot-text">{it.text}</span>
        </div>
      ))}
    </div>
  );
}
