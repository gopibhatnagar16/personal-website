"use client";

import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { SHAPE_GREYS, type CanvasItem } from "@/lib/config";

interface Props {
  items: CanvasItem[];
  height: number;
  variant?: "mat" | "board";
  // false = a fixed board: items are positioned in % and clamped to stay
  // on it, no background panning. true (default) = infinite pan, world-space px.
  pannable?: boolean;
}

const MAT_COLORS = [
  { id: "green", label: "Green", light: "#4B6B57", dark: "#33493B" },
  { id: "blue", label: "Blue", light: "#35566B", dark: "#24384A" },
  { id: "rose", label: "Rose", light: "#6B3550", dark: "#452336" },
  { id: "clay", label: "Clay", light: "#6B4F35", dark: "#453121" },
] as const;

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

/* draggable canvas — infinite pan (mat) or a fixed, bounded board */
export function DraggableCanvas({ items, height, variant, pannable = true }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; ox: number; oy: number } | null>(null);
  const panDrag = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const zTop = useRef(items.length);
  const [pos, setPos] = useState<Record<string, { x: number; y: number; z: number }>>(() => {
    const o: Record<string, { x: number; y: number; z: number }> = {};
    items.forEach((it, i) => (o[it.id] = { x: it.x, y: it.y, z: i + 1 }));
    return o;
  });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [matColor, setMatColor] = useState<(typeof MAT_COLORS)[number]>(MAT_COLORS[0]);

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

  const isPanned = pan.x !== 0 || pan.y !== 0;

  return (
    <div
      className={"canvas" + (variant ? " " + variant : "")}
      style={
        {
          height: height + 20,
          "--pan-x": pan.x + "px",
          "--pan-y": pan.y + "px",
          ...(variant === "mat" ? { "--mat-color": matColor.light, "--mat-color-dark": matColor.dark } : {}),
        } as React.CSSProperties
      }
      ref={canvasRef}
      onPointerDown={pannable ? onCanvasDown : undefined}
      onPointerMove={pannable ? onCanvasMove : undefined}
      onPointerUp={pannable ? onCanvasUp : undefined}
      onPointerCancel={pannable ? onCanvasUp : undefined}
    >
      <div className="canvas-controls" onPointerDown={(e) => e.stopPropagation()}>
        {variant === "mat" && (
          <div className="canvas-colors" role="group" aria-label="Cutting mat color">
            {MAT_COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                className={"canvas-swatch" + (c.id === matColor.id ? " active" : "")}
                style={{ background: c.light }}
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
          onClick={() => setPan({ x: 0, y: 0 })}
          aria-label="Reset canvas position"
          tabIndex={isPanned ? 0 : -1}
        >
          <RotateCcw size={13} strokeWidth={1.9} />
        </button>
      </div>
      {items.map((it) => {
        const isPolaroid = it.kind === "polaroid";
        const isMagnet = it.kind === "magnet";
        // polaroids and magnets frame their media in an inner .ci-photo box
        // (clip/pin + optional caption) instead of a plain background-image.
        const isFramed = isPolaroid || isMagnet;
        return (
          <div
            key={it.id}
            className={"ci ci-" + it.kind}
            style={{
              left: pannable ? pos[it.id].x + pan.x : pos[it.id].x + "%",
              top: pannable ? pos[it.id].y + pan.y : pos[it.id].y + "%",
              zIndex: pos[it.id].z,
              width: it.w,
              height: it.h,
              transform: it.rot ? `rotate(${it.rot}deg)` : undefined,
              ...(it.video && !isFramed
                ? {}
                : it.src && !isFramed
                ? { backgroundImage: `url(${it.src})` }
                : it.emoji
                ? { background: it.bg }
                : isFramed
                ? {}
                : { backgroundImage: SHAPE_GREYS[(it.g || 0) % SHAPE_GREYS.length] }),
            }}
            onPointerDown={(e) => onDown(e, it.id)}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            {it.emoji && <span className="ci-emoji">{it.emoji}</span>}
            {it.video && !isFramed && (
              <video className="ci-video" src={it.video} poster={it.src} muted autoPlay loop playsInline />
            )}
            {isFramed &&
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
