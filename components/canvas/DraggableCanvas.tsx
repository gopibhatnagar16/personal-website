"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { SHAPE_GREYS, type CanvasItem } from "@/lib/config";

interface Props {
  items: CanvasItem[];
  height: number;
  variant?: "mat" | "board";
  // false = a fixed board: items are positioned in % and clamped to stay
  // on it, no background panning. true (default) = infinite pan, world-space px.
  pannable?: boolean;
  // pan + (for mat) mat color now live in the parent so the controls can be
  // rendered outside the canvas, alongside the section title — see CanvasControls.
  pan: { x: number; y: number };
  setPan: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  matColor?: MatColor;
}

// mat surface + grid/guide color presets — classic is the exact
// cutting-mat-generator.vercel.app default, the rest match the palette pairs
// from the personal-site Figma color system.
export const MAT_COLORS = [
  { id: "classic", label: "Classic", bg: "#00332A", grid: "#E5E55A" },
  { id: "pink", label: "Pink", bg: "#C4279C", grid: "#F0A0E8" },
  { id: "coral", label: "Coral", bg: "#EE4028", grid: "#FBDFDA" },
  { id: "mint", label: "Mint", bg: "#2A6B40", grid: "#A3E8AC" },
  { id: "blue", label: "Blue", bg: "#28579E", grid: "#BFE1FA" },
] as const;

export type MatColor = (typeof MAT_COLORS)[number];

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const RESET_MS = 380;

// shared pan + mat-color state for one canvas instance, lifted out of
// DraggableCanvas so the controls can render in the section header instead
// of floating over the canvas itself.
export function useCanvasControls() {
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [matColor, setMatColor] = useState<MatColor>(MAT_COLORS[0]);
  const panRef = useRef(pan);
  panRef.current = pan;
  const rafRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  // eases the pan back to the origin instead of snapping there instantly —
  // tweens the same state everything else reads (grid, ruler, items).
  const resetPan = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const from = panRef.current;
    if (from.x === 0 && from.y === 0) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / RESET_MS, 1);
      const e = easeInOutCubic(t);
      setPan({ x: from.x * (1 - e), y: from.y * (1 - e) });
      rafRef.current = t < 1 ? requestAnimationFrame(tick) : null;
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  return { pan, setPan, matColor, setMatColor, resetPan };
}

/* color swatches (mat only) + reset button — rendered in the section header,
   aligned with the title, rather than floating over the canvas. */
export function CanvasControls({
  variant,
  matColor,
  setMatColor,
  pan,
  resetPan,
}: {
  variant?: "mat" | "board";
  matColor?: MatColor;
  setMatColor?: React.Dispatch<React.SetStateAction<MatColor>>;
  pan: { x: number; y: number };
  resetPan: () => void;
}) {
  const isPanned = pan.x !== 0 || pan.y !== 0;
  return (
    <div className={"canvas-controls" + (variant ? " " + variant : "")}>
      {variant === "mat" && matColor && setMatColor && (
        <div className="canvas-colors" role="group" aria-label="Cutting mat color">
          {MAT_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              className={"canvas-swatch" + (c.id === matColor.id ? " active" : "")}
              style={{ background: c.bg }}
              aria-label={`${c.label} mat`}
              aria-pressed={c.id === matColor.id}
              onClick={() => setMatColor(c)}
            />
          ))}
        </div>
      )}
      <button
        type="button"
        className={"canvas-reset" + (isPanned ? " visible" : "")}
        onClick={resetPan}
        aria-label="Reset canvas position"
        tabIndex={isPanned ? 0 : -1}
      >
        <RotateCcw size={13} strokeWidth={1.9} />
      </button>
    </div>
  );
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// ruler + protractor decoration for the mat variant — px-per-unit and the
// major-line spacing match the grid background drawn in globals.css (24px/120px).
const RULER_UNIT_PX = 24;
const RULER_MAJOR_PX = RULER_UNIT_PX * 5;
const RULER_RANGE = Array.from({ length: 60 }, (_, i) => i - 10); // -10..49, in units of 5
const PROTRACTOR_SIZE = 240;
const PROTRACTOR_ORIGIN = { x: -90, y: 250 }; // world px — a clear pocket between the tidbits cards

function protractorSvg() {
  const cx = 0;
  const cy = PROTRACTOR_SIZE;
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const pt = (deg: number, r: number) => ({ x: cx + r * Math.cos(rad(deg)), y: cy - r * Math.sin(rad(deg)) });
  const angles = [0, 15, 30, 45, 60, 75, 90];
  const lines = angles.map((a) => {
    const p = pt(a, PROTRACTOR_SIZE - 5);
    return `<line x1="${cx}" y1="${cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke-width="1" stroke-dasharray="3 5" opacity=".38"/>`;
  });
  const arcs = [70, 140].map((r) => {
    const a = pt(0, r);
    const b = pt(90, r);
    return `<path d="M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${r} ${r} 0 0 0 ${b.x.toFixed(1)} ${b.y.toFixed(1)}" fill="none" stroke-width="1" stroke-dasharray="2 4" opacity=".32"/>`;
  });
  const labels = [15, 30, 45, 60].map((a) => {
    const p = pt(a, 84);
    return `<text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" font-size="9" opacity=".85" text-anchor="middle">${a}°</text>`;
  });
  return `<svg viewBox="0 0 ${PROTRACTOR_SIZE} ${PROTRACTOR_SIZE}" width="${PROTRACTOR_SIZE}" height="${PROTRACTOR_SIZE}" xmlns="http://www.w3.org/2000/svg">${lines.join("")}${arcs.join("")}${labels.join("")}</svg>`;
}
const PROTRACTOR_SVG = protractorSvg();

/* draggable canvas — infinite pan (mat) or a fixed, bounded board */
export function DraggableCanvas({ items, height, variant, pannable = true, pan, setPan, matColor }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; ox: number; oy: number } | null>(null);
  const panDrag = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const zTop = useRef(items.length);
  const [pos, setPos] = useState<Record<string, { x: number; y: number; z: number }>>(() => {
    const o: Record<string, { x: number; y: number; z: number }> = {};
    items.forEach((it, i) => (o[it.id] = { x: it.x, y: it.y, z: i + 1 }));
    return o;
  });

  // card drag — world-space px when pannable, else % of the board, clamped to its bounds
  const onDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    const r = canvasRef.current!.getBoundingClientRect();
    if (pannable) {
      const screenX = pos[id].x + pan.x;
      const screenY = pos[id].y + pan.y;
      drag.current = { id, ox: e.clientX - r.left - screenX, oy: e.clientY - r.top - screenY };
    } else {
      const curX = (pos[id].x / 100) * r.width;
      const curY = (pos[id].y / 100) * r.height;
      drag.current = { id, ox: e.clientX - r.left - curX, oy: e.clientY - r.top - curY };
    }
    zTop.current += 1;
    setPos((s) => ({ ...s, [id]: { ...s[id], z: zTop.current } }));
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const r = canvasRef.current!.getBoundingClientRect();
    const id = drag.current.id;
    if (pannable) {
      const x = e.clientX - r.left - drag.current.ox - pan.x;
      const y = e.clientY - r.top - drag.current.oy - pan.y;
      setPos((s) => ({ ...s, [id]: { ...s[id], x, y } }));
    } else {
      const it = items.find((i) => i.id === id)!;
      const xPx = e.clientX - r.left - drag.current.ox;
      const yPx = e.clientY - r.top - drag.current.oy;
      const wPct = (it.w / r.width) * 100;
      const hPct = (it.h / r.height) * 100;
      const xPct = clamp((xPx / r.width) * 100, 0, 100 - wPct);
      const yPct = clamp((yPx / r.height) * 100, 0, 100 - hPct);
      setPos((s) => ({ ...s, [id]: { ...s[id], x: xPct, y: yPct } }));
    }
  };
  const onUp = () => (drag.current = null);

  // background drag — pans the whole mat, unbounded in every direction (pannable only)
  const onCanvasDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    panDrag.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y };
  };
  const onCanvasMove = (e: React.PointerEvent) => {
    if (!panDrag.current) return;
    const dx = e.clientX - panDrag.current.x;
    const dy = e.clientY - panDrag.current.y;
    setPan({ x: panDrag.current.panX + dx, y: panDrag.current.panY + dy });
  };
  const onCanvasUp = () => (panDrag.current = null);

  return (
    <div
      className={"canvas" + (variant ? " " + variant : "")}
      style={
        {
          height: height + 20,
          "--pan-x": pan.x + "px",
          "--pan-y": pan.y + "px",
          ...(variant === "mat" && matColor ? { "--mat-color": matColor.bg, "--mat-grid": matColor.grid } : {}),
        } as React.CSSProperties
      }
      ref={canvasRef}
      onPointerDown={pannable ? onCanvasDown : undefined}
      onPointerMove={pannable ? onCanvasMove : undefined}
      onPointerUp={pannable ? onCanvasUp : undefined}
      onPointerCancel={pannable ? onCanvasUp : undefined}
    >
      {variant === "mat" && (
        <>
          <div className="mat-ruler" aria-hidden="true">
            {RULER_RANGE.filter((n) => n > 0).map((n) => (
              <span key={"rx" + n} className="mat-ruler-x" style={{ left: n * RULER_MAJOR_PX + pan.x }}>
                {n * 5}
              </span>
            ))}
            {RULER_RANGE.filter((n) => n > 0).map((n) => (
              <span key={"ry" + n} className="mat-ruler-y" style={{ top: n * RULER_MAJOR_PX + pan.y }}>
                {n * 5}
              </span>
            ))}
          </div>
          <div
            className="mat-protractor"
            aria-hidden="true"
            style={{ left: PROTRACTOR_ORIGIN.x + pan.x, top: PROTRACTOR_ORIGIN.y + pan.y }}
            dangerouslySetInnerHTML={{ __html: PROTRACTOR_SVG }}
          />
        </>
      )}
      {items.map((it) => {
        const isPolaroid = it.kind === "polaroid";
        // polaroids frame their media in an inner .ci-photo box (clip/pin +
        // optional caption) instead of a plain background-image.
        return (
          <div
            key={it.id}
            className={"ci ci-" + it.kind}
            style={
              {
                left: pannable ? pos[it.id].x + pan.x : pos[it.id].x + "%",
                top: pannable ? pos[it.id].y + pan.y : pos[it.id].y + "%",
                zIndex: pos[it.id].z,
                width: it.w,
                height: it.h,
                ...(it.rot ? { "--rot": `${it.rot}deg` } : {}),
                ...(it.video && !isPolaroid
                  ? {}
                  : it.src && !isPolaroid
                  ? { backgroundImage: `url(${it.src})` }
                  : isPolaroid
                  ? {}
                  : { backgroundImage: SHAPE_GREYS[(it.g || 0) % SHAPE_GREYS.length] }),
              } as React.CSSProperties
            }
            onPointerDown={(e) => onDown(e, it.id)}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            {it.video && !isPolaroid && (
              <video className="ci-video" src={it.video} poster={it.src} muted autoPlay loop playsInline />
            )}
            {isPolaroid &&
              (it.video ? (
                <video className="ci-photo" src={it.video} poster={it.src} muted autoPlay loop playsInline />
              ) : (
                <span
                  className="ci-photo"
                  style={{
                    backgroundImage: it.src ? `url(${it.src})` : SHAPE_GREYS[(it.g || 0) % SHAPE_GREYS.length],
                  }}
                />
              ))}
            {isPolaroid && it.caption && <span className="ci-cap">{it.caption}</span>}
          </div>
        );
      })}
    </div>
  );
}
