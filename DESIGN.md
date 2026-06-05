---
version: 1.0
name: YumEarth-EU-design-system
description: "Organic Bold — cream canvas, punchy green and orange accents, editorial type. The organic snack brand that doesn't look like a health food brand. Warm, energetic, approachable."
---

# YumEarth EU Design System

## Brand Voice
Confident. Clean. Playful but not childish. Uses short sentences. No marketing fluff.

## Colors

```
primary-bg:    #FFFBF0   (cream — warm white, never pure white)
green:         #92c43b   (brand green — buttons, accents, badges)
green-dark:    #6a9328   (text on light green bg)
orange:        #FF3D00   (CTA buttons, highlights)
ink:           #1a1a1a   (body text, headings)
ink-muted:     #6b6b6b   (secondary text, captions)
surface:       #f5f0e0   (slightly darker cream for alt sections)
```

## Typography

```
display:   ClashDisplay 700  — headlines, hero, product names
           tracking: -0.03em | line-height: 0.95
body:      Satoshi 400/500   — paragraphs, UI text
           line-height: 1.6
label:     Satoshi 600       — uppercase tracking-widest for badges/labels
```

Fonts loaded from Fontshare CDN:
`https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=satoshi@400,500,700`

## Spacing

Base unit: 4px
Section padding: py-24 (96px)
Container: max-w-7xl mx-auto px-6
Card padding: p-8 or p-10

## Components

### Buttons
```
btn-primary  — orange bg, white text, pill (rounded-full), 14/32px padding
btn-secondary — transparent, ink border, pill, hover fills ink
```

### Cards
```
ProductCard — rounded-3xl, colored background, product image, lift hover
FeatureCard — bg-white rounded-3xl p-8, card-lift
StatsCard   — bg-white/5 on dark bg
```

### Badges / Labels
```
Small pill: bg-green/15 text-green-dark font-semibold uppercase tracking-widest text-sm
```

### Nav
```
Fixed top, transparent → cream/90 blur on scroll
Logo left, links center (desktop), CTA right
Hamburger mobile
```

## Parallax Approach
- CSS only via `transform: translateZ` or mouse-move JS (no heavy libs)
- Background blobs: radial gradients, pointer-events-none
- Product image: subtle translateZ on mouse move
- Floating cards: CSS `@keyframes float` (translateY 0 → -12px)

## Page Structure

```
/              Home   — Hero + Products + Why Us + Retailers + LeadForm
/productos     Catalog  — All 6 products, alternating layout
/nosotros      About    — Story, mission, values, stats
/donde-comprar Where    — Online + retail channels + B2B CTA
/contacto      Contact  — Contact info + full form
```

## Products (current catalog)

| Product | Color Bg | Emoji |
|---------|----------|-------|
| Organic Lollipops | #fce7b0 | 🍭 |
| Fruit Snacks (purple bag) | #e0d4f5 | 🍇 |
| Gummy Bears | #c9e8a3 | 🐻 |
| Giggles | #ffd6d6 | 😄 |
| Sour Beans | #b9e8d5 | 🫘 |
| Vitamin C Lollipops | #ffe0b0 | 🍬 |

## Stack

```
Framework:  Astro (hybrid — static + SSR for API)
CSS:        Tailwind CSS v4 (vite plugin)
Fonts:      Fontshare (ClashDisplay + Satoshi)
Email:      Resend (API route /api/contact)
Hosting:    Vercel (prod) / Netlify (staging)
```

## Environment Variables

```
RESEND_API_KEY=re_...      — email delivery
```
