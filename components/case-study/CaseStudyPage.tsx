import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getContentBody, getContentMeta, type ContentKind } from "@/lib/content";
import { isUnlocked } from "@/lib/auth";
import { mdxComponents } from "@/lib/mdx-components";
import { PasswordGate } from "./PasswordGate";
import { CONFIG } from "@/lib/config";

/* Server component shared by /work/[slug] and /writing/[slug].
   The auth check happens BEFORE the body is read or compiled — a locked
   request never has the case-study content in its response at all. */
export async function CaseStudyPage({ kind, slug }: { kind: ContentKind; slug: string }) {
  const meta = await getContentMeta(kind, slug);
  if (!meta) notFound();

  const kindLabel = kind === "work" ? "Work" : "Writing";

  if (meta.protected && !(await isUnlocked())) {
    return (
      <div className="cs">
        <header className="cs-bar">
          <Link className="cs-back" href="/">← {CONFIG.name}</Link>
          <span className="cs-kind">{kindLabel}</span>
        </header>
        <div className="cs-col cs-lock-col">
          <span className="cs-eyebrow">Protected</span>
          <h1 className="cs-title">{meta.title}</h1>
          <p className="cs-tagline">
            This case study is password protected. Enter the password to continue.
          </p>
          <PasswordGate />
        </div>
      </div>
    );
  }

  const body = await getContentBody(kind, slug);
  if (body === null) notFound();
  const { content } = await compileMDX({ source: body, components: mdxComponents });

  return (
    <div className="cs">
      <header className="cs-bar">
        <Link className="cs-back" href="/">← {CONFIG.name}</Link>
        <span className="cs-kind">{kindLabel}</span>
      </header>

      <div className="cs-col">
        <span className="cs-eyebrow">{meta.role} · {meta.year}</span>
        <h1 className="cs-title">{meta.title}</h1>
        <p className="cs-tagline">{meta.tagline}</p>

        <div className="cs-meta">
          <div className="cs-m"><span className="cs-mk">Role</span><span className="cs-mv">{meta.role}</span></div>
          <div className="cs-m"><span className="cs-mk">Year</span><span className="cs-mv">{meta.year}</span></div>
          <div className="cs-m"><span className="cs-mk">Team</span><span className="cs-mv">{meta.team}</span></div>
        </div>

        <div className="cs-hero" aria-hidden="true" />

        <div className="cs-body">{content}</div>

        <div className="cs-foot">
          <Link className="cs-back" href="/">← Back to home</Link>
        </div>
      </div>
    </div>
  );
}
