interface Props {
  id: string;
  index: string;
  name: string;
  subtitle: string;
}

/* Section header for an individual experiment inside the growth-experiments
   case study — mirrors the landing page's label/heading/intro pattern
   (section-label + section-heading + section-intro) rather than the cs-body
   h2 style, and carries the anchor id the experiment map scrolls to. */
export function ExperimentHeader({ id, index, name, subtitle }: Props) {
  return (
    <div className="cs-exp-header" id={id}>
      <span className="cs-exp-label">Experiment {index}</span>
      <h2 className="cs-exp-title">{name}</h2>
      <p className="cs-exp-subtitle">{subtitle}</p>
    </div>
  );
}
