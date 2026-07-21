"use client";

import { Mail, Linkedin, Twitter, FileText } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { useEyes } from "@/components/shared/EyesCursor";

/* Scroll-reveal footer — fixed beneath the content layer */
export function SiteFooter() {
  const bind = useEyes();
  return (
    <footer className="site-footer" {...bind("📩")}>
      <div className="ft-inner">
        <div className="ft-note">
          <span className="ft-note-date">{CONFIG.lastUpdated}</span>
          <p className="ft-note-body">
            Hey — thanks for scrolling all the way down. If something here made you pause, or
            you just want to talk shop, my inbox is always open.
          </p>
          <span className="ft-note-sign">— {CONFIG.name}</span>
        </div>

        <div className="ft-veil" aria-hidden="true" />

        <div className="ft-social">
          <a
            className="ft-chip r1"
            href={`mailto:${CONFIG.email}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <span className="ft-label">Email</span>
            <Mail size={36} strokeWidth={2} />
          </a>
          <a
            className="ft-chip r2"
            href={CONFIG.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <span className="ft-label">LinkedIn</span>
            <Linkedin size={36} strokeWidth={2} />
          </a>
          <a
            className="ft-chip r3"
            href={CONFIG.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <span className="ft-label">Twitter</span>
            <Twitter size={36} strokeWidth={2} />
          </a>
          <a
            className="ft-chip r4"
            href={CONFIG.socials.resume}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume"
          >
            <span className="ft-label">Resume</span>
            <FileText size={36} strokeWidth={2} />
          </a>
        </div>
      </div>
    </footer>
  );
}
