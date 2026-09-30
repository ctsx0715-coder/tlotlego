import { notFound } from "next/navigation";
import { pageMeta } from "@/lib/seo";
import { site } from "@/data/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Prose } from "@/components/ui/Prose";

const docs = {
  privacy: { title: "Privacy Policy", description: "How Tlotlego Store collects and protects your personal information in line with POPIA." },
  terms: { title: "Terms & Conditions", description: "Terms and conditions for purchasing from Tlotlego Store." },
} as const;
type Doc = keyof typeof docs;

export function generateStaticParams() { return Object.keys(docs).map((doc) => ({ doc })); }

export async function generateMetadata(props: PageProps<"/legal/[doc]">) {
  const { doc } = await props.params;
  const d = docs[doc as Doc];
  return d ? pageMeta({ title: d.title, description: d.description, path: `/legal/${doc}` }) : {};
}

export default async function LegalPage(props: PageProps<"/legal/[doc]">) {
  const { doc } = await props.params;
  const d = docs[doc as Doc];
  if (!d) notFound();
  return (
    <div className="page-enter">
      <PageHeader eyebrow="Legal" title={d.title} crumbs={[{ label: "Home", href: "/" }, { label: d.title }]} />
      <div className="px-5 pb-28">
        <Prose>
          <p className="text-sm text-muted">Placeholder text. Have this reviewed and replaced by your legal adviser before launch.</p>
          {doc === "privacy" ? (<>
            <h2>Information we collect</h2><p>We collect the details you provide when you place an order, create an account, subscribe to our newsletter or contact us: name, email, phone number and delivery address.</p>
            <h2>How we use it</h2><p>To process and deliver orders, respond to enquiries and, with your consent, send the Tlotlego Journal. We do not sell your personal information.</p>
            <h2>Your rights under POPIA</h2><p>You may request access to, correction of or deletion of your personal information at any time by contacting {site.contact.email}.</p>
          </>) : (<>
            <h2>Orders and pricing</h2><p>All prices are in South African Rand (ZAR) and include VAT. We reserve the right to correct pricing errors before an order is confirmed.</p>
            <h2>Delivery and returns</h2><p>Delivery and returns are governed by our Delivery and Returns pages and the Consumer Protection Act.</p>
            <h2>Custom orders</h2><p>Custom orders are made to your specification. A deposit may be required and the item cannot be returned unless faulty.</p>
          </>)}
        </Prose>
      </div>
    </div>
  );
}
