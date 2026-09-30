import type { Metadata } from "next";
import { site } from "@/data/site";
import type { Product } from "./types";

export const abs = (path = "/") => `${site.url}${path.startsWith("/") ? path : "/" + path}`;

export function pageMeta({ title, description, path = "/", image = "/images/hero.svg", noindex = false }: { title: string; description: string; path?: string; image?: string; noindex?: boolean }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: abs(path) },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: abs(path),
      siteName: site.name,
      locale: "en_ZA",
      type: "website",
      images: [{ url: abs(image), width: 1200, height: 1500, alt: title }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description },
  };
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: abs("/images/hero.svg"),
  description: site.description,
  email: site.contact.email,
  telephone: site.contact.phone,
  address: { "@type": "PostalAddress", addressCountry: "ZA", addressLocality: "Johannesburg", addressRegion: "Gauteng" },
  sameAs: Object.values(site.social),
};

export const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  potentialAction: { "@type": "SearchAction", target: `${site.url}/search?q={search_term_string}`, "query-input": "required name=search_term_string" },
};

export function productLd(p: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: p.images.map(abs),
    sku: p.id,
    category: p.category,
    material: p.material,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      url: abs(`/product/${p.slug}`),
      priceCurrency: "ZAR",
      price: p.price,
      availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}
