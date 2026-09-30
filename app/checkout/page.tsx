import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { CheckoutForm } from "@/components/shop/CheckoutForm";

export const metadata = pageMeta({ title: "Checkout", description: "Secure checkout with delivery across South Africa.", path: "/checkout", noindex: true });

export default function CheckoutPage() {
  return (
    <div className="page-enter">
      <PageHeader title="Checkout" />
      <div className="mx-auto max-w-[1600px] px-5 pb-28 sm:px-8 lg:px-12"><CheckoutForm /></div>
    </div>
  );
}
