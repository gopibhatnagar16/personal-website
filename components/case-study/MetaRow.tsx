interface MetaItem {
  label: string;
  value: string;
}

/* Small inline "LABEL / value" row — reuses the page-header meta style
   for in-body facts, e.g. Business / Signal / Need. */
export function MetaRow({ items }: { items: MetaItem[] }) {
  return (
    <div className="cs-meta cs-meta-inline">
      {items.map((it) => (
        <div className="cs-m" key={it.label}>
          <span className="cs-mk">{it.label}</span>
          <span className="cs-mv">{it.value}</span>
        </div>
      ))}
    </div>
  );
}
