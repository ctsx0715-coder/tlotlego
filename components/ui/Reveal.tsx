"use client";

import { useEffect, useRef, useState } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  variant = "fade",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "p" | "h2";
  variant?: "fade" | "image";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = `${variant === "image" ? "img-reveal" : "reveal"} ${shown ? "is-in" : ""} ${className}`;
  const Comp = Tag as React.ElementType;
  return (
    <Comp ref={ref} className={cls} style={{ ["--d" as string]: `${delay}ms`, transitionDelay: `${delay}ms` }}>
      {children}
    </Comp>
  );
}
