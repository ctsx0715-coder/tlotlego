import { searchProducts } from "@/lib/commerce";
import { pageMeta } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/Button";

export const metadata = pageMeta({ title: "Search", description: "Search the Tlotlego Store collection.", path: "/search", noindex: true });

export default async function SearchPage(props: PageProps<"/search">) {
  const sp = await props.searchParams;
  const q = typeof sp.q === "string" ? sp.q : "";
  const results = q ? await searchProducts(q) : [];
  return (
    <div className="page-enter">
      <PageHeader eyebrow="Search" title={q ? `Results for "${q}"` : "Search"} body={q ? `${results.length} ${results.length === 1 ? "piece" : "pieces"} found.` : "Use the search icon to look for bags, wallets and belts."} />
      <div className="mx-auto max-w-[1600px] px-5 pb-28 sm:px-8 lg:px-12">
        {results.length > 0 ? (
          <ul className="grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
            {results.map((p) => (<li key={p.id}><ProductCard product={p} /></li>))}
          </ul>
        ) : (
          <div className="py-16 text-center">
            <p className="font-serif text-3xl">{q ? "Nothing matched your search" : "What are you looking for?"}</p>
            <Button href="/shop" className="mt-8">Browse the collection</Button>
          </div>
        )}
      </div>
    </div>
  );
}
