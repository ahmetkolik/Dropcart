# Working in this project (read me first)

This is a **GoatStarter kit** — a production-grade Next.js 16 starter built to be
rebranded fast.

## ⭐ If the user wants to set this up

When the user says anything like **"set up this project"**, **"bu projeyi kur"**,
**"make this mine"**, **"configure this"**, or runs **`/setup`** — do NOT start
editing files blindly. Open **`SETUP.md`** and follow it exactly. It is an
interview: you ask a short list of questions (brand, logo, colors, and the
specific API keys this app needs), then you apply the answers to:

- `app.config.ts` — name, tagline, copy, navigation
- `app/globals.css` — brand colors
- `app/layout.tsx` — fonts (optional)
- `.env.local` — the API keys you collected
- `public/logo.svg` — the user's logo (if provided)

Ask **one question at a time**, accept "skip"/"keep default" for any of them, and
never invent API keys. When done, run `npm install` and `npm run dev` and report
the local URL.

## The single source of truth

`app.config.ts` drives the brand, the marketing page, the dashboard navigation,
and the list of integrations this kit expects. Read it before changing UI copy.

## Bilingual (TR + EN)

Every user-facing string is `{ tr: "…", en: "…" }`. When you edit copy, **keep
both languages**. Shared UI strings (auth, nav chrome, buttons) live in
`lib/i18n/dict.ts`. The default language is set in `lib/i18n/config.ts`
(`DEFAULT_LANG`). A live TR/EN toggle sits in the navbar, dashboard topbar and
auth pages.

## Auth

`/login` and `/signup` are real screens but run a **demo bypass** — Supabase
isn't connected, so submitting (or "Continue with demo") just enters the
dashboard. Wiring Supabase via setup is what makes them do real auth.

## Demo mode

With no keys in `.env.local`, the app renders from `lib/demo/data.ts`. That is
intentional — it lets anyone boot the app instantly. Real integrations replace
the demo data once their keys are present.

<!-- BEGIN:nextjs-agent-rules -->
## This is NOT the Next.js you may know

This is Next.js 16 (App Router, React 19, Tailwind v4). APIs and conventions may
differ from older training data. If unsure about a Next.js API, check
`node_modules/next/dist/docs/` before writing code, and heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

## 🚀 Production deployment — dropcart.digital

**Live site:** https://dropcart.digital  
**Vercel project:** `kolik/sellfold`  
**Supabase project:** `mvnhlesjjrwlnxsokuea` (eu-central-1)  
**Stripe account:** KOLIK LLC — `acct_1Sb5HQRphZRyJaMl`

### Services wired up

| Service | Status | Notes |
|---|---|---|
| Supabase | ✅ Live | Auth + DB. Tables: `profiles`, `products`, `orders`, `page_views` |
| Stripe Checkout | ✅ Live | One-time product purchases, live mode |
| Stripe Subscriptions | ✅ Live | Creator ($12/mo `price_1Tl9W9...`), Studio ($29/mo `price_1Tl9WA...`) |
| Stripe Webhook | ✅ Live | `we_1Tn0aTRphZRyJaMl1eJNHxCz` on KOLIK LLC, 3 events |
| Resend | ✅ Live | Domain `dropcart.digital` verified, eu-west-1, sending enabled |

### Plan limits (seller quota — how many products they can list)

- **Starter** — 3 products max (`STARTER_LIMIT = 3` in `app/(app)/products/page.tsx:423`)
- **Creator** — 5 products (`$12/mo`)
- **Studio** — unlimited (`$29/mo`)

### Stripe webhook events handled (`app/api/stripe/webhook/route.ts`)

1. `checkout.session.completed` — creates order record + sends buyer delivery email via Resend
2. `customer.subscription.updated` — updates `profiles.plan` on upgrade/renewal
3. `customer.subscription.deleted` — resets `profiles.plan` → `"starter"`

### Admin bypass

Emails `kolikahmet@gmail.com` and `info@kolikshop.com` skip all quota checks.

---

## 🛠 Bugs fixed (production)

### 1. STARTER_LIMIT was Infinity
**File:** `app/(app)/products/page.tsx:423`  
**Fix:** `const STARTER_LIMIT = 3;` (was `Infinity`, so "New product" button never disabled)

### 2. Quota redirect pointed to non-existent /settings#billing
**File:** `app/(marketing)/p/[id]/page.tsx` (lines ~188, ~218)  
**Fix:** Both `window.location.href` calls changed from `/settings#billing` → `/account`

### 3. Billing portal crashed on stale stripe_customer_id
**File:** `app/api/billing-portal/route.ts`  
**Fix:** Added `stripe.customers.retrieve()` guard before creating portal session; clears stale ID from DB if customer not found

### 4. Stripe webhook was on wrong account
The webhook `we_1TktcgJVprXpO9FG0cw3fmMg` was registered on old account (`51Szw8f`).
Vercel was using KOLIK LLC key (`51Sb5HQ`). Webhook never fired.  
**Fix:** Created new webhook `we_1Tn0aTRphZRyJaMl1eJNHxCz` on KOLIK LLC with all 3 events.
`STRIPE_WEBHOOK_SECRET=whsec_6qT0XIjsreb96RpuNwHbpKGBF0Bdgrro` updated in Vercel.

### 5. Checkout success redirect went to homepage with no feedback
**File:** `app/api/checkout/route.ts`  
**Fix:** `success_url` changed from `/?payment=success` → `/p/{product.id}?payment=success`.
Product page reads `?payment=success` URL param to show the "Product sent to your email! 🎉" banner.

---

## ⚠️ Known non-critical stubs (not yet implemented)

These features have UI buttons but no backend logic — they do not affect the core
sell/buy flow and can be implemented later:

- **CSV Export** buttons in `/sales` and `/customers` pages — buttons are visible, onClick does nothing
- **Send email** button per customer row in `/customers` — no action wired
- **Transfer** button in dashboard balance card — no action wired  
- **Dashboard balance/payout** — always shows demo data; real Stripe balance visible at stripe.com
- **"4.9 · 128 reviews"** badge on all product pages — hardcoded, no review system
- **"1,000+ Happy Customers"** badge on marketing page — hardcoded

---

## 📁 Repo structure notes

- `app.config.ts` — brand, nav, plan definitions, integrations list
- `lib/demo/data.ts` — demo products/orders shown when no Supabase key
- `lib/i18n/dict.ts` — shared TR/EN UI strings
- `public/logo.svg` — brand logo (SVG)
- `setup-guide/` — onboarding screenshots (kit documentation, do not delete)
- `videos/` — marketing video assets (mp4s for ads/social)
- `scripts/generate-pdfs.ts` — PDF generation script (not part of the app)

## 🔑 Environment variables (.env.local)

```
NEXT_PUBLIC_APP_URL=https://dropcart.digital
STRIPE_SECRET_KEY=sk_live_51Sb5HQ...          # KOLIK LLC live key
STRIPE_WEBHOOK_SECRET=whsec_6qT0XI...         # KOLIK LLC webhook secret
STRIPE_PRICE_CREATOR=price_1Tl9W9RphZRyJaMl...
STRIPE_PRICE_STUDIO=price_1Tl9WARphZRyJaMl...
RESEND_API_KEY=re_15pub4CR...
NEXT_PUBLIC_SUPABASE_URL=https://mvnhlesjjrwlnxsokuea.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```
