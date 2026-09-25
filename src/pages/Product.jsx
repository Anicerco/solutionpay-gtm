import { Navigate, useParams } from 'react-router-dom';
import { Box, Button, Card, Container, Grid, Stack, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { findProduct } from '../config/products';
import { buildProductLink } from '../lib/singular';
import AppLink from '../components/AppLink';
import { useSession } from '../lib/session';
import CardVisual from '../components/CardVisual';
import { useI18n } from '../i18n';

export default function Product() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const { user } = useSession();
  const p = findProduct(slug);
  if (!p) return <Navigate to="/" replace />;
  const Icon = p.icon;
  const txt = (k) => t(`products.${p.slug}.${k}`);

  return (
    <>
      <Box sx={{ background: `linear-gradient(180deg, ${p.color}22 0%, #F6F4FF 100%)`, py: { xs: 6, md: 10 }, overflow: 'hidden' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ width: 64, height: 64, borderRadius: '20px', display: 'grid', placeItems: 'center', bgcolor: p.color, color: '#fff', mb: 3 }}>
                <Icon fontSize="large" />
              </Box>
              <Typography variant="h1" sx={{ fontSize: { xs: 38, md: 54 } }}>{txt('title')}</Typography>
              <Typography variant="h6" sx={{ color: p.color, mt: 1 }}>{txt('tagline')}</Typography>
              <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 480 }}>{txt('description')}</Typography>
              <Stack spacing={1} sx={{ mt: 3 }}>
                {txt('bullets').map((b) => (
                  <Stack key={b} direction="row" spacing={1} alignItems="center">
                    <CheckCircleIcon sx={{ color: p.color }} fontSize="small" />
                    <Typography fontWeight={600}>{b}</Typography>
                  </Stack>
                ))}
              </Stack>
              <AppLink
                product={p}
                placement="product_page"
                size="large"
                variant="contained"
                startIcon={<PhoneIphoneIcon />}
                sx={{ mt: 4, bgcolor: p.color, '&:hover': { bgcolor: p.color, filter: 'brightness(0.92)' } }}
              >
                {txt('cta')}
              </AppLink>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              {p.slug === 'tarjeta' ? (
                <CardVisual sx={{ transform: { xs: 'rotate(-6deg) scale(0.8)', sm: 'rotate(-6deg) scale(1.1)' } }} />
              ) : (
                <Box sx={{ width: 260, height: 260, borderRadius: '50%', display: 'grid', placeItems: 'center', background: `radial-gradient(circle, ${p.color}55, ${p.color}00 70%)` }}>
                  <Icon sx={{ fontSize: 140, color: p.color }} />
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
        <Card sx={{ p: 3 }}>
          <Typography variant="subtitle2" color="text.secondary">{t('product.linkTitle')}</Typography>
          <Typography sx={{ fontFamily: 'monospace', fontSize: 14, wordBreak: 'break-all', mt: 1 }}>{buildProductLink(p, lang, user?.userId)}</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mt: 2 }}>
            <Typography variant="body2"><b>_dl / _ddl:</b> <code>{p.deeplink}</code></Typography>
            <Typography variant="body2"><b>_p:</b> <code>{new URL(buildProductLink(p, lang, user?.userId)).searchParams.get('_p')}</code></Typography>
          </Stack>
        </Card>
      </Container>
    </>
  );
}
