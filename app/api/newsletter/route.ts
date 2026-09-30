import { NextResponse } from "next/server";

// Connect Mailchimp, Klaviyo, Resend, etc. here.
export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({ email: "" }));
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
