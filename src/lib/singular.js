// Web-to-app con Singular Links + eventos de funnel para GTM.
// El sitio renderiza links <a href="https://…sng.link/…"> con el deeplink y
// passthrough de cada producto. Con el Web SDK cargado, el tag de GTM
// "Singular - Open App" (tipo Open App del template oficial) recibe el link base
// en el evento singular_web_to_app_click y hace openApp(). Sin SDK, el link
// funciona igual con el href base.
import { currentUserId } from './identity';

export const SINGULAR_BASE_LINK = 'https://sedemo.sng.link/Etb40/egye';

function currentLang() {
  return document.documentElement.lang || 'es';
}

// _dl / _ddl: deeplink del producto. _p: passthrough del producto + idioma del
// sitio + user_id si el usuario está logueado (la app lo usa como Custom User ID).
export function buildProductLink(product, lang = currentLang(), userId = currentUserId()) {
  const passthrough = new URLSearchParams(product.passthrough);
  passthrough.set('lang', lang);
  if (userId) passthrough.set('uid', userId);
  const params = new URLSearchParams({
    _dl: product.deeplink,
    _ddl: product.deeplink,
    _p: passthrough.toString(),
    _smtype: '3',
  });
  return `${SINGULAR_BASE_LINK}?${params.toString()}`;
}

export function isSingularLoaded() {
  return typeof window !== 'undefined' && typeof window.singularSdk !== 'undefined';
}

export function isGtmLoaded() {
  return typeof window !== 'undefined' && !!window.google_tag_manager;
}

export function pushDataLayer(payload) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent('datalayer:push', { detail: payload }));
}

// Evento de funnel web (GTM lo mapea a singularSdk.event / login / logout).
// Si el usuario está logueado, todos los eventos llevan su user_id.
export function trackEvent(event, attributes = {}) {
  const userId = currentUserId();
  pushDataLayer({ event, language: currentLang(), ...(userId ? { user_id: userId } : {}), ...attributes });
}

// Click en un link web-to-app. handler:
//  - 'gtm_open_app': el sitio no navega; el tag Open App de GTM redirige.
//  - 'native_href': navega el <a> con el link base (sin SDK o ctrl-click).
export function trackWebToAppClick(product, placement, baseLink, handler) {
  trackEvent('singular_web_to_app_click', {
    w2a_product: product.slug,
    w2a_placement: placement,
    w2a_deeplink: product.deeplink,
    w2a_base_link: baseLink,
    w2a_handler: handler,
  });
  window.dispatchEvent(new CustomEvent('singular:w2a-base', { detail: { product: product.slug, placement, link: baseLink, handler } }));
}
