interface Segment {
  text: string;
  emphasis?: boolean;
}

/* Eyebrow + a large lead paragraph where selected phrases are emphasized
   inline, rest muted. Used to open the Problem section with the statement
   itself as the header, instead of a short title. */
export function ProblemStatement({ eyebrow, segments }: { eyebrow: string; segments: Segment[] }) {
  return (
    <div className="cs-si cs-ps">
      <div className="cs-si-eyebrow">
        <span>/ {eyebrow}</span>
        <span className="cs-si-rule" aria-hidden="true" />
      </div>
      <p className="cs-ps-text">
        {segments.map((s, i) =>
          s.emphasis ? <strong key={i}>{s.text}</strong> : <span key={i}>{s.text}</span>
        )}
      </p>
    </div>
  );
}
