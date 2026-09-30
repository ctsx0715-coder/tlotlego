import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { faqs } from "@/data/content";
import { site } from "@/data/site";
import { formatZAR } from "@/lib/format";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";
import { JsonLd } from "@/components/ui/JsonLd";
import { Accordion } from "@/components/product/Accordion";

const topics = {
  delivery: { title: "Delivery", description: "Delivery across South Africa: timelines, costs and complimentary delivery over R1,500.", body: "Delivery times and costs for orders across South Africa." },
  returns: { title: "Returns", description: "Our 30-day returns policy for unused Tlotlego Store items.", body: "Our returns and exchanges policy." },
  faqs: { title: "FAQs", description: "Answers about delivery, returns, custom orders, leather care and payment at Tlotlego Store.", body: "Answers to the questions we hear most." },
  "size-guide": { title: "Size Guide", description: "Belt and bag size guide for Tlotlego Store leather goods.", body: "How to choose the right size." },
} as const;
type Topic = keyof typeof topics;

export function generateStaticParams() { return Object.keys(topics).map((topic) => ({ topic })); }

export async function generateMetadata(props: PageProps<"/help/[topic]">) {
  const { topic } = await props.params;
  const t = topics[topic as Topic];
  return t ? pageMeta({ title: t.title, description: t.description, path: `/help/${topic}` }) : {};
}

export default async function HelpPage(props: PageProps<"/help/[topic]">) {
  const { topic } = await props.params;
  const t = topics[topic as Topic];
  if (!t) notFound();
  return (
    <div className="page-enter">
      <PageHeader eyebrow="Help" title={t.title} body={t.body} crumbs={[{ label: "Home", href: "/" }, { label: "Help" }, { label: t.title }]} />
      <div className="px-5 pb-28">
        <Prose>
          {topic === "delivery" && (<>
            <p>We deliver to every province in South Africa. Orders are packed by hand and ship within 1 to 2 business days.</p>
            <ul><li>Complimentary delivery on orders over {formatZAR(site.freeDeliveryThreshold)}</li><li>Flat fee of {formatZAR(site.deliveryFee)} below that</li><li>Metro areas: 2 to 3 business days</li><li>Rest of South Africa: 3 to 6 business days</li></ul>
            <p>You will receive tracking details by email once your order has been dispatched. Custom orders are delivered once complete and follow the timeline in your quote.</p>
          </>)}
          {topic === "returns" && (<>
            <p>If a piece is not right, you can return it within 30 days of delivery for a refund or exchange, provided it is unused and in its original packaging.</p>
            <ul><li>Contact us at {site.contact.email} with your order number</li><li>We will arrange a courier collection or share a drop-off option</li><li>Refunds are processed within 5 business days of receiving the item</li></ul>
            <p>Custom orders are made to your specification and cannot be returned unless faulty. Under the Consumer Protection Act, faulty goods are always covered.</p>
          </>)}
          {topic === "faqs" && (<Accordion items={faqs.map((f) => ({ title: f.q, content: <p>{f.a}</p> }))} />)}
          {topic === "size-guide" && (<>
            <h2>Belts</h2>
            <p>Belt sizes correspond to waist size in inches. For the best fit, order one size up from your trouser waist. For example, a 34 inch trouser takes a 36 inch belt.</p>
            <ul><li>Size 30: fits waist 28 to 30 in</li><li>Size 34: fits waist 32 to 34 in</li><li>Size 38: fits waist 36 to 38 in</li><li>Size 42: fits waist 40 to 42 in</li></ul>
            <h2>Bags</h2>
            <p>Dimensions are listed on each product page as width x height x depth in centimetres. If you are unsure, hold a familiar item up against the measurements, or send us a message.</p>
          </>)}
        </Prose>
      </div>
      {topic === "faqs" && <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />}
    </div>
  );
}
