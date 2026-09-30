import { site } from "@/data/site";
import { formatZAR } from "@/lib/format";

export function AnnouncementBar() {
  return (
    <div className="bg-charcoal text-ivory">
      <p className="mx-auto flex h-9 max-w-[1600px] items-center justify-center px-4 text-center text-[0.62rem] uppercase tracking-[0.26em] sm:text-[0.66rem]">
        Complimentary delivery on orders over {formatZAR(site.freeDeliveryThreshold)}
        <span className="mx-3 hidden opacity-40 sm:inline">|</span>
        <span className="hidden sm:inline">Handcrafted in South Africa</span>
      </p>
    </div>
  );
}
