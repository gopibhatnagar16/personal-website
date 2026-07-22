"use client";

import { useState } from "react";

interface AccItem {
  title?: string;
  body: string;
}

interface Props {
  title: string;
  items: AccItem[];
  note?: string;
  defaultOpen?: boolean;
}

/* Collapsible panel with a numbered item list and an optional trailing
   note — the "what the experiment tested" pattern. */
export function Accordion({ title, items, note, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={"cs-acc" + (open ? " open" : "")}>
      <button
        type="button"
        className="cs-acc-head"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="cs-acc-title">{title}</span>
        <span className="cs-acc-toggle" aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="cs-acc-body">
          {items.map((it, i) =>
            it.title ? (
              <div className="cs-acc-item" key={it.title}>
                <span className="cs-acc-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <span className="cs-acc-item-title">{it.title}</span>
                  <p className="cs-acc-item-body">{it.body}</p>
                </div>
              </div>
            ) : (
              <p className="cs-acc-item-body cs-acc-item-body-plain" key={i}>
                {it.body}
              </p>
            )
          )}
          {note && <p className="cs-acc-note">{note}</p>}
        </div>
      )}
    </div>
  );
}
