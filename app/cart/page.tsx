import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { CartPageView } from "@/components/shop/CartPageView";

export const metadata = pageMeta({ title: "Your Bag", description: "Review the items in your shopping bag.", path: "/cart", noindex: true });

export default function CartPage() {
  return (
    <div className="page-enter">
      <PageHeader title="Your bag" />
      <div className="mx-auto max-w-[1600px] px-5 pb-28 sm:px-8 lg:px-12"><CartPageView /></div>
    </div>
  );
}
