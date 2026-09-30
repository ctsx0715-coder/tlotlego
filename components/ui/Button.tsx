"use client";

import Link from "next/link";

type Variant = "solid" | "outline" | "ghost" | "light";

const base =
  "group relative inline-flex items-center justify-center gap-3 whitespace-nowrap text-[0.7rem] tracking-[0.24em] uppercase transition-all duration-500 ease-out select-none disabled:opacity-50 disabled:pointer-events-none min-h-[52px] px-8";

const variants: Record<Variant, string> = {
  solid: "bg-charcoal text-ivory hover:bg-cognac-deep",
  outline: "border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory",
  ghost: "text-charcoal link-underline px-0 min-h-0 py-1",
  light: "bg-ivory text-charcoal hover:bg-sand",
};

export function Spinner() {
  return (
    <span
      aria-hidden
      className="inline-block h-3.5 w-3.5 rounded-full border border-current border-t-transparent"
      style={{ animation: "spin 0.7s linear infinite" }}
    />
  );
}

export function Button({
  children,
  href,
  variant = "solid",
  loading = false,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  loading?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls} onClick={rest.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} disabled={loading || rest.disabled} {...rest}>
      {loading && <Spinner />}
      {children}
    </button>
  );
}
