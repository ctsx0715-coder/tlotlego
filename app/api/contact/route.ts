import { NextResponse } from "next/server";

// Connect an email provider (Resend, SendGrid) or CRM here.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body?.email || !body?.message) return NextResponse.json({ ok: false }, { status: 400 });
  return NextResponse.json({ ok: true });
}
