// Catálogo de productos del demo. Cada producto tiene su propio deeplink,
// que viaja dentro del Singular Link (_dl / _ddl) y la app Android usa para
// abrir la pantalla correspondiente. Los textos están en src/i18n/<lang>.js.
// slug = ruta del sitio y del deeplink · key = valor en inglés para los eventos
// passthrough = datos del _p (se envía como JSON)
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SavingsIcon from '@mui/icons-material/Savings';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export const products = [
  { slug: 'tarjeta', key: 'credit_card', icon: CreditCardIcon, color: '#6C3BFF', deeplink: 'singular-android://tarjeta', passthrough: { promo: 'TARJETA0' } },
  { slug: 'cuenta', key: 'account', icon: AccountBalanceWalletIcon, color: '#00B894', deeplink: 'singular-android://cuenta', passthrough: { onboarding: 'web' } },
  { slug: 'pagos', key: 'bill_payment', icon: ReceiptLongIcon, color: '#FF7A45', deeplink: 'singular-android://pagos', passthrough: { biller: 'electricity' } },
  { slug: 'prestamos', key: 'loans', icon: SavingsIcon, color: '#FFB020', deeplink: 'singular-android://prestamos', passthrough: { amount: '500000' } },
  { slug: 'transferencias', key: 'transfers', icon: SwapHorizIcon, color: '#2F80ED', deeplink: 'singular-android://transferencias', passthrough: { source: 'web' } },
  { slug: 'inversiones', key: 'investments', icon: TrendingUpIcon, color: '#E0457B', deeplink: 'singular-android://inversiones', passthrough: { fund: 'money_market' } },
];

// Link genérico de descarga (sin pantalla específica): abre la home de la app.
export const appHome = { slug: 'home', key: 'app_home', deeplink: 'singular-android://home', passthrough: { source: 'download' } };

export const findProduct = (slug) => products.find((p) => p.slug === slug);
