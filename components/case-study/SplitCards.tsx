interface SplitItem {
  lead?: string;
  text: string;
}

interface SplitCard {
  label: string;
  title: string;
  items: SplitItem[];
  accent: "warn" | "positive";
}

/* Two equal-height columns for a compare pair, e.g. pain points vs.
   design response — a colored label, a title, and a marker list. */
export function SplitCards({ cards }: { cards: SplitCard[] }) {
  return (
    <div className="cs-split">
      {cards.map((card) => (
        <div className={"cs-split-col cs-split-" + card.accent} key={card.label}>
          <span className="cs-split-label">{card.label}</span>
          <h4 className="cs-split-title">{card.title}</h4>
          <ul className="cs-split-list">
            {card.items.map((it, i) => (
              <li key={i}>
                {it.lead && <strong>{it.lead}: </strong>}
                {it.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
