import { Search, UserPlus, FileText, SlidersHorizontal, LayoutGrid, type LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  search: Search,
  userPlus: UserPlus,
  fileText: FileText,
  sliders: SlidersHorizontal,
  grid: LayoutGrid,
};

interface Step {
  icon: keyof typeof ICONS;
  title: string;
  sub: string;
  highlight?: boolean;
  callout?: string;
}

/* Icon-and-arrow journey strip for the final solution: each step gets an
   icon, title, and one-line caption; highlighted steps get a callout
   above, pointing at what changed there. Replaces a flat annotated image. */
export function JourneyFlow({ heading, steps }: { heading?: string; steps: Step[] }) {
  return (
    <div className="cs-jf">
      {heading && <span className="cs-jf-heading">{heading}</span>}
      <div className="cs-jf-row">
        {steps.map((step, i) => {
          const Icon = ICONS[step.icon];
          return (
            <div className="cs-jf-item-wrap" key={step.title}>
              {i > 0 && <span className="cs-jf-arrow" aria-hidden="true">→</span>}
              <div className={"cs-jf-item" + (step.highlight ? " highlight" : "")}>
                {step.callout && (
                  <div className="cs-jf-callout">
                    <span className="cs-jf-callout-arrow" aria-hidden="true">↑</span>
                    <span className="cs-jf-callout-text">{step.callout}</span>
                  </div>
                )}
                <span className="cs-jf-icon">
                  <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="cs-jf-title">{step.title}</span>
                <span className="cs-jf-sub">{step.sub}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
