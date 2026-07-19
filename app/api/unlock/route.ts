import { NextResponse } from "next/server";
import { setUnlockedCookie, verifyPassword } from "@/lib/auth";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const password = typeof body?.password === "string" ? body.password : "";

  if (!verifyPassword(password)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  if (!(await setUnlockedCookie())) {
    return NextResponse.json({ ok: false, error: "server not configured" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
