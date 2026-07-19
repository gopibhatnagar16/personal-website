"use client";

import { createContext, useCallback, useContext, useState } from "react";

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

  const bind = useCallback<Bind>(
    (icon) => ({
      onMouseEnter: (e) => setEyes({ show: true, x: e.clientX, y: e.clientY, icon }),
      onMouseMove: (e) => setEyes({ show: true, x: e.clientX, y: e.clientY, icon }),
      onMouseLeave: () => setEyes((s) => ({ ...s, show: false })),
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
