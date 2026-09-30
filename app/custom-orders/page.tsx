import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { CustomOrderForm } from "@/components/shop/CustomOrderForm";

export const metadata = pageMeta({ title: "Custom Leather Goods South Africa | Made for You", description: "Commission a custom leather bag, wallet or belt handcrafted in South Africa. Choose the leather, colour, size and details.", path: "/custom-orders", image: "/images/custom.svg" });

const steps = [
  ["Share your brief", "Tell us what you would like made, with any reference images."],
  ["Receive a quote", "We confirm materials, timeline and price within two business days."],
  ["We make it", "Your piece is cut, stitched and finished by hand, typically in 3 to 5 weeks."],
];

export default function CustomPage() {
  return (
    <div className="page-enter">
      <PageHeader eyebrow="Custom service" title="Made for you" body="Looking for something specific? Our custom leather service allows you to create a piece tailored to your preferences." crumbs={[{ label: "Home", href: "/" }, { label: "Custom orders" }]} />
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 pb-28 sm:px-8 lg:grid-cols-[1fr_1.3fr] lg:gap-24 lg:px-12">
        <ol className="space-y-10">
          {steps.map(([t, b], i) => (
            <li key={t} className="flex gap-6 border-t border-charcoal/20 pt-6">
              <span className="font-serif text-4xl text-cognac">0{i + 1}</span>
              <div><h2 className="text-2xl">{t}</h2><p className="mt-2 text-sm leading-relaxed text-muted">{b}</p></div>
            </li>
          ))}
        </ol>
        <div><h2 className="mb-8 text-3xl">Request a custom order</h2><CustomOrderForm /></div>
      </div>
    </div>
  );
}
