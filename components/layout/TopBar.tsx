"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { CONFIG } from "@/lib/config";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

function fmtTime() {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: CONFIG.timeZone,
  }).format(new Date());
}

export function TopBar() {
  // start empty so the server and first client render agree; the real
  // time appears after mount (min-width on .clock keeps layout stable)
  const [now, setNow] = useState("");

  useEffect(() => {
    setNow(fmtTime());
    const id = setInterval(() => setNow(fmtTime()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="bar">
      <span className="name">{CONFIG.name}</span>
      <div className="bar-right">
        <span className="clock">
          <Clock size={13} strokeWidth={1.75} />
          {now} {CONFIG.tzLabel}
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
