"use client";

import { CONFIG } from "@/lib/config";
import { EyesProvider } from "@/components/shared/EyesCursor";
import { DraggableCanvas } from "@/components/canvas/DraggableCanvas";
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
              <span className="section-label">Tidbits</span>
              <DraggableCanvas items={CONFIG.tidbits} height={400} variant="mat" />
            </section>

            {/* PERSONAL — pegboard */}
            <section className="section" id="personal">
              <span className="section-label">Personal</span>
              <p className="section-intro">{CONFIG.personalIntro}</p>
              <DraggableCanvas items={CONFIG.pegboard} height={520} variant="board" pannable={false} />
            </section>
          </div>
        </div>

        <SiteFooter />
      </div>
    </EyesProvider>
  );
}
