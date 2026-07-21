# personal-website

Personal portfolio — Gopi Bhatnagar.

Built with Next.js (App Router), Tailwind, and MDX.

## Where things live

- `content/work/*.mdx`, `content/writing/*.mdx` — case studies. Edit these to change copy; the landing lists are generated from this folder. Frontmatter: `title`, `tagline`, `role`, `year`, `team`, optional `readTime`, optional `protected: true`.
- `lib/config.ts` — site-wide content: name, email, socials, experience row, canvas/sticker layouts.
- `styles/tokens.css` — design tokens (colors for both themes). `tailwind.config.ts` maps them to Tailwind.
- `components/` — `ui/` primitives, `layout/` chrome, `canvas/` draggable canvas, `landing/` + `case-study/` page pieces.

## Develop

```bash
npm install
cp .env.example .env.local   # fill in CASE_STUDY_PASSWORD + AUTH_SECRET
npm run dev
```

## Password-protected case studies

Entries with `protected: true` render a password gate. The check runs server-side:
the page body is never sent to the browser until `/api/unlock` verifies
`CASE_STUDY_PASSWORD` and sets a signed httpOnly cookie. Set both env vars in
Vercel project settings for production.

## Deploy on Vercel

Import the repo — Vercel auto-detects Next.js. Add `CASE_STUDY_PASSWORD` and
`AUTH_SECRET` under Project → Settings → Environment Variables.

## SEO

`NEXT_PUBLIC_SITE_URL` drives `metadataBase`, `sitemap.xml`, `robots.txt`, and
OG/Twitter tags (`lib/seo.ts`). Set it once a custom domain is attached —
without it, these fall back to the current Vercel deployment URL. Per-page
metadata for case studies comes from their MDX frontmatter (`title`,
`tagline`); OG images are generated on the fly (`app/**/opengraph-image.tsx`).
