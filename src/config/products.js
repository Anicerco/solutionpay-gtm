// Catálogo de productos del demo. Cada producto tiene su propio deeplink,
// que viaja dentro del Singular Link (_dl / _ddl) y la app Android usa para
// abrir la pantalla correspondiente. Los textos están en src/i18n/<lang>.js.
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SavingsIcon from '@mui/icons-material/Savings';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

export const products = [
  { slug: 'tarjeta', icon: CreditCardIcon, color: '#6C3BFF', deeplink: 'singular-android://tarjeta', passthrough: 'promo=TARJETA0' },
  { slug: 'cuenta', icon: AccountBalanceWalletIcon, color: '#00B894', deeplink: 'singular-android://cuenta', passthrough: 'onboarding=web' },
  { slug: 'pagos', icon: ReceiptLongIcon, color: '#FF7A45', deeplink: 'singular-android://pagos', passthrough: 'biller=luz' },
  { slug: 'prestamos', icon: SavingsIcon, color: '#FFB020', deeplink: 'singular-android://prestamos', passthrough: 'amount=500000' },
  { slug: 'transferencias', icon: SwapHorizIcon, color: '#2F80ED', deeplink: 'singular-android://transferencias', passthrough: 'source=web' },
  { slug: 'inversiones', icon: TrendingUpIcon, color: '#E0457B', deeplink: 'singular-android://inversiones', passthrough: 'fund=money_market' },
];

// Link genérico de descarga (sin pantalla específica): abre la home de la app.
export const appHome = { slug: 'home', deeplink: 'singular-android://home', passthrough: 'source=download' };

export const findProduct = (slug) => products.find((p) => p.slug === slug);
