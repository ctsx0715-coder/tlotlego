export const craftSteps = [
  { n: "01", title: "Select", body: "Full-grain hides are chosen by hand for their strength, grain and character. What does not meet the standard is set aside.", image: "/images/craft-select.svg" },
  { n: "02", title: "Shape", body: "Each panel is cut and skived by hand, then prepared for assembly so that edges meet exactly where they should.", image: "/images/craft-shape.svg" },
  { n: "03", title: "Craft", body: "Experienced artisans stitch, glue and set every piece with precision. Nothing is rushed, and nothing is hidden.", image: "/images/craft-craft.svg" },
  { n: "04", title: "Finish", body: "Edges are burnished, hardware is fitted and each piece is inspected before it is packed and sent to you.", image: "/images/craft-finish.svg" },
] as const;

export const testimonials = [
  { quote: "Beautiful craftsmanship and even better in person.", name: "Verified customer", place: "Johannesburg" },
  { quote: "The leather has softened beautifully after a year of daily use.", name: "Verified customer", place: "Cape Town" },
  { quote: "My custom belt arrived exactly as I described it. Quiet, precise, well made.", name: "Verified customer", place: "Pretoria" },
  { quote: "Quality you can feel the moment you pick it up. Delivery was quick too.", name: "Verified customer", place: "Durban" },
] as const;

export const social = [
  "/images/social-1.svg",
  "/images/social-2.svg",
  "/images/social-3.svg",
  "/images/social-4.svg",
  "/images/social-5.svg",
  "/images/social-6.svg",
].map((src, i) => ({ src, alt: ["Cognac tote in the workshop light", "Leather wallet detail", "Close-up of hand stitching", "Black flap bag", "Olive bag on stone", "Leather grain macro"][i], href: "https://www.instagram.com/tlotlegostore" }));

export const sustainability = [
  { title: "Responsible sourcing", body: "We work with tanneries that meet recognised environmental and traceability standards, and we source hides as a by-product of the food industry." },
  { title: "Made to last", body: "A well-made piece worn for fifteen years does more good than five replaced in the same time. Repairs and re-conditioning are part of how we work." },
  { title: "Less waste", body: "Offcuts from larger pieces become cardholders, key fobs and belt loops. Small pieces are planned into the cutting room, not swept out of it." },
  { title: "Small batches", body: "We make in limited runs against real demand, rather than producing ahead and discounting what is left." },
] as const;

export const faqs = [
  { q: "Where is Tlotlego Store based?", a: "Our workshop and studio are in Johannesburg, Gauteng. Every piece is designed and made in South Africa." },
  { q: "How long does delivery take?", a: "Orders ship within 1 to 2 business days. Metro areas typically receive orders in 2 to 3 business days, and the rest of South Africa in 3 to 6 business days." },
  { q: "Is delivery free?", a: "Delivery is complimentary on orders over R1,500. Below that, a flat fee of R90 applies nationwide." },
  { q: "Can I return an item?", a: "Yes. Unused items in original condition can be returned within 30 days of delivery for a refund or exchange. Custom orders are made to your specification and cannot be returned unless faulty." },
  { q: "How long does a custom order take?", a: "Most custom pieces take 3 to 5 weeks from approval of the design. We will confirm a timeline in your quote." },
  { q: "How do I care for my leather?", a: "Wipe with a dry cloth, keep away from prolonged sun and moisture, and condition once or twice a year with a neutral leather balm." },
  { q: "Do you offer repairs?", a: "Yes. We repair stitching, hardware and edges on pieces we have made. Get in touch with a photo and we will advise." },
  { q: "Which payment methods are accepted?", a: "Cards, instant EFT and Apple Pay are supported at checkout. All payments are processed securely." },
] as const;
