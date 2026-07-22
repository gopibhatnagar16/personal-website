interface Direction {
  number: string;
  title: string;
  body: string;
}

/* Numbered direction rows — "01 Title — description", divided by
   hairlines. Used under a How-might-we quote in place of an inline list. */
export function DirectionList({ items }: { items: Direction[] }) {
  return (
    <div className="cs-dl">
      {items.map((it) => (
        <div className="cs-dl-row" key={it.number}>
          <div className="cs-dl-head">
            <span className="cs-dl-num">{it.number}</span>
            <span className="cs-dl-title">{it.title}</span>
          </div>
          <p className="cs-dl-body">{it.body}</p>
        </div>
      ))}
    </div>
  );
}
