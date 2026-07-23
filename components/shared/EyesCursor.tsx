"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

interface EyesState {
  show: boolean;
  x: number;
  y: number;
  icon: string;
}

type Bind = (icon: string) => {
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
};

const EyesContext = createContext<Bind>(() => ({
  onMouseEnter: () => {},
  onMouseMove: () => {},
  onMouseLeave: () => {},
}));

/* Emoji cursor that follows the pointer over hover zones (avatar, rows,
   footer …). Zones hide the native cursor via CSS and call useEyes(icon)
   to spread the tracking handlers. */
export function EyesProvider({ children }: { children: React.ReactNode }) {
  const [eyes, setEyes] = useState<EyesState>({ show: false, x: 0, y: 0, icon: "👀" });
  // touch browsers fire synthetic mouseenter/mousemove on tap but never a
  // matching mouseleave, which would otherwise leave the emoji stuck on
  // screen — so hover tracking only engages on pointers that support it.
  const hoverCapable = useRef(true);

  useEffect(() => {
    hoverCapable.current = window.matchMedia("(hover: hover)").matches;
  }, []);

  const bind = useCallback<Bind>(
    (icon) => ({
      onMouseEnter: (e) => {
        if (hoverCapable.current) setEyes({ show: true, x: e.clientX, y: e.clientY, icon });
      },
      onMouseMove: (e) => {
        if (hoverCapable.current) setEyes({ show: true, x: e.clientX, y: e.clientY, icon });
      },
      onMouseLeave: () => {
        if (hoverCapable.current) setEyes((s) => ({ ...s, show: false }));
      },
    }),
    []
  );

  return (
    <EyesContext.Provider value={bind}>
      {children}
      {eyes.show && (
        <span className="eyes-cursor" style={{ left: eyes.x, top: eyes.y }} aria-hidden="true">
          {eyes.icon}
        </span>
      )}
    </EyesContext.Provider>
  );
}

export const useEyes = () => useContext(EyesContext);
