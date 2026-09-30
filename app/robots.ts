import type { MetadataRoute } from "next";
import { abs } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/cart", "/checkout", "/account", "/wishlist", "/search", "/api/"] }], sitemap: abs("/sitemap.xml") };
}
