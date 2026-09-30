"use client";

import { useStore } from "@/components/providers";
import { CheckIcon } from "@/components/ui/Icons";

export function Toasts() {
  const { toasts } = useStore();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-5 z-[70] flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div key={t.id} className="animate-rise pointer-events-auto flex items-center gap-3 bg-charcoal px-5 py-3.5 text-[0.78rem] tracking-wide text-ivory shadow-lg">
          <CheckIcon className="shrink-0 text-sand" />
          {t.message}
        </div>
      ))}
    </div>
  );
}
