import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/* Site-wide unlock for protected case studies.
   CASE_STUDY_PASSWORD — the password visitors enter.
   AUTH_SECRET        — random string used to sign the unlock cookie.
   Both live in env vars (Vercel project settings / .env.local), never in the repo. */

const COOKIE_NAME = "cs_unlocked";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function expectedToken(): string | null {
  const secret = process.env.AUTH_SECRET;
  if (!secret) return null;
  return createHmac("sha256", secret).update("case-studies-unlocked-v1").digest("hex");
}

export function verifyPassword(input: string): boolean {
  const pw = process.env.CASE_STUDY_PASSWORD;
  if (!pw || typeof input !== "string") return false;
  const a = Buffer.from(input);
  const b = Buffer.from(pw);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isUnlocked(): Promise<boolean> {
  const token = expectedToken();
  if (!token) return false;
  const value = (await cookies()).get(COOKIE_NAME)?.value;
  if (!value || value.length !== token.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(token));
}

export async function setUnlockedCookie(): Promise<boolean> {
  const token = expectedToken();
  if (!token) return false;
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
  return true;
}
