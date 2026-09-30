import { pageMeta } from "@/lib/seo";
import { site } from "@/data/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/shop/ContactForm";

export const metadata = pageMeta({ title: "Contact Tlotlego Store", description: "Get in touch with Tlotlego Store about orders, custom leather goods, repairs or wholesale. Based in Johannesburg, South Africa.", path: "/contact" });

export default function ContactPage() {
  return (
    <div className="page-enter">
      <PageHeader eyebrow="Contact" title="Get in touch" body="Questions about an order, a custom piece or a repair. We reply within one business day." crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 pb-28 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-12">
        <ContactForm />
        <div className="space-y-10 text-sm">
          <div><h2 className="eyebrow mb-3">Workshop & studio</h2><address className="not-italic leading-relaxed text-ink/85">{site.contact.address.map((l) => (<span key={l} className="block">{l}</span>))}</address><p className="mt-2 text-xs text-muted">Visits by appointment.</p></div>
          <div><h2 className="eyebrow mb-3">Speak to us</h2><p><a className="link-underline" href={`tel:${site.contact.phoneHref}`}>{site.contact.phone}</a></p><p>WhatsApp: {site.contact.whatsapp}</p><p><a className="link-underline" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p></div>
          <div><h2 className="eyebrow mb-3">Hours</h2><p>{site.contact.hours}</p></div>
        </div>
      </div>
    </div>
  );
}
