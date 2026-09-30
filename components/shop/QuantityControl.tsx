"use client";

import { MinusIcon, PlusIcon } from "@/components/ui/Icons";

export function QuantityControl({ value, onChange, min = 1, max = 10, label = "Quantity" }: { value: number; onChange: (n: number) => void; min?: number; max?: number; label?: string }) {
  return (
    <div className="inline-flex items-center border border-line" role="group" aria-label={label}>
      <button type="button" aria-label="Decrease quantity" disabled={value <= min} onClick={() => onChange(value - 1)} className="flex h-11 w-11 items-center justify-center transition-colors hover:bg-ivory-deep disabled:opacity-30">
        <MinusIcon />
      </button>
      <span className="w-10 text-center text-sm tabular-nums" aria-live="polite">{value}</span>
      <button type="button" aria-label="Increase quantity" disabled={value >= max} onClick={() => onChange(value + 1)} className="flex h-11 w-11 items-center justify-center transition-colors hover:bg-ivory-deep disabled:opacity-30">
        <PlusIcon />
      </button>
    </div>
  );
}
