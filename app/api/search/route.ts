import { NextResponse } from "next/server";
import { searchProducts } from "@/lib/commerce";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  const products = await searchProducts(q);
  return NextResponse.json({ products });
}
