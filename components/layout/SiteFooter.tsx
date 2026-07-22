"use client";

import { CONFIG } from "@/lib/config";
import { useEyes } from "@/components/shared/EyesCursor";

interface Props {
  // "fixed" (default) — the landing page's scroll-reveal footer, pinned
  // beneath the content layer. "static" — a normal in-flow footer for the
  // case-study / writing pages, which don't have the reveal-on-scroll rig.
  variant?: "fixed" | "static";
}

export function SiteFooter({ variant = "fixed" }: Props) {
  const bind = useEyes();

  return (
    <footer className={"site-footer" + (variant === "static" ? " site-footer-static" : "")} {...bind("📩")}>
      <div className="ft-inner">
        <div className="ft-note">
          <span className="ft-tape" aria-hidden="true" />
          <p className="ft-note-body">
            Thanks for being here!
            <br />
            Design to me is much more than a profession and a way of living. If something here
            stayed with you, say hello at{" "}
            <a href={`mailto:${CONFIG.email}`}>
              gopibhatnagar<span className="num">16</span>@gmail.com
            </a>{" "}
            :)
          </p>
        </div>

        <div className="ft-veil" aria-hidden="true" />

        <div className="ft-social">
          <a className="ft-chip r1" href={`mailto:${CONFIG.email}`} aria-label="Email">
            <span className="ft-label">Email</span>
            <span className="mailicon" aria-hidden="true">
              <span className="mi-open" />
              <span className="mi-flap" />
              <span className="mi-body" />
            </span>
          </a>
          <a
            className="ft-chip r2"
            href={CONFIG.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <span className="ft-label">LinkedIn</span>
            <svg width="48" height="48" viewBox="0 0 448 512" fill="currentColor">
              <path d="M100.28 448H7.4V148.9h92.88zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 148.2z" />
              <path
                className="in-dot"
                d="M53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3z"
              />
            </svg>
          </a>
          <a
            className="ft-chip r3"
            href={CONFIG.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <span className="ft-label">Twitter</span>
            <svg width="46" height="46" viewBox="0 0 512 512" fill="currentColor">
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
          </a>
          <a
            className="ft-chip r4 ft-env"
            href={CONFIG.socials.resume}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume"
          >
            <span className="ft-label">Open resume</span>
            <svg className="envsvg" viewBox="22 20 56 64" aria-hidden="true">
              <path d="M26 46 L50 30 L74 46 Z" fill="#D4D3CE" />
              <g className="env-cardg">
                <rect x="32" y="26" width="36" height="44" rx="2" fill="#ECEBE7" />
                <rect x="32" y="26" width="36" height="44" rx="2" fill="none" stroke="rgba(0,0,0,.14)" strokeWidth="0.8" />
                <rect x="37" y="30.5" width="26" height="1.4" rx="0.7" fill="rgba(0,0,0,.20)" />
                <rect x="37" y="35" width="20" height="1.4" rx="0.7" fill="rgba(0,0,0,.20)" />
              </g>
              <g className="env-frontg">
                <rect x="26" y="40" width="48" height="40" rx="4" fill="#FDFDFC" />
              </g>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
