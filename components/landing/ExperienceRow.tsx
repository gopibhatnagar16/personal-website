"use client";

import { useEffect, useRef, useState } from "react";
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
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const showLogo = c.logo && !failed;

  // a cached image can finish loading before the onLoad handler is attached,
  // which left badges blank until a hard reload — check .complete on mount too
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, [c.logo]);

  return (
    <span
      className={"exp-badge" + (showLogo ? " has-logo" : "")}
      style={showLogo ? undefined : { background: c.color }}
    >
      {showLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          className={loaded ? "img-loaded" : ""}
          src={c.logo}
          alt={`${c.name} logo`}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
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
              <span className="et-name">{c.name}</span>
              <span className="et-yr">{c.year}</span>
            </span>
            <Badge c={c} />
          </span>
        ))}
      </div>
    </section>
  );
}
