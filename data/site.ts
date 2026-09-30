export const site = {
  name: "Tlotlego Store",
  short: "TLOTLEGO",
  url: "https://www.tlotlegostore.co.za",
  tagline: "Crafted with intention.",
  description:
    "Handcrafted leather handbags, wallets, belts and custom leather goods, made in South Africa to last.",
  freeDeliveryThreshold: 1500,
  deliveryFee: 90,
  currency: "ZAR",
  contact: {
    email: "hello@tlotlegostore.co.za",
    phone: "+27 10 000 0000",
    phoneHref: "+27100000000",
    whatsapp: "+27 82 000 0000",
    address: ["Workshop & Studio", "12 Example Street, Maboneng", "Johannesburg, 2094", "South Africa"],
    hours: "Mon to Fri, 09:00 to 17:00 SAST",
  },
  social: {
    instagram: "https://www.instagram.com/tlotlegostore",
    facebook: "https://www.facebook.com/tlotlegostore",
    tiktok: "https://www.tiktok.com/@tlotlegostore",
  },
  instagramHandle: "@tlotlegostore",
} as const;

export const nav = [
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Handbags", href: "/shop/handbags" },
  { label: "Wallets", href: "/shop/wallets" },
  { label: "Belts", href: "/shop/belts" },
  { label: "Custom", href: "/custom-orders" },
] as const;

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", href: "/shop?sort=newest" },
      { label: "Handbags", href: "/shop/handbags" },
      { label: "Wallets", href: "/shop/wallets" },
      { label: "Belts", href: "/shop/belts" },
      { label: "Custom", href: "/custom-orders" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Craftsmanship", href: "/craftsmanship" },
      { label: "Sustainability", href: "/sustainability" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Delivery", href: "/help/delivery" },
      { label: "Returns", href: "/help/returns" },
      { label: "FAQs", href: "/help/faqs" },
      { label: "Size Guide", href: "/help/size-guide" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Terms & Conditions", href: "/legal/terms" },
    ],
  },
] as const;
