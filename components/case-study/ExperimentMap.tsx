interface MapItem {
  index: string;
  title: string;
  description: string;
  id: string;
}

interface Props {
  eyebrow: string;
  heading: string;
  subtitle: string;
  items: MapItem[];
}

/* Overview map linking to each experiment section below — plain anchors so
   the smooth-scroll (see html{scroll-behavior} in globals.css) works with
   no client JS. */
export function ExperimentMap({ eyebrow, heading, subtitle, items }: Props) {
  return (
    <div className="cs-map">
      <span className="cs-map-eyebrow">{eyebrow}</span>
      <h2 className="cs-map-heading">{heading}</h2>
      <p className="cs-map-subtitle">{subtitle}</p>
      <div className="cs-map-grid">
        {items.map((item) => (
          <a className="cs-map-card" href={`#${item.id}`} key={item.id}>
            <span className="cs-map-num">Experiment {item.index}</span>
            <span className="cs-map-title">{item.title}</span>
            <p className="cs-map-desc">{item.description}</p>
            <span className="cs-map-link">Read story →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
