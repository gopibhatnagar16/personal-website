interface Props {
  src: string;
  alt?: string;
  caption?: string;
  /* Zooms the video slightly and clips the overflow — hides a stray edge
     artifact baked into the source recording without re-encoding it. */
  crop?: boolean;
  /* Drops the border/radius chrome — for videos that should sit flush,
     e.g. framed by their own background rather than the figure chrome. */
  noBorder?: boolean;
}

/* Case-study video: muted, autoplay, loop — a product-loop in place of a
   giant GIF. Same figure chrome as CaseImage (border, radius, caption). */
export function CaseVideo({ src, alt, caption, crop, noBorder }: Props) {
  const video = (
    <video
      className={"cs-fig-video" + (crop ? " cs-fig-video-crop" : "") + (noBorder ? " cs-fig-video-noborder" : "")}
      src={src}
      aria-label={alt}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
    />
  );

  return (
    <figure className="cs-fig">
      {crop ? <div className="cs-fig-video-crop-wrap">{video}</div> : video}
      {caption && <figcaption className="cs-figcap">{caption}</figcaption>}
    </figure>
  );
}
