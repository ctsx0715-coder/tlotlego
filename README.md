# Tlotlego Store

Premium e-commerce frontend for Tlotlego Store, a South African leather goods brand.
Built with Next.js (App Router), React, TypeScript and Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Deploy

1. Push to GitHub: `git add . && git commit -m "Initial site" && git branch -M main && git remote add origin <your-repo-url> && git push -u origin main`
2. In Vercel choose **Add New > Project**, import the repo and deploy. No environment variables are required.
3. Add the domain `www.tlotlegostore.co.za` under Project > Settings > Domains.

## Structure

```
app/            Routes (home, shop, product, cart, checkout, content pages, API stubs, sitemap, robots)
components/     layout/ home/ shop/ product/ ui/
data/           products.ts (mock catalogue), content.ts (copy), site.ts (config and navigation)
lib/            commerce.ts (data access layer), seo.ts, format.ts, types.ts
scripts/        generate-placeholders.mjs (creates the placeholder artwork)
public/images/  Placeholder artwork, replace with real photography
```

## Connecting a real backend

Every page reads products through `lib/commerce.ts`. To move to Shopify, WooCommerce, Medusa or Supabase,
replace the function bodies there and keep the signatures (`getProducts`, `getProduct`, `getFeatured`,
`getBestsellers`, `getRelated`, `searchProducts`). Cart state lives in `components/providers.tsx`
(localStorage); swap `addToCart` for your checkout API when ready.

## Replacing placeholder images

Images are SVG placeholders in `public/images/`. Replace them with real photography (JPG or WebP, 4:5 portrait for
products) and update the paths in `data/products.ts`. When swapping to photos, remove `unoptimized` on the relevant
`<Image>` components so Next.js optimises them. Open Graph images should be JPG or PNG, so point the default image
in `lib/seo.ts` to a real share image.

## Before launch

- Replace placeholder contact details in `data/site.ts` (address, phone, email).
- Replace the placeholder legal text in `app/legal/[doc]/page.tsx` with reviewed Privacy (POPIA) and Terms copy.
- Connect a payment gateway (Yoco, PayFast, Peach Payments) and the API stubs in `app/api/` (newsletter, contact, custom order).
- Replace sample testimonials in `data/content.ts` with verified customer reviews.
