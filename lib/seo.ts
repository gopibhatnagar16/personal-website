// Site-wide SEO config. Set NEXT_PUBLIC_SITE_URL in Vercel project settings
// once a custom domain is attached; falls back to the current deployment.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://personal-website-three-ruddy-37.vercel.app"
).replace(/\/$/, "");

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
