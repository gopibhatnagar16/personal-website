import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type ContentKind = "work" | "writing";

export interface ContentMeta {
  slug: string;
  kind: ContentKind;
  title: string;
  tagline: string;
  role: string;
  year: string;
  team: string;
  readTime?: string;
  protected?: boolean;
  thumb?: string;
  preview?: string;
  cover?: string;
}

const SLUG_RE = /^[a-z0-9-]+$/;

function toMeta(kind: ContentKind, slug: string, data: Record<string, unknown>): ContentMeta {
  return {
    slug,
    kind,
    title: String(data.title ?? slug),
    tagline: String(data.tagline ?? ""),
    role: String(data.role ?? ""),
    year: String(data.year ?? ""),
    team: String(data.team ?? ""),
    readTime: data.readTime ? String(data.readTime) : undefined,
    protected: data.protected === true,
    thumb: data.thumb ? String(data.thumb) : undefined,
    preview: data.preview ? String(data.preview) : undefined,
    cover: data.cover ? String(data.cover) : undefined,
  };
}

/* Frontmatter only — safe to call before the auth check (never exposes the body). */
export async function getContentMeta(kind: ContentKind, slug: string): Promise<ContentMeta | null> {
  if (!SLUG_RE.test(slug)) return null;
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, kind, `${slug}.mdx`), "utf8");
    return toMeta(kind, slug, matter(raw).data);
  } catch {
    return null;
  }
}

/* Full body — only call this AFTER the auth check has passed for protected entries. */
export async function getContentBody(kind: ContentKind, slug: string): Promise<string | null> {
  if (!SLUG_RE.test(slug)) return null;
  try {
    const raw = await fs.readFile(path.join(CONTENT_DIR, kind, `${slug}.mdx`), "utf8");
    return matter(raw).content;
  } catch {
    return null;
  }
}

/* Index for the landing lists — derived from the content folder so it can't drift. */
export async function listContent(kind: ContentKind): Promise<ContentMeta[]> {
  let files: string[];
  try {
    files = await fs.readdir(path.join(CONTENT_DIR, kind));
  } catch {
    return [];
  }
  const items = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (f) => {
        const raw = await fs.readFile(path.join(CONTENT_DIR, kind, f), "utf8");
        return toMeta(kind, f.replace(/\.mdx$/, ""), matter(raw).data);
      })
  );
  return items.sort((a, b) => b.year.localeCompare(a.year));
}
