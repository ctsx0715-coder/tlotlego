import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/commerce";
import { abs, breadcrumbLd, pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { ShopGrid } from "@/components/shop/ShopGrid";
import { JsonLd } from "@/components/ui/JsonLd";
import type { CategorySlug } from "@/lib/types";

const cats: Record<string, { title: string; h1: string; description: string; body: string }> = {
  handbags: {
    title: "Leather Handbags South Africa | Handcrafted Leather Bags",
    h1: "Handbags",
    description: "Handcrafted leather handbags and bags made in South Africa. Totes, satchels, crossbodies and weekenders in full-grain leather.",
    body: "Totes, satchels and crossbodies in full-grain leather, built around the way you carry your day.",
  },
  wallets: {
    title: "Leather Wallets South Africa | Handmade Cardholders & Bifolds",
    h1: "Wallets",
    description: "Handmade leather wallets, cardholders and travel wallets from South Africa. Hand-stitched and made to last.",
    body: "Bifolds, cardholders and travel wallets, hand-stitched from a single hide.",
  },
  belts: {
    title: "Leather Belts South Africa | Full-Grain Dress & Casual Belts",
    h1: "Belts",
    description: "Full-grain leather belts made in South Africa. Dress, casual and reversible styles with solid brass buckles.",
    body: "Full-grain belts with solid brass buckles, from dress to everyday.",
  },
  accessories: {
    title: "Leather Accessories South Africa | Sleeves & Small Goods",
    h1: "Accessories",
    description: "Premium leather accessories including laptop sleeves and small goods, handcrafted in South Africa.",
    body: "Small leather goods for the desk, the commute and the trip away.",
  },
};

export function generateStaticParams() {
  return Object.keys(cats).map((category) => ({ category }));
}

export async function generateMetadata(props: PageProps<"/shop/[category]">) {
  const { category } = await props.params;
  const c = cats[category];
  if (!c) return {};
  return pageMeta({ title: c.title, description: c.description, path: `/shop/${category}` });
}

export default async function CategoryPage(props: PageProps<"/shop/[category]">) {
  const { category } = await props.params;
  const c = cats[category];
  if (!c) notFound();
  const products = await getProductsByCategory(category as CategorySlug);
  return (
    <div className="page-enter">
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Shop", path: "/shop" }, { name: c.h1, path: `/shop/${category}` }])} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/product/${p.slug}`), name: p.name })) }} />
      <PageHeader eyebrow="Collection" title={c.h1} body={c.body} crumbs={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: c.h1 }]} />
      <div className="mx-auto max-w-[1600px] px-5 pb-28 sm:px-8 lg:px-12">
        <ShopGrid products={products} showCategoryFilter={false} />
      </div>
    </div>
  );
}
