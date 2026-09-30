export function formatZAR(amount: number): string {
  const rounded = Math.round(amount);
  return "R" + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const categoryMeta = {
  handbags: { title: "Handbags", href: "/shop/handbags", image: "/images/cat-handbags.svg" },
  wallets: { title: "Wallets", href: "/shop/wallets", image: "/images/cat-wallets.svg" },
  belts: { title: "Belts", href: "/shop/belts", image: "/images/cat-belts.svg" },
  accessories: { title: "Accessories", href: "/shop/accessories", image: "/images/texture-cognac.svg" },
} as const;
