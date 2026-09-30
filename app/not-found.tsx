import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="px-5 py-40 text-center">
      <p className="eyebrow mb-5">404</p>
      <h1 className="text-5xl uppercase tracking-[0.04em]">Page not found</h1>
      <p className="mx-auto mt-6 max-w-sm text-muted">The page you are looking for may have moved. Try the collection instead.</p>
      <Button href="/shop" className="mt-10">Shop the collection</Button>
    </div>
  );
}
