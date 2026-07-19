"use client";

import { CONFIG } from "@/lib/config";
import { useEyes } from "@/components/shared/EyesCursor";

export function ExperienceRow() {
  const bind = useEyes();
  return (
    <section className="section" id="experience">
      <span className="section-label">Experience</span>
      <p className="section-intro">I have 3+ years of work experience, some of which are:</p>
      <div className="exp-row">
        {CONFIG.experience.map((c) => (
          <span className="exp-item" key={c.name} {...bind("💼")}>
            <span className="exp-tip">
              <span className="et-name">{c.name}</span>
              <span className="et-yr">{c.year}</span>
            </span>
            <span className="exp-badge" style={{ background: c.color }}>
              {c.initial}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
