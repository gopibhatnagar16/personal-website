import type { MDXComponents } from "mdx/types";
import { DraggableCanvas } from "@/components/canvas/DraggableCanvas";

/* Placeholder image block — same grey gradient slots the old
   caseStudies.js `img: true` flag produced. Swap for real <img>s later. */
function ImagePlaceholder() {
  return <div className="cs-img" aria-hidden="true" />;
}

/* Components available inside the content MDX files */
export const mdxComponents: MDXComponents = {
  ImagePlaceholder,
  DraggableCanvas,
};
