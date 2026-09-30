export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-2xl space-y-6 text-[1.05rem] leading-[1.8] text-ink/85 [&_h2]:mt-14 [&_h2]:text-3xl [&_h2]:text-charcoal [&_h3]:mt-8 [&_h3]:text-xl [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_a]:underline">{children}</div>;
}
