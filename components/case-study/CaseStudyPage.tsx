import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getContentBody, getContentMeta, listContent, type ContentKind } from "@/lib/content";
import { isUnlocked } from "@/lib/auth";
import { mdxComponents } from "@/lib/mdx-components";
import { PasswordGate } from "./PasswordGate";
import { CONFIG } from "@/lib/config";
import { absoluteUrl } from "@/lib/seo";
import { EyesProvider } from "@/components/shared/EyesCursor";
import { SiteFooter } from "@/components/layout/SiteFooter";

/* Server component shared by /work/[slug] and /writing/[slug].
   The auth check happens BEFORE the body is read or compiled — a locked
   request never has the case-study content in its response at all. */
export async function CaseStudyPage({ kind, slug }: { kind: ContentKind; slug: string }) {
  const meta = await getContentMeta(kind, slug);
  if (!meta) notFound();

  const siblings = await listContent(kind);
  const index = siblings.findIndex((s) => s.slug === slug);
  const prev = index > 0 ? siblings[index - 1] : null;
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null;

  const kindLabel = kind === "work" ? "Work" : "Writing";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: meta.title,
    description: meta.tagline,
    url: absoluteUrl(`/${kind}/${slug}`),
    datePublished: meta.year,
    author: { "@type": "Person", name: CONFIG.name },
    ...(meta.cover ? { image: absoluteUrl(meta.cover) } : {}),
  };

  if (meta.protected && !(await isUnlocked())) {
    return (
      <EyesProvider>
        <div className="cs">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <div className="cs-topnav">
            <header className="cs-bar">
              <Link className="cs-back" href="/">Home</Link>
              {next ? (
                <Link className="cs-back cs-back-next" href={`/${kind}/${next.slug}`}>Next project →</Link>
              ) : (
                <span className="cs-kind">{kindLabel}</span>
              )}
            </header>
          </div>

          <div className="cs-shell">
            {/* Real chrome + metadata behind the modal, so it reads as the actual
                case-study page rather than a blank placeholder. The compiled MDX
                body is never sent while locked, so it's stubbed with skeleton
                blocks — inert and unselectable since there's nothing to read. */}
            <div className="cs-col cs-locked-preview" aria-hidden="true" inert>
              {meta.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="cs-hero" src={meta.cover} alt="" />
              ) : (
                <div className="cs-hero cs-hero-placeholder" />
              )}
              <h1 className="cs-title">{meta.title}</h1>
              <p className="cs-tagline">{meta.tagline}</p>
              <div className="cs-meta">
                <div className="cs-m"><span className="cs-mk">Role</span><span className="cs-mv">{meta.role}</span></div>
                <div className="cs-m"><span className="cs-mk">Year</span><span className="cs-mv">{meta.year}</span></div>
                <div className="cs-m"><span className="cs-mk">Team</span><span className="cs-mv">{meta.team}</span></div>
              </div>
              <div className="cs-skel">
                <span className="cs-skel-line" style={{ width: "94%" }} />
                <span className="cs-skel-line" style={{ width: "88%" }} />
                <span className="cs-skel-line" style={{ width: "60%" }} />
                <span className="cs-skel-block" />
                <span className="cs-skel-line" style={{ width: "91%" }} />
                <span className="cs-skel-line" style={{ width: "82%" }} />
                <span className="cs-skel-line" style={{ width: "70%" }} />
              </div>
            </div>

            <div className="cs-lock-overlay">
              <div className="cs-lock-card">
                <div className="cs-lock-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="5" y="11" width="14" height="10" rx="2.5" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="12" cy="16" r="1.6" fill="currentColor" />
                  </svg>
                </div>
                <span className="cs-eyebrow cs-lock-eyebrow">Protected</span>
                <h1 className="cs-title cs-lock-title">{meta.title}</h1>
                <p className="cs-tagline cs-lock-tagline">
                  This case study is password protected. Enter the password to continue.
                </p>
                <PasswordGate />
              </div>
            </div>
          </div>
        </div>
        <SiteFooter />
      </EyesProvider>
    );
  }

  const body = await getContentBody(kind, slug);
  if (body === null) notFound();

  // blockJS:false re-enables JSX expression props ({...}) which v6 strips
  // by default — safe here because the source is our own committed content,
  // never user input; blockDangerousJS stays on as a guard.
  const { content } = await compileMDX({
    source: body,
    components: mdxComponents,
    options: { blockJS: false },
  });

  return (
    <EyesProvider>
      <div className="cs">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="cs-topnav">
          <header className="cs-bar">
            <Link className="cs-back" href="/">Home</Link>
            {next ? (
              <Link className="cs-back cs-back-next" href={`/${kind}/${next.slug}`}>Next project →</Link>
            ) : (
              <span className="cs-kind">{kindLabel}</span>
            )}
          </header>
        </div>

        <div className="cs-shell">
        <div className="cs-col">
          {meta.coverVideo ? (
            <video
              className="cs-hero"
              src={meta.coverVideo}
              poster={meta.cover}
              aria-label={meta.title}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          ) : meta.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="cs-hero" src={meta.cover} alt={meta.title} />
          ) : (
            <div className="cs-hero cs-hero-placeholder" aria-hidden="true" />
          )}

          <h1 className="cs-title">{meta.title}</h1>
          <p className="cs-tagline">{meta.tagline}</p>

          <div className="cs-meta">
            <div className="cs-m"><span className="cs-mk">Role</span><span className="cs-mv">{meta.role}</span></div>
            <div className="cs-m"><span className="cs-mk">Year</span><span className="cs-mv">{meta.year}</span></div>
            <div className="cs-m"><span className="cs-mk">Team</span><span className="cs-mv">{meta.team}</span></div>
          </div>

          <div className="cs-body">{content}</div>

          {(prev || next) && (
            <div className="cs-foot">
              <nav className="cs-nav" aria-label="Case study navigation">
                {prev && (
                  <Link className="cs-nav-link cs-nav-prev" href={`/${kind}/${prev.slug}`}>
                    <span className="cs-nav-dir">← Previous</span>
                    <span className="cs-nav-title">{prev.title}</span>
                  </Link>
                )}
                {next && (
                  <Link className="cs-nav-link cs-nav-next" href={`/${kind}/${next.slug}`}>
                    <span className="cs-nav-dir">Next →</span>
                    <span className="cs-nav-title">{next.title}</span>
                  </Link>
                )}
              </nav>
            </div>
          )}
        </div>
        </div>
      </div>
      <SiteFooter />
    </EyesProvider>
  );
}
