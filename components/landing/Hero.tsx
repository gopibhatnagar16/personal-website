"use client";

import { useEffect, useRef, useState } from "react";
import { AVATAR_GREYS, CONFIG } from "@/lib/config";
import { useEyes } from "@/components/shared/EyesCursor";

export function Hero() {
  const bind = useEyes();
  const [fanned, setFanned] = useState(false);
  const [veil, setVeil] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // see EyesCursor — touch taps fire a synthetic mouseenter with no matching
  // mouseleave, which would otherwise leave the background blur stuck on.
  const hoverCapable = useRef(true);

  useEffect(() => {
    hoverCapable.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  const copyEmail = () => {
    const done = () => {
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    };
    try {
      navigator.clipboard.writeText(CONFIG.email).then(done, done);
    } catch {
      done();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "c" && !e.metaKey && !e.ctrlKey && !e.altKey) copyEmail();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const eyesHandlers = bind("👀");
  const photoFor = (i: number) =>
    CONFIG.photos[i]
      ? { backgroundImage: `url(${CONFIG.photos[i]})` }
      : { backgroundImage: AVATAR_GREYS[i % AVATAR_GREYS.length] };

  return (
    <main className="about">
      <div
        className={"ava" + (fanned ? " open" : "")}
        onClick={() => {
          setFanned((v) => !v);
          document.getElementById("personal")?.scrollIntoView({ behavior: "smooth" });
          // touch has no mouseleave to settle the fan/veil back down after the
          // tap scrolls away, so clear them on a timer instead.
          if (!hoverCapable.current) {
            window.setTimeout(() => {
              setFanned(false);
              setVeil(false);
            }, 700);
          }
        }}
        onMouseEnter={(e) => { eyesHandlers.onMouseEnter(e); if (hoverCapable.current) setVeil(true); }}
        onMouseMove={eyesHandlers.onMouseMove}
        onMouseLeave={() => { setFanned(false); eyesHandlers.onMouseLeave(); setVeil(false); }}
        role="img"
        aria-label={`${CONFIG.name} — photos`}
        tabIndex={0}
      >
        <span className="card c0" style={photoFor(0)} />
        <span className="card c1" style={photoFor(1)} />
        <span className="card c2" style={photoFor(2)} />
        <span className="card c3" style={photoFor(3)} />
        <span className="ava-tip" aria-hidden="true">Click to Know more</span>
      </div>

      <h1 className="title">
        {CONFIG.title}
        {CONFIG.titleLine2 ? (<><br />{CONFIG.titleLine2}</>) : null}
      </h1>

      <p className="ideology">{CONFIG.ideology[0]}</p>
      <p className="ideology">{CONFIG.ideology[1]}</p>

      <button className={"pressc" + (copied ? " pressc-copied" : "")} onClick={copyEmail}>
        {copied ? (<>Email copied&nbsp;✓</>) : (<>Press <kbd>C</kbd> to copy my email</>)}
      </button>

      <div className={"blur-veil" + (veil || fanned ? " visible" : "")} aria-hidden="true" />
    </main>
  );
}
