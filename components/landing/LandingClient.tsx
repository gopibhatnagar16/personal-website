"use client";

import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/config";
import { EyesProvider } from "@/components/shared/EyesCursor";
import { DraggableCanvas, CanvasControls, useCanvasControls } from "@/components/canvas/DraggableCanvas";
import { TopBar } from "@/components/layout/TopBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "./Hero";
import { ExperienceRow } from "./ExperienceRow";
import { WorkList, type WorkRow } from "./WorkList";
import { WritingList, type WritingRow } from "./WritingList";

interface Props {
  work: WorkRow[];
  writing: WritingRow[];
}

export function LandingClient({ work, writing }: Props) {
  const tidbitsControls = useCanvasControls();
  const personalControls = useCanvasControls();

  // the pegboard's polaroids/stickers are pinned at fixed pixel sizes on a
  // percentage-positioned board — on narrow phones that same layout reads as
  // cramped/overlapping, so the board itself grows taller to spread them out.
  const [pegboardHeight, setPegboardHeight] = useState(820);
  useEffect(() => {
    const mq = window.matchMedia("(max-width:640px)");
    const apply = () => setPegboardHeight(mq.matches ? 1300 : 820);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <EyesProvider>
      <div className="gp">
        <div className="content">
          <div className="col">
            <TopBar />
            <Hero />
            <ExperienceRow />
            <WorkList items={work} />
            <WritingList items={writing} />

            {/* TIDBITS — draggable canvas */}
            <section className="section" id="tidbits">
              <div className="section-head">
                <span className="section-label">Tidbits</span>
                <CanvasControls
                  variant="mat"
                  matColor={tidbitsControls.matColor}
                  setMatColor={tidbitsControls.setMatColor}
                  pan={tidbitsControls.pan}
                  resetPan={tidbitsControls.resetPan}
                />
              </div>
              <DraggableCanvas
                items={CONFIG.tidbits}
                height={412}
                variant="mat"
                pan={tidbitsControls.pan}
                setPan={tidbitsControls.setPan}
                matColor={tidbitsControls.matColor}
              />
            </section>

            {/* PERSONAL — pegboard */}
            <section className="section" id="personal">
              <div className="section-head">
                <span className="section-label">Personal</span>
                <CanvasControls variant="board" pan={personalControls.pan} resetPan={personalControls.resetPan} />
              </div>
              <h2 className="section-heading">{CONFIG.personalHeader}</h2>
              <p className="section-intro">{CONFIG.personalIntro}</p>
              <ul className="section-hobbies">
                {CONFIG.personalHobbies.map((hobby) => (
                  <li key={hobby}>{hobby}</li>
                ))}
              </ul>
              <DraggableCanvas
                items={CONFIG.pegboard}
                height={pegboardHeight}
                variant="board"
                pannable={false}
                pan={personalControls.pan}
                setPan={personalControls.setPan}
              />
              <div className="canvas-hint">
                <svg className="canvas-hint-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 2v20M2 12h20M5 9l-3 3 3 3M19 9l3 3-3 3M9 5l3-3 3 3M9 19l3 3 3-3"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Drag to move</span>
              </div>
            </section>
          </div>
        </div>

        <SiteFooter />
      </div>
    </EyesProvider>
  );
}
