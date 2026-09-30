import { getProducts } from "@/lib/commerce";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { WishlistView } from "@/components/shop/WishlistView";

export const metadata = pageMeta({ title: "Wishlist", description: "Pieces you have saved.", path: "/wishlist", noindex: true });

export default async function WishlistPage() {
  const products = await getProducts();
  return (
    <div className="page-enter">
      <PageHeader title="Wishlist" />
      <div className="mx-auto max-w-[1600px] px-5 pb-28 sm:px-8 lg:px-12"><WishlistView products={products} /></div>
    </div>
  );
}
