import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SavingsIcon from '@mui/icons-material/Savings';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { products, findProduct, appHome } from '../config/products';
import { trackEvent } from '../lib/singular';
import AppLink from '../components/AppLink';
import { useSession } from '../lib/session';
import { useI18n } from '../i18n';
import CardVisual from '../components/CardVisual';
import StoreButtons from '../components/StoreButtons';

function Hero() {
  const { t } = useI18n();
  return (
    <Box sx={{ background: 'radial-gradient(1200px 500px at 80% 0%, rgba(177,75,255,0.25), transparent), linear-gradient(180deg,#F1ECFF 0%, #F6F4FF 100%)', pt: { xs: 6, md: 10 }, pb: { xs: 10, md: 14 }, overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Chip label={t('hero.chip')} color="secondary" sx={{ fontWeight: 700, color: '#0B3B30', mb: 2 }} />
            <Typography variant="h1" sx={{ fontSize: { xs: 40, md: 60 }, lineHeight: 1.05 }}>
              {t('hero.titleA')}<Box component="span" sx={{ color: 'primary.main' }}>{t('hero.titleHighlight')}</Box>{t('hero.titleB')}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2, fontWeight: 500, maxWidth: 480 }}>{t('hero.subtitle')}</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
              {/* Link fijo con psn / psid (Publisher Site Name / ID) para identificar este botón en los reportes */}
              <AppLink
                product={findProduct('tarjeta')}
                placement="hero"
                baseLink="https://sedemo.sng.link/Etb40/egye?_smtype=3&_dl=singular-android%3A%2F%2Ftarjeta&_ddl=singular-android%3A%2F%2Ftarjeta&psn=tarjeta&psid=home&pcn=tarjeta&pcid=home"
                size="large"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
              >
                {t('hero.ctaCard')}
              </AppLink>
              <AppLink product={findProduct('cuenta')} placement="hero" size="large" variant="outlined">
                {t('hero.ctaAccount')}
              </AppLink>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', height: { xs: 260, md: 380 }, display: 'flex', justifyContent: 'center', alignItems: 'center', transform: { xs: 'scale(0.72)', sm: 'none' } }}>
              <CardVisual sx={{ position: 'absolute', transform: 'rotate(-10deg) translate(-40px, 30px)' }} gradient="linear-gradient(135deg,#18123A,#3A2B7A)" />
              <CardVisual sx={{ position: 'absolute', transform: 'rotate(6deg) translate(40px, -20px)' }} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

// Dos cuadrantes principales (app / banca web) + accesos simbólicos.
function HelpSection() {
  const { t } = useI18n();
  const { user } = useSession();
  const small = [
    { key: 'payBills', icon: ReceiptLongIcon, color: '#FF7A45', to: '/pagos' },
    { key: 'getCard', icon: CreditCardIcon, color: '#6C3BFF', to: '/tarjeta' },
    { key: 'loans', icon: SavingsIcon, color: '#FFB020', to: '/prestamos' },
    { key: 'branches', icon: SupportAgentIcon, color: '#2F80ED', to: null },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: -6, md: -8 }, position: 'relative' }}>
      <Card sx={{ p: { xs: 2.5, md: 4 } }}>
        <Typography variant="h4" sx={{ mb: 3, fontSize: { xs: 22, md: 28 } }}>{t('help.title')}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <AppLink
              product={appHome}
              placement="help_tile"
              component={CardActionArea}
              sx={{ display: 'block', borderRadius: 4, p: 3, height: '100%', color: '#fff', background: 'linear-gradient(135deg,#5B2EFF 0%,#B14BFF 100%)' }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 56, height: 56, borderRadius: '18px', display: 'grid', placeItems: 'center', bgcolor: 'rgba(255,255,255,0.18)', flexShrink: 0 }}>
                  <PhoneIphoneIcon fontSize="large" />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h5">{t('help.appTitle')}</Typography>
                  <Typography sx={{ opacity: 0.9, fontSize: 14 }}>{t('help.appText')}</Typography>
                </Box>
                <ArrowForwardIcon />
              </Stack>
            </AppLink>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardActionArea
              component={RouterLink}
              to={user ? '/banca' : '/login'}
              onClick={() => trackEvent('personal_banking_click', { placement: 'help_tile' })}
              sx={{ borderRadius: 4, p: 3, height: '100%', color: '#fff', background: 'linear-gradient(135deg,#18123A 0%,#3A2B7A 100%)' }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 56, height: 56, borderRadius: '18px', display: 'grid', placeItems: 'center', bgcolor: 'rgba(255,255,255,0.12)', flexShrink: 0 }}>
                  <PersonIcon fontSize="large" />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h5">{t('help.bankingTitle')}</Typography>
                  <Typography sx={{ opacity: 0.85, fontSize: 14 }}>{t('help.bankingText')}</Typography>
                </Box>
                <ArrowForwardIcon />
              </Stack>
            </CardActionArea>
          </Grid>
          {small.map(({ key, icon: Icon, color, to }) => (
            <Grid item xs={6} md={3} key={key}>
              <CardActionArea
                {...(to ? { component: RouterLink, to } : {})}
                onClick={() => trackEvent('help_tile_click', { tile: key })}
                sx={{ borderRadius: 3, p: 2, border: '1px solid', borderColor: 'rgba(24,18,58,0.08)', display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: 'flex-start' }}
              >
                <Box sx={{ width: 40, height: 40, borderRadius: '12px', display: 'grid', placeItems: 'center', bgcolor: `${color}1A`, color, flexShrink: 0 }}>
                  <Icon />
                </Box>
                <Typography fontWeight={700} fontSize={14}>{t(`help.${key}`)}</Typography>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Container>
  );
}

function ProductGrid() {
  const { t } = useI18n();
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 40 } }}>{t('grid.title')}</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>{t('grid.subtitle')}</Typography>
      <Grid container spacing={3}>
        {products.map((p) => {
          const Icon = p.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={p.slug}>
              <Card sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ width: 48, height: 48, borderRadius: '14px', display: 'grid', placeItems: 'center', bgcolor: p.color, color: '#fff' }}>
                  <Icon />
                </Box>
                <Typography variant="h5" sx={{ mt: 2 }}>{t(`products.${p.slug}.title`)}</Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5, flexGrow: 1 }}>{t(`products.${p.slug}.tagline`)}</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 3 }} flexWrap="wrap" useFlexGap>
                  <AppLink product={p} placement="product_grid" variant="contained" size="small" sx={{ bgcolor: p.color, '&:hover': { bgcolor: p.color, filter: 'brightness(0.92)' } }}>
                    {t(`products.${p.slug}.cta`)}
                  </AppLink>
                  <Button size="small" component={RouterLink} to={`/${p.slug}`} sx={{ color: 'text.primary' }}>{t('grid.more')}</Button>
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

function CardPromo() {
  const { t } = useI18n();
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Box sx={{ borderRadius: 6, p: { xs: 4, md: 7 }, color: '#fff', background: 'linear-gradient(120deg,#18123A 0%,#3A14C9 60%,#5B2EFF 100%)', overflow: 'hidden' }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="overline" sx={{ color: 'secondary.main', fontWeight: 800 }}>{t('promo.overline')}</Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 44 }, mt: 1 }}>{t('promo.title')}</Typography>
            <Stack spacing={1} sx={{ mt: 3 }}>
              {t('products.tarjeta.bullets').map((b) => (
                <Stack key={b} direction="row" spacing={1} alignItems="center">
                  <CheckCircleIcon sx={{ color: 'secondary.main' }} fontSize="small" />
                  <Typography>{b}</Typography>
                </Stack>
              ))}
            </Stack>
            <AppLink product={findProduct('tarjeta')} placement="card_promo" size="large" variant="contained" color="secondary" sx={{ mt: 4, color: '#0B3B30' }}>
              {t('products.tarjeta.cta')}
            </AppLink>
          </Grid>
          <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CardVisual sx={{ transform: { xs: 'rotate(-6deg) scale(0.8)', sm: 'rotate(-6deg)' } }} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

function HowItWorks() {
  const { t } = useI18n();
  return (
    <Container maxWidth="lg" sx={{ mt: 10 }}>
      <Typography variant="h2" sx={{ fontSize: { xs: 30, md: 40 }, mb: 4 }}>{t('how.title')}</Typography>
      <Grid container spacing={3}>
        {t('how.steps').map((s, i) => (
          <Grid item xs={12} md={4} key={s.t}>
            <Card sx={{ p: 3, height: '100%' }}>
              <Typography variant="h3" sx={{ color: 'primary.light' }}>{i + 1}</Typography>
              <Typography variant="h6" sx={{ mt: 1 }}>{s.t}</Typography>
              <Typography color="text.secondary">{s.d}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

// Banda final con los botones de las tiendas (esquema típico de sitios bancarios).
function StoreBand() {
  const { t } = useI18n();
  return (
    <Box sx={{ mt: 10, py: { xs: 6, md: 8 }, background: 'linear-gradient(120deg,#1E1650 0%,#3A14C9 100%)', color: '#fff' }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} alignItems="center" justifyContent="space-between" textAlign={{ xs: 'center', md: 'left' }}>
          <Box>
            <Typography variant="h3" sx={{ fontSize: { xs: 26, md: 34 } }}>{t('stores.title')}</Typography>
            <Typography sx={{ opacity: 0.8, mt: 1 }}>{t('stores.subtitle')}</Typography>
          </Box>
          <StoreButtons placement="home_footer" />
        </Stack>
      </Container>
    </Box>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <HelpSection />
      <ProductGrid />
      <CardPromo />
      <HowItWorks />
      <StoreBand />
    </>
  );
}
