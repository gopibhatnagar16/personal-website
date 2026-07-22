"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  src?: string;
  alt?: string;
  caption?: string;
  /* Reserves the figure's box (e.g. "816/510") before the image loads and
     keeps it fixed across slide changes, so swapping to a different image
     of a different intrinsic size never shifts the surrounding layout. */
  aspectRatio?: string;
  /* Wraps the image in a browser-window frame (traffic lights + address
     bar) — used for product-screenshot slides inside a tabbed switcher. */
  chrome?: boolean;
}

/* Case-study figure. Without `src` it renders the grey placeholder block.
   With `src`, clicking opens a full-page lightbox (Escape / click / ×
   to close). */
export function CaseImage({ src, alt = "", caption, aspectRatio, chrome }: Props) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Cached images can finish loading before this effect (and the onLoad
    // listener) attaches, which would otherwise leave opacity stuck at 0.
    if (imgRef.current?.complete) setLoaded(true);
  }, [src]);

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

  const frameStyle = aspectRatio ? { aspectRatio } : undefined;

  const figure = src ? (
    <button
      type="button"
      className={"cs-fig-btn" + (aspectRatio ? " cs-fig-btn-ratio" : "")}
      style={frameStyle}
      onClick={() => setOpen(true)}
      aria-label={alt ? `Expand image: ${alt}` : "Expand image"}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        className={"cs-fig-img" + (loaded ? " img-loaded" : "")}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
      />
    </button>
  ) : (
    <div
      className={"cs-img" + (aspectRatio ? " cs-img-ratio" : "")}
      style={frameStyle}
      aria-hidden="true"
    />
  );

  return (
    <figure className="cs-fig">
      {chrome ? (
        <div className="cs-chrome">
          <div className="cs-chrome-bar" aria-hidden="true">
            <span className="cs-chrome-dots">
              <span />
              <span />
              <span />
            </span>
            <span className="cs-chrome-url">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              razorpay.com
            </span>
          </div>
          {figure}
        </div>
      ) : (
        figure
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
