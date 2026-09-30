"use client";

import { useState } from "react";
import { ChevronIcon } from "@/components/ui/Icons";

export function Accordion({ items }: { items: { title: string; content: React.ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.title} className="border-b border-line">
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={`acc-${i}`} onClick={() => setOpen(isOpen ? null : i)} className="flex min-h-14 w-full items-center justify-between text-left font-sans text-[0.72rem] uppercase tracking-[0.24em]">
                {it.title}
                <ChevronIcon className={`transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </h3>
            <div id={`acc-${i}`} role="region" className={`grid transition-all duration-500 ease-out ${isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden text-sm leading-relaxed text-muted">{it.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
