import type { Metadata } from "next";
import Link from "next/link";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="cs">
      <header className="cs-bar">
        <Link className="cs-back" href="/">← {CONFIG.name}</Link>
      </header>
      <div className="cs-col">
        <span className="cs-eyebrow">404</span>
        <h1 className="cs-title">Nothing here yet</h1>
        <p className="cs-tagline">That page doesn’t exist. Head back home.</p>
        <div className="cs-foot">
          <Link className="cs-back" href="/">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
