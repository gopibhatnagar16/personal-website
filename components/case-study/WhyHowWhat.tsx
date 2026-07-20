interface WhwItem {
  k: string;
  title: string;
  body: string;
}

/* Three-up "Why → How → What" card flow. Server-safe (no state). */
export function WhyHowWhat({ items }: { items: WhwItem[] }) {
  return (
    <div className="cs-whw">
      {items.map((it, i) => (
        <div className="cs-whw-item" key={it.k}>
          {i > 0 && <span className="cs-whw-arrow" aria-hidden="true">→</span>}
          <div className="cs-whw-card">
            <span className="cs-whw-k">{it.k}</span>
            <span className="cs-whw-title">{it.title}</span>
            <p className="cs-whw-body">{it.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
