import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { AccountForm } from "@/components/shop/AccountForm";

export const metadata = pageMeta({ title: "Account", description: "Sign in or create your Tlotlego Store account.", path: "/account", noindex: true });

export default function AccountPage() {
  return (
    <div className="page-enter">
      <PageHeader title="Account" />
      <div className="mx-auto max-w-[1600px] px-5 pb-28 sm:px-8 lg:px-12"><AccountForm /></div>
    </div>
  );
}
