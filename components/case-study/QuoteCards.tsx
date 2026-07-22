interface QuoteCard {
  label: string;
  body: string;
  quote: string;
}

/* 2x2 grid of research personas — a category label, a description, and
   a supporting verbatim quote. Replaces a plain bullet list of quotes. */
export function QuoteCards({ items }: { items: QuoteCard[] }) {
  return (
    <div className="cs-qc">
      {items.map((it) => (
        <div className="cs-qc-card" key={it.label}>
          <span className="cs-qc-label">{it.label}</span>
          <p className="cs-qc-body">{it.body}</p>
          <blockquote className="cs-qc-quote">{it.quote}</blockquote>
        </div>
      ))}
    </div>
  );
}
