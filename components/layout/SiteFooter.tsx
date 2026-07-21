"use client";

import { useEffect, useState } from "react";
import { Mail, Linkedin, Twitter, FileText, Sun } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { useEyes } from "@/components/shared/EyesCursor";

function fmtTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: CONFIG.timeZone,
  }).format(new Date());
}

/* Scroll-reveal footer — fixed beneath the content layer */
export function SiteFooter() {
  const bind = useEyes();
  // start empty so the server and first client render agree
  const [now, setNow] = useState("");

  useEffect(() => {
    setNow(fmtTime());
    const id = setInterval(() => setNow(fmtTime()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="site-footer" {...bind("📩")}>
      <div className="ft-inner">
        <div className="ft-meta">
          <div className="ft-meta-block">
            <span className="ft-meta-label">Last updated</span>
            <span className="ft-meta-value">{CONFIG.lastUpdated}</span>
          </div>
          <div className="ft-meta-block ft-meta-right">
            <span className="ft-meta-label">Currently</span>
            <span className="ft-meta-value">
              <Sun size={14} strokeWidth={2} />
              {CONFIG.location}
              {now ? `, ${now}` : ""}
            </span>
          </div>
        </div>

        <div className="ft-note">
          <span className="ft-note-label">Note from {CONFIG.name.split(" ")[0]}</span>
          <p className="ft-note-body">
            Hey — thanks for scrolling all the way down. If something here made you pause, say hi
            at{" "}
            <a className="ft-note-mail" href={`mailto:${CONFIG.email}`}>
              {CONFIG.email}
            </a>
            .
          </p>
          <span className="ft-note-sign">— {CONFIG.name}</span>
        </div>

        <div className="ft-social">
          <a
            className="ft-chip r1"
            href={`mailto:${CONFIG.email}`}
            aria-label="Email"
          >
            <span className="ft-label">Email</span>
            <Mail size={42} strokeWidth={1.75} />
          </a>
          <a
            className="ft-chip r2"
            href={CONFIG.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <span className="ft-label">LinkedIn</span>
            <Linkedin size={42} strokeWidth={1.75} />
          </a>
          <a
            className="ft-chip r3"
            href={CONFIG.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <span className="ft-label">Twitter</span>
            <Twitter size={42} strokeWidth={1.75} />
          </a>
          <a
            className="ft-chip r4"
            href={CONFIG.socials.resume}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume"
          >
            <span className="ft-label">Resume</span>
            <FileText size={42} strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </footer>
  );
}
