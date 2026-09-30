import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/commerce";
import { abs } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const staticPaths = ["/", "/shop", "/shop/handbags", "/shop/wallets", "/shop/belts", "/shop/accessories", "/custom-orders", "/our-story", "/craftsmanship", "/sustainability", "/contact", "/help/delivery", "/help/returns", "/help/faqs", "/help/size-guide", "/legal/privacy", "/legal/terms"];
  return [
    ...staticPaths.map((p) => ({ url: abs(p), changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: abs(`/product/${p.slug}`), lastModified: p.createdAt, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
