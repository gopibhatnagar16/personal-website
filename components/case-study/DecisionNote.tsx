interface Props {
  label: string;
  title: string;
  body: string;
}

/* Bordered callout for a single product decision — a small label, the
   decision itself in bold, and the reasoning below. */
export function DecisionNote({ label, title, body }: Props) {
  return (
    <div className="cs-decision">
      <span className="cs-decision-label">{label}</span>
      <p className="cs-decision-title">{title}</p>
      <p className="cs-decision-body">{body}</p>
    </div>
  );
}
