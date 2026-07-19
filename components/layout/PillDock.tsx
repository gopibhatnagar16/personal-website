"use client";

import { useEffect, useState } from "react";
import { Mail, Linkedin, Twitter } from "lucide-react";
import { CONFIG } from "@/lib/config";

/* Sticky pill dock — fades out once the footer starts revealing */
export function PillDock() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const dist =
        document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      setHidden(dist < 340);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className={"pilldock" + (hidden ? " hidden" : "")}>
      <a className="pd-btn" href={`mailto:${CONFIG.email}`} aria-label="Email">
        <Mail size={18} strokeWidth={1.9} />
        <span className="pd-tip">Email</span>
      </a>
      <a className="pd-btn" href={CONFIG.socials.linkedin} aria-label="LinkedIn">
        <Linkedin size={18} strokeWidth={1.9} />
        <span className="pd-tip">LinkedIn</span>
      </a>
      <a className="pd-btn" href={CONFIG.socials.twitter} aria-label="Twitter">
        <Twitter size={18} strokeWidth={1.9} />
        <span className="pd-tip">Twitter</span>
      </a>
    </div>
  );
}
