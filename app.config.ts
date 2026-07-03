/**
 * app.config.ts — single source of truth (bilingual { tr, en }).
 * Run `/setup` (or "bu projeyi kur") to rebrand + wire your keys.
 */
import type { L } from "@/lib/i18n/config";

export type IconName = string;
export interface NavItem { label: L; href: string; icon: IconName; }
export interface Feature { icon: IconName; title: L; body: L; }
export interface Stat { value: L; label: L; }
export interface PricingTier { name: string; price: string; period?: string; tagline: L; features: L[]; cta: L; featured?: boolean; }
export interface FaqItem { q: L; a: L; }
export interface Integration { key: string; name: string; envVars: string[]; required: boolean; docsUrl: string; purpose: string; }
export interface AppConfig {
  name: string; tagline: L; description: L; domain: string; logoText: string; accentName: string;
  marketing: { badge: L; heroTitle: L; heroAccent: L; heroSubtitle: L; heroCtaPrimary: L; heroCtaSecondary: L; features: Feature[]; stats: Stat[]; pricing: PricingTier[]; faq: FaqItem[]; };
  nav: NavItem[]; integrations: Integration[];
}

export const appConfig: AppConfig = {
  name: "Dropcart",
  tagline: { tr: "Dijital ürününü sat, anında teslim et.", en: "Sell your digital product, deliver instantly." },
  description: {
    tr: "Dropcart, içerik üreticileri için dijital ürün dükkânı: e-kitap, şablon, preset ve kursunu yükle, ödeme al, dosyayı saniyeler içinde otomatik teslim et.",
    en: "Dropcart is a digital storefront for creators: upload your ebooks, templates, presets and courses, take payment, and auto-deliver the files in seconds.",
  },
  domain: "dropcart.digital",
  logoText: "DC",
  accentName: "coral",

  marketing: {
    badge: { tr: "Yaratıcılar için dijital dükkân", en: "A digital store for creators" },
    heroTitle: { tr: "Harika dijital ürünler,", en: "Great digital products," },
    heroAccent: { tr: "anında senin.", en: "instantly yours." },
    heroSubtitle: {
      tr: "E-kitaplar, şablonlar, presetler ve kurslar — ödeme yap, dosyan saniyeler içinde mailine düşsün. Bir kez al, sonsuza dek kullan. İlk ürün Starter planıyla tamamen ücretsiz.",
      en: "Ebooks, templates, presets and courses — pay and your file lands in your inbox in seconds. Buy once, own forever. Your first product is completely free on Starter.",
    },
    heroCtaPrimary: { tr: "Ücretsiz keşfet", en: "Explore for free" },
    heroCtaSecondary: { tr: "Nasıl çalışır?", en: "How it works" },
    features: [
      { icon: "store", title: { tr: "Ürün sayfaları", en: "Product pages" }, body: { tr: "Her ürüne kapak, açıklama ve önizleme. Saniyeler içinde yayında.", en: "Cover, description and preview for every product. Live in seconds." } },
      { icon: "zap", title: { tr: "Anında teslimat", en: "Instant delivery" }, body: { tr: "Ödeme onaylandığı an dosya alıcının mailine düşer — uyurken bile.", en: "The file hits the buyer's inbox the moment payment clears — even while you sleep." } },
      { icon: "credit-card", title: { tr: "Güvenli ödeme", en: "Secure checkout" }, body: { tr: "Stripe ile güvenli kart ödemesi. Para doğrudan hesabına.", en: "Secure Stripe card checkout. Money straight to your account." } },
      { icon: "mail", title: { tr: "Markalı e-posta", en: "Branded email" }, body: { tr: "Markalı teslimat e-postaları Resend ile gider — indirme linki dahil.", en: "Branded delivery emails via Resend — download link included." } },
      { icon: "users", title: { tr: "Müşteri defteri", en: "Customer ledger" }, body: { tr: "Kim ne aldı, kaç kez döndü, ne kadar harcadı — tek listede.", en: "Who bought what, how often they returned — one exportable list." } },
      { icon: "ticket-percent", title: { tr: "Kupon & paket", en: "Coupons & bundles" }, body: { tr: "İndirim kodu, ürün paketi, lansman fiyatı. Satışı sen yönlendir.", en: "Discount codes, bundles, launch pricing. You steer the sales." } },
    ],
    stats: [
      { value: { tr: "%0", en: "0%" }, label: { tr: "satış komisyonu", en: "sales commission" } },
      { value: { tr: "12 sn", en: "12s" }, label: { tr: "ort. teslim süresi", en: "avg. delivery time" } },
      { value: { tr: "4 tür", en: "4 types" }, label: { tr: "e-kitap · şablon · preset · kurs", en: "ebook · template · preset · course" } },
      { value: { tr: "0", en: "0" }, label: { tr: "anahtarla dene", en: "keys to try it" } },
    ],
    pricing: [
      { name: "Starter", price: "$0", period: "/mo", tagline: { tr: "Kayıt ol, 1 ürünü ücretsiz al.", en: "Sign up and get 1 product for free." }, features: [{ tr: "1 ücretsiz ürün indirme", en: "1 free product download" }, { tr: "Kayıt zorunlu", en: "Account required" }, { tr: "Anında teslimat", en: "Instant delivery" }, { tr: "Daha fazlası için Creator'a geç", en: "Upgrade for more products" }], cta: { tr: "Ücretsiz kayıt ol", en: "Sign up free" } },
      { name: "Creator", price: "$12", period: "/mo", tagline: { tr: "5 ürüne kadar erişim.", en: "Access up to 5 products." }, features: [{ tr: "5 ürün indirme kotası", en: "5 product download quota" }, { tr: "İşlem payı yok", en: "No per-sale fee" }, { tr: "Kupon & paket", en: "Coupons & bundles" }, { tr: "Markalı teslim e-postası", en: "Branded delivery email" }, { tr: "Özel alan adı", en: "Custom domain" }], cta: { tr: "Creator'a Geç", en: "Upgrade to Creator" }, featured: true },
      { name: "Studio", price: "$29", period: "/mo", tagline: { tr: "Sınırsız ürün + GitHub push.", en: "Unlimited products + GitHub push." }, features: [{ tr: "Sınırsız ürün kotası", en: "Unlimited product quota" }, { tr: "GitHub'a push et (şablonlar için)", en: "Push to GitHub (for templates)" }, { tr: "API & webhook erişimi", en: "API & webhooks access" }, { tr: "Ekip & roller", en: "Team & roles" }, { tr: "Creator'daki her şey", en: "Everything in Creator" }], cta: { tr: "Studio'ya Geç", en: "Upgrade to Studio" } },
    ],
    faq: [
      { q: { tr: "Denemek için anahtar gerekli mi?", en: "Do I need API keys to try it?" }, a: { tr: "Hayır. Demo modda hemen tıklayabilirsin. Canlı satış için Stripe ve Resend anahtarını bağlarsın.", en: "No. Click around in demo mode immediately. Wire your Stripe and Resend keys to sell live." } },
      { q: { tr: "Hangi ürünleri satabilirim?", en: "What can I sell?" }, a: { tr: "Dijital her şey: e-kitap, Notion/Figma şablonu, Lightroom preset, video kursu, ses paketi.", en: "Anything digital: ebooks, Notion/Figma templates, Lightroom presets, video courses, audio packs." } },
      { q: { tr: "Teslimat nasıl çalışıyor?", en: "How does delivery work?" }, a: { tr: "Ödeme onaylanır onaylanmaz alıcıya markalı bir e-posta gider; indirme linki güvenli ve süreli.", en: "The moment payment clears, the buyer gets a branded email with a secure download link." } },
      { q: { tr: "Para bana nasıl ulaşıyor?", en: "How do I get paid?" }, a: { tr: "Ödemeler Stripe hesabına doğrudan geçer; Dropcart araya girmez.", en: "Payments go straight to your Stripe account; Dropcart never holds your money." } },
    ],
  },

  nav: [
    { label: { tr: "Genel", en: "Overview" }, href: "/dashboard", icon: "layout-dashboard" },
    { label: { tr: "Ürünler", en: "Products" }, href: "/products", icon: "package" },
    { label: { tr: "Satışlar", en: "Sales" }, href: "/sales", icon: "receipt" },
    { label: { tr: "Müşteriler", en: "Customers" }, href: "/customers", icon: "users" },
    { label: { tr: "Ayarlar", en: "Settings" }, href: "/settings", icon: "settings" },
  ],

  integrations: [
    { key: "stripe", name: "Stripe", envVars: ["STRIPE_SECRET_KEY"], required: false, docsUrl: "https://dashboard.stripe.com/apikeys", purpose: "Card checkout for one-time and subscription product sales." },
    { key: "resend", name: "Resend", envVars: ["RESEND_API_KEY"], required: false, docsUrl: "https://resend.com/api-keys", purpose: "Branded instant-delivery and receipt emails to buyers." },
    { key: "supabase", name: "Supabase", envVars: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"], required: false, docsUrl: "https://supabase.com/dashboard/project/_/settings/api", purpose: "Stores products, sales and customers. Without it, runs in demo mode." },
  ],
};

export default appConfig;
