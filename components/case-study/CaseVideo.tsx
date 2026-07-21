interface Props {
  src: string;
  alt?: string;
  caption?: string;
}

/* Case-study video: muted, autoplay, loop — a product-loop in place of a
   giant GIF. Same figure chrome as CaseImage (border, radius, caption). */
export function CaseVideo({ src, alt, caption }: Props) {
  return (
    <figure className="cs-fig">
      <video
        className="cs-fig-video"
        src={src}
        aria-label={alt}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      />
      {caption && <figcaption className="cs-figcap">{caption}</figcaption>}
    </figure>
  );
}
