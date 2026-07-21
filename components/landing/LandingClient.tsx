"use client";

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
                <CanvasControls variant="mat" {...tidbitsControls} />
              </div>
              <DraggableCanvas
                items={CONFIG.tidbits}
                height={400}
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
                <CanvasControls variant="board" pan={personalControls.pan} setPan={personalControls.setPan} />
              </div>
              <p className="section-intro">{CONFIG.personalIntro}</p>
              <ul className="section-hobbies">
                {CONFIG.personalHobbies.map((hobby) => (
                  <li key={hobby}>{hobby}</li>
                ))}
              </ul>
              <DraggableCanvas
                items={CONFIG.pegboard}
                height={520}
                variant="board"
                pannable={false}
                pan={personalControls.pan}
                setPan={personalControls.setPan}
              />
            </section>
          </div>
        </div>

        <SiteFooter />
      </div>
    </EyesProvider>
  );
}
