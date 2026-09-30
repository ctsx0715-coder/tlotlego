import { notFound } from "next/navigation";
import { getProduct, getProducts, getRelated } from "@/lib/commerce";
import { breadcrumbLd, pageMeta, productLd } from "@/lib/seo";
import { categoryMeta } from "@/lib/format";
import { JsonLd } from "@/components/ui/JsonLd";
import { ProductView } from "@/components/product/ProductView";
import { ProductCard } from "@/components/shop/ProductCard";
import Link from "next/link";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const p = await getProduct(slug);
  if (!p) return {};
  return pageMeta({ title: `${p.name} | Handcrafted Leather ${categoryMeta[p.category].title}`, description: `${p.tagline}. ${p.description}`.slice(0, 158), path: `/product/${p.slug}`, image: p.images[0] });
}

export default async function ProductPage(props: PageProps<"/product/[slug]">) {
  const { slug } = await props.params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const related = await getRelated(product, 4);
  const cat = categoryMeta[product.category];
  return (
    <div className="page-enter">
      <JsonLd data={productLd(product)} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Shop", path: "/shop" }, { name: cat.title, path: cat.href }, { name: product.name, path: `/product/${product.slug}` }])} />
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-8 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="mb-8 text-[0.66rem] uppercase tracking-[0.22em] text-muted">
          <ol className="flex flex-wrap gap-2">
            <li><Link href="/shop" className="link-underline">Shop</Link> /</li>
            <li><Link href={cat.href} className="link-underline">{cat.title}</Link> /</li>
            <li aria-current="page" className="text-charcoal">{product.name}</li>
          </ol>
        </nav>
        <ProductView product={product} />
      </div>
      <section className="border-t border-line py-24" aria-labelledby="ymal">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <h2 id="ymal" className="mb-12 text-center text-4xl uppercase tracking-[0.04em]">You may also like</h2>
          <ul className="grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {related.map((p) => (<li key={p.id}><ProductCard product={p} showTagline={false} /></li>))}
          </ul>
        </div>
      </section>
    </div>
  );
}
