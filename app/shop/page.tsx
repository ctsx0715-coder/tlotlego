import { getProducts } from "@/lib/commerce";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { ShopGrid } from "@/components/shop/ShopGrid";

export const metadata = pageMeta({
  title: "Handcrafted Leather Goods | Shop Leather Bags, Wallets & Belts",
  description: "Shop handcrafted leather handbags, wallets, belts and accessories made in South Africa. Full-grain leather, built to last.",
  path: "/shop",
});

export default async function ShopPage(props: PageProps<"/shop">) {
  const sp = await props.searchParams;
  const sort = sp.sort === "newest" || sp.sort === "price-asc" || sp.sort === "price-desc" ? sp.sort : "featured";
  const products = await getProducts();
  return (
    <div className="page-enter">
      <PageHeader eyebrow="Shop" title="Handcrafted leather goods" body="Handbags, wallets and belts cut from full-grain leather and finished by hand in South Africa." crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      <div className="mx-auto max-w-[1600px] px-5 pb-28 sm:px-8 lg:px-12">
        <ShopGrid products={products} initialSort={sort} />
      </div>
    </div>
  );
}
