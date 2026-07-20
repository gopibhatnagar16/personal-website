"use client";

import { useState } from "react";
import { CONFIG } from "@/lib/config";
import { useEyes } from "@/components/shared/EyesCursor";

interface Exp {
  name: string;
  color: string;
  initial: string;
  year: string;
  logo?: string;
}

function Badge({ c }: { c: Exp }) {
  // fall back to the lettered circle if the remote logo fails to load
  const [failed, setFailed] = useState(false);
  const showLogo = c.logo && !failed;

  return (
    <span
      className={"exp-badge" + (showLogo ? " has-logo" : "")}
      style={showLogo ? undefined : { background: c.color }}
    >
      {showLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={c.logo} alt={`${c.name} logo`} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        c.initial
      )}
    </span>
  );
}

export function ExperienceRow() {
  const bind = useEyes();
  return (
    <section className="section" id="experience">
      <span className="section-label">Experience</span>
      <p className="section-intro">I have 3+ years of work experience, some of which are:</p>
      <div className="exp-row">
        {(CONFIG.experience as Exp[]).map((c) => (
          <span className="exp-item" key={c.name} {...bind("💼")}>
            <span className="exp-tip">
              {c.name} · {c.year}
            </span>
            <Badge c={c} />
          </span>
        ))}
      </div>
    </section>
  );
}
