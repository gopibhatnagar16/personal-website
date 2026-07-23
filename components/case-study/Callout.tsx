interface Segment {
  text: string;
  emphasis?: boolean;
}

/* Bordered callout box for a lead paragraph with inline emphasis — used in
   place of a plain paragraph when the statement itself should stand out. */
export function Callout({ segments }: { segments: Segment[] }) {
  return (
    <div className="cs-callout">
      <p>
        {segments.map((s, i) =>
          s.emphasis ? <strong key={i}>{s.text}</strong> : <span key={i}>{s.text}</span>
        )}
      </p>
    </div>
  );
}
