"use client";

import { useEffect, useState } from "react";

interface Props {
  src?: string;
  alt?: string;
  caption?: string;
}

/* Case-study figure. Without `src` it renders the grey placeholder block.
   With `src`, clicking opens a full-page lightbox (Escape / click / ×
   to close). */
export function CaseImage({ src, alt = "", caption }: Props) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <figure className="cs-fig">
      {src ? (
        <button
          type="button"
          className="cs-fig-btn"
          onClick={() => setOpen(true)}
          aria-label={alt ? `Expand image: ${alt}` : "Expand image"}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={"cs-fig-img" + (loaded ? " img-loaded" : "")}
            src={src}
            alt={alt}
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
        </button>
      ) : (
        <div className="cs-img" aria-hidden="true" />
      )}
      {caption && <figcaption className="cs-figcap">{caption}</figcaption>}

      {open && src && (
        <div
          className="cs-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={alt || caption || "Image"}
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="cs-lightbox-close"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={"cs-lightbox-img" + (loaded ? " img-loaded" : "")} src={src} alt={alt} />
          {caption && <span className="cs-lightbox-cap">{caption}</span>}
        </div>
      )}
    </figure>
  );
}
