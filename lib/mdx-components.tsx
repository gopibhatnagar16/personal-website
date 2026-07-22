import type { MDXComponents } from "mdx/types";
import { DraggableCanvas } from "@/components/canvas/DraggableCanvas";
import { CaseImage } from "@/components/case-study/CaseImage";
import { CaseVideo } from "@/components/case-study/CaseVideo";
import { WhyHowWhat } from "@/components/case-study/WhyHowWhat";
import { ResearchFlow } from "@/components/case-study/ResearchFlow";
import { MediaSwitcher } from "@/components/case-study/MediaSwitcher";
import { Accordion } from "@/components/case-study/Accordion";
import { ResultsViz } from "@/components/case-study/ResultsViz";
import { OutcomeCards } from "@/components/case-study/OutcomeCards";
import { InsightCards } from "@/components/case-study/InsightCards";
import { StageCards } from "@/components/case-study/StageCards";
import { ExperimentMap } from "@/components/case-study/ExperimentMap";
import { ExperimentHeader } from "@/components/case-study/ExperimentHeader";

/* Components available inside the content MDX files.
   ImagePlaceholder is CaseImage without a src — the same grey slot the
   old caseStudies.js `img: true` flag produced; pass src to get a real
   image with the lightbox. */
export const mdxComponents: MDXComponents = {
  ImagePlaceholder: CaseImage,
  CaseImage,
  CaseVideo,
  WhyHowWhat,
  ResearchFlow,
  MediaSwitcher,
  Accordion,
  ResultsViz,
  OutcomeCards,
  InsightCards,
  StageCards,
  ExperimentMap,
  ExperimentHeader,
  DraggableCanvas,
};
