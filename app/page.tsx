import { pageMeta } from "@/lib/seo";
import { Hero } from "@/components/home/Hero";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { BrandStory } from "@/components/home/BrandStory";
import { Categories } from "@/components/home/Categories";
import { Bestsellers } from "@/components/home/Bestsellers";
import { Craftsmanship } from "@/components/home/Craftsmanship";
import { CustomOrders } from "@/components/home/CustomOrders";
import { Sustainability } from "@/components/home/Sustainability";
import { Testimonials } from "@/components/home/Testimonials";
import { SocialGrid } from "@/components/home/SocialGrid";
import { Newsletter } from "@/components/home/Newsletter";

export const metadata = {
  ...pageMeta({
  title: "Handcrafted Leather Bags, Wallets & Belts in South Africa",
  description: "Premium handcrafted leather handbags, wallets, belts and custom leather goods, made in South Africa. Complimentary delivery on orders over R1,500.",
  path: "/",
}),
  title: { absolute: "Tlotlego Store | Handcrafted Leather Bags, Wallets & Belts in South Africa" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <BrandStory />
      <div className="py-2 sm:py-3"><Categories /></div>
      <Bestsellers />
      <Craftsmanship />
      <CustomOrders />
      <Sustainability />
      <Testimonials />
      <SocialGrid />
      <Newsletter />
    </>
  );
}
