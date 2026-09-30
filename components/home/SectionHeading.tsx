export function SectionHeading({ eyebrow, title, body, align = "left", as: Tag = "h2", tone = "light" }: { eyebrow?: string; title: string; body?: string; align?: "left" | "center"; as?: "h1" | "h2"; tone?: "light" | "dark" }) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-2xl`}>
      {eyebrow && <p className={`eyebrow mb-5 ${tone === "dark" ? "!text-sand" : ""}`}>{eyebrow}</p>}
      <Tag className="text-[2.4rem] uppercase leading-[1.05] tracking-[0.03em] sm:text-5xl lg:text-[3.6rem]">{title}</Tag>
      {body && <p className={`mt-6 text-base leading-relaxed sm:text-lg ${tone === "dark" ? "text-ivory/75" : "text-muted"}`}>{body}</p>}
    </div>
  );
}
