"use client";

import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { SHAPE_GREYS, type CanvasItem } from "@/lib/config";

interface Props {
  items: CanvasItem[];
  height: number;
  variant?: "mat" | "open";
}

const MAT_COLORS = [
  { id: "green", label: "Green", light: "#4B6B57", dark: "#33493B" },
  { id: "blue", label: "Blue", light: "#35566B", dark: "#24384A" },
  { id: "rose", label: "Rose", light: "#6B3550", dark: "#452336" },
  { id: "clay", label: "Clay", light: "#6B4F35", dark: "#453121" },
] as const;

/* draggable canvas (infinite pan) */
export function DraggableCanvas({ items, height, variant }: Props) {
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

  // card drag — world-space coordinates, independent of the current pan
  const onDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    const r = canvasRef.current!.getBoundingClientRect();
    const screenX = pos[id].x + pan.x;
    const screenY = pos[id].y + pan.y;
    drag.current = { id, ox: e.clientX - r.left - screenX, oy: e.clientY - r.top - screenY };
    zTop.current += 1;
    setPos((s) => ({ ...s, [id]: { ...s[id], z: zTop.current } }));
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const r = canvasRef.current!.getBoundingClientRect();
    const x = e.clientX - r.left - drag.current.ox - pan.x;
    const y = e.clientY - r.top - drag.current.oy - pan.y;
    setPos((s) => ({ ...s, [drag.current!.id]: { ...s[drag.current!.id], x, y } }));
  };
  const onUp = () => (drag.current = null);

  // background drag — pans the whole mat, unbounded in every direction
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
      onPointerDown={onCanvasDown}
      onPointerMove={onCanvasMove}
      onPointerUp={onCanvasUp}
      onPointerCancel={onCanvasUp}
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
      {items.map((it) => (
        <div
          key={it.id}
          className={"ci ci-" + it.kind}
          style={{
            left: pos[it.id].x + pan.x,
            top: pos[it.id].y + pan.y,
            zIndex: pos[it.id].z,
            width: it.w,
            height: it.h,
            ...(it.emoji
              ? { background: it.bg, transform: `rotate(${it.rot || 0}deg)` }
              : { backgroundImage: SHAPE_GREYS[(it.g || 0) % SHAPE_GREYS.length] }),
          }}
          onPointerDown={(e) => onDown(e, it.id)}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          {it.emoji && <span className="ci-emoji">{it.emoji}</span>}
        </div>
      ))}
    </div>
  );
}
