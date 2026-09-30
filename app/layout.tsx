import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/data/site";
import { organizationLd, websiteLd } from "@/lib/seo";
import { Providers } from "@/components/providers";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Toasts } from "@/components/layout/Toasts";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui/JsonLd";

const serif = localFont({
  src: [
    { path: "./fonts/cormorant-garamond-latin-300-normal.woff2", weight: "300", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});
const sans = localFont({ src: "./fonts/inter-latin-wght-normal.woff2", variable: "--font-sans", weight: "100 900", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Tlotlego Store | Handcrafted Leather Goods, South Africa", template: "%s | Tlotlego Store" },
  description: "Handcrafted leather handbags, wallets, belts and custom leather goods, made in South Africa to last. Complimentary delivery on orders over R1,500.",
  applicationName: site.name,
  alternates: { canonical: site.url },
  openGraph: { type: "website", locale: "en_ZA", siteName: site.name, url: site.url },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#1e1c1a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <Providers>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ivory focus:px-4 focus:py-2">Skip to content</a>
          <AnnouncementBar />
          <Header />
          <MobileMenu />
          <SearchOverlay />
          <CartDrawer />
          <main id="main">{children}</main>
          <Footer />
          <Toasts />
        </Providers>
        <JsonLd data={organizationLd} />
        <JsonLd data={websiteLd} />
      </body>
    </html>
  );
}
