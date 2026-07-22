interface Props {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

/* Section header: "/ EYEBROW —— rule", a large title, and an optional
   subtitle. Used to open a case-study section in place of a plain h2. */
export function SectionIntro({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="cs-si">
      <div className="cs-si-eyebrow">
        <span>/ {eyebrow}</span>
        <span className="cs-si-rule" aria-hidden="true" />
      </div>
      <h2 className="cs-si-title">{title}</h2>
      {subtitle && <p className="cs-si-subtitle">{subtitle}</p>}
    </div>
  );
}
