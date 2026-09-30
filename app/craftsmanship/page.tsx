import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { Button } from "@/components/ui/Button";

export const metadata = pageMeta({ title: "Craftsmanship | How Our Leather Goods Are Made", description: "From selecting full-grain hides to hand-finishing every edge, see how Tlotlego Store makes premium leather goods in South Africa.", path: "/craftsmanship", image: "/images/craft-craft.svg" });

export default function CraftPage() {
  return (
    <div className="page-enter">
      <PageHeader eyebrow="Craftsmanship" title="The making of a piece" body="Four stages, each carried out by hand and each with its own standard." crumbs={[{ label: "Home", href: "/" }, { label: "Craftsmanship" }]} />
      <Craftsmanship heading={false} />
      <div className="px-5 py-24 text-center"><Button href="/shop">Shop the collection</Button></div>
    </div>
  );
}
