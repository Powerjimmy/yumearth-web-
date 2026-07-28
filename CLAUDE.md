# YumEarth EU — Web Project

## Purpose
Landing page for YumEarth EU (European Master Distributor). Two audiences: B2B retailers/distributors, B2C health-conscious parents (25–45).

## Stack
- **Framework**: Astro 7 (hybrid — static + SSR for API routes)
- **CSS**: Tailwind CSS v4 (vite plugin — no config file, no `@apply`)
- **React**: islands only (interactive components in `src/components/react/`)
- **Fonts**: Fontshare CDN — ClashDisplay 700 (headlines) + Satoshi 400/500/600 (body)
- **Email**: Resend via `/api/contact`
- **Rate limiting**: Upstash Redis (`@upstash/ratelimit`)
- **Analytics**: Vercel Analytics
- **Hosting**: Vercel (prod)

## Design System
See `DESIGN.md` for full spec. Key tokens:

```
primary-bg:  #FFFBF0   cream canvas
green:       #92c43b   buttons, accents
orange:      #FF3D00   CTA buttons
ink:         #1a1a1a   body text
```

Font roles: `font-display` = ClashDisplay, `font-body` = Satoshi.
Buttons: `btn-primary` (orange, pill) / `btn-secondary` (ink border, pill).

## Pages
```
/                index.astro      Home
/products        products.astro   Full catalog (6 product lines)
/about           about.astro      Brand story
/distribution    distribution.astro  Where to buy + B2B
/contact         contact.astro    Contact form
/faqs            faqs.astro
/blog            blog.astro
/lollipops       lollipops.astro  Product detail
/soft-candy      soft-candy.astro Product detail
/legal-notice    legal-notice.astro
/privacy-policy  privacy-policy.astro
```

## Components
- Astro: `Nav.astro`, `Footer.astro`, `Hero.astro`, `Marquee.astro`, `WaveDivider.astro`
- React islands: `HeroReact.tsx`, `CategoryCards.tsx`, `WhySection.tsx`, `StatsSection.tsx`, `TestimonialsSection.tsx`, `GlobeMap.tsx` (cobe), `ProductFloat3D.tsx`, `TiltCard.tsx`, `ConfettiBurst.tsx`, `LifestyleGallery.tsx`, `VideoShowcase.tsx`

## Env Vars
```
RESEND_API_KEY        — email delivery
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

## Conventions
- Spanish routes (`/productos` → `/products` already migrated to EN)
- Contact: `hello@yumearth.eu` sitewide (not info@)
- Copyright: 2026, legal entity standardized
- CSP headers in `vercel.json` — must include GTM + Fontshare CDN on changes
- Rate limiter guard in contact API — never remove
- Images: always include `width`/`height` to prevent CLS

## Brand Voice
Confident. Clean. Playful but not childish. Short sentences. No marketing fluff.
