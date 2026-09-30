import Link from "next/link";
import { footerColumns, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-20 sm:px-8 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-serif text-3xl tracking-[0.3em]">TLOTLEGO</p>
            <p className="mt-1 text-[0.7rem] uppercase tracking-[0.3em] text-sand">Store</p>
            <p className="mt-8 text-[0.72rem] uppercase tracking-[0.28em] text-sand">Crafted with intention.</p>
            <address className="mt-8 space-y-1 text-sm not-italic text-ivory/70">
              {site.contact.address.map((l) => (<p key={l}>{l}</p>))}
              <p className="pt-3"><a href={`tel:${site.contact.phoneHref}`} className="link-underline">{site.contact.phone}</a></p>
              <p><a href={`mailto:${site.contact.email}`} className="link-underline">{site.contact.email}</a></p>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="mb-5 font-sans text-[0.68rem] uppercase tracking-[0.28em] text-sand">{col.title}</h2>
                <ul className="space-y-3 text-sm text-ivory/75">
                  {col.links.map((l) => (
                    <li key={l.label}><Link href={l.href} className="link-underline">{l.label}</Link></li>
                  ))}
                </ul>
              </nav>
            ))}
            <nav aria-label="Social">
              <h2 className="mb-5 font-sans text-[0.68rem] uppercase tracking-[0.28em] text-sand">Social</h2>
              <ul className="space-y-3 text-sm text-ivory/75">
                <li><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="link-underline">Instagram</a></li>
                <li><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="link-underline">Facebook</a></li>
                <li><a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="link-underline">TikTok</a></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/15 pt-6 text-[0.68rem] uppercase tracking-[0.18em] text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Tlotlego Store. All rights reserved.</p>
          <p>South Africa &nbsp;|&nbsp; Prices in ZAR, VAT inclusive &nbsp;|&nbsp; Delivery nationwide</p>
        </div>
      </div>
    </footer>
  );
}
