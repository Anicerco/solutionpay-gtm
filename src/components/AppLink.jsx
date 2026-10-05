import { Button } from '@mui/material';
import { buildPassthrough, buildProductLink, isSingularLoaded, trackWebToAppClick } from '../lib/singular';
import { useI18n } from '../i18n';
import { useSession } from '../lib/session';

// Link web-to-app real (<a href="…sng.link…">). Se re-renderiza cuando cambia
// el idioma o la sesión, así el href base siempre lleva lang y uid actuales.
//
// Con el Web SDK cargado (vía GTM), el click no navega: se envía el evento y el
// tag "Singular - Open App" llama a singularSdk.openApp(baseLink), que agrega los
// parámetros web (utm, wp_) y redirige. Sin SDK, el <a> navega al link base.
// Ctrl/Cmd/Shift-click se deja pasar (abrir en otra pestaña).
// baseLink (opcional): link fijo para un botón puntual, en lugar del que arma
// buildProductLink. Se le agrega el mismo _p (JSON con datos del producto, lang
// y uid) y pasa por el tag Open App, que le agrega _web_params.
export default function AppLink({ product, placement, baseLink, component: Component = Button, children, ...props }) {
  const { lang } = useI18n();
  const { user } = useSession();
  const href = baseLink
    ? `${baseLink}&_p=${encodeURIComponent(buildPassthrough(product, lang, user?.userId))}`
    : buildProductLink(product, lang, user?.userId);

  return (
    <Component
      component="a"
      href={href}
      data-w2a-product={product.slug}
      data-w2a-placement={placement}
      onClick={(e) => {
        const modified = e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0;
        const handler = isSingularLoaded() && !modified ? 'gtm_open_app' : 'native_href';
        if (handler === 'gtm_open_app') e.preventDefault();
        trackWebToAppClick(product, placement, href, handler);
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
