/**
 * Couche de tracking unifiée.
 * Tous les identifiants proviennent de variables d'environnement (voir .env.example).
 * Aucun événement n'est envoyé si l'identifiant correspondant n'est pas configuré.
 */

type Params = Record<string, unknown>;

export type EcommerceItem = {
  item_id: string;
  item_name: string;
  price: number;
  quantity?: number;
  item_variant?: string;
  item_category?: string;
  index?: number;
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, params?: Params) => void };
  }
}

/** Déduplication : un même événement n'est pas renvoyé deux fois de suite. */
const recent = new Map<string, number>();
const DEDUPE_MS = 800;

function isDuplicate(key: string) {
  const now = Date.now();
  const last = recent.get(key);
  recent.set(key, now);
  if (recent.size > 50) recent.clear();
  return last !== undefined && now - last < DEDUPE_MS;
}

const META_EVENTS: Record<string, string> = {
  view_item: "ViewContent",
  select_item: "ViewContent",
  add_to_cart: "AddToCart",
  view_cart: "ViewCart",
  begin_checkout: "InitiateCheckout",
  purchase: "Purchase",
  search: "Search",
  newsletter_signup: "Lead",
};

const TIKTOK_EVENTS: Record<string, string> = {
  view_item: "ViewContent",
  add_to_cart: "AddToCart",
  begin_checkout: "InitiateCheckout",
  purchase: "CompletePayment",
  search: "Search",
  newsletter_signup: "Subscribe",
};

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  const key = `${event}:${JSON.stringify(params)}`;
  if (isDuplicate(key)) return;

  // Google Tag Manager (dataLayer) — toujours alimenté, GTM filtre côté conteneur.
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });

  // GA4 direct (si gtag est chargé sans passer par GTM)
  window.gtag?.("event", event, params);

  const metaEvent = META_EVENTS[event];
  if (metaEvent) window.fbq?.("track", metaEvent, params);

  const tiktokEvent = TIKTOK_EVENTS[event];
  if (tiktokEvent) window.ttq?.track(tiktokEvent, params);
}

export const trackViewItemList = (items: EcommerceItem[], listName: string) =>
  track("view_item_list", { item_list_name: listName, currency: "MAD", items });

export const trackSelectItem = (item: EcommerceItem, listName: string) =>
  track("select_item", { item_list_name: listName, currency: "MAD", items: [item] });

export const trackViewItem = (item: EcommerceItem) =>
  track("view_item", { currency: "MAD", value: item.price, items: [item] });

export const trackAddToCart = (item: EcommerceItem) =>
  track("add_to_cart", {
    currency: "MAD",
    value: item.price * (item.quantity ?? 1),
    items: [item],
  });

export const trackRemoveFromCart = (item: EcommerceItem) =>
  track("remove_from_cart", {
    currency: "MAD",
    value: item.price * (item.quantity ?? 1),
    items: [item],
  });

export const trackViewCart = (items: EcommerceItem[], value: number) =>
  track("view_cart", { currency: "MAD", value, items });

export const trackBeginCheckout = (items: EcommerceItem[], value: number) =>
  track("begin_checkout", { currency: "MAD", value, items });

export const trackPurchase = (
  transactionId: string,
  items: EcommerceItem[],
  value: number,
) => track("purchase", { transaction_id: transactionId, currency: "MAD", value, items });

export const trackSearch = (searchTerm: string) => track("search", { search_term: searchTerm });

export const trackNewsletterSignup = (method = "footer_banner") =>
  track("newsletter_signup", { method });

export const trackWhatsappClick = (location: string) =>
  track("whatsapp_click", { location });
