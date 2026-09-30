import { NextResponse } from "next/server";

// Receives the custom enquiry (multipart). Store the upload in Supabase/S3 and email the workshop here.
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form || !form.get("email") || !form.get("name")) return NextResponse.json({ ok: false }, { status: 400 });
  return NextResponse.json({ ok: true });
}
