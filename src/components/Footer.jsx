import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { products } from '../config/products';
import { useI18n } from '../i18n';

export default function Footer() {
  const { t } = useI18n();
  return (
    <Box component="footer" sx={{ bgcolor: '#0F0B26', color: 'rgba(255,255,255,0.75)', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800 }}>
              solution<Box component="span" sx={{ color: 'secondary.main' }}>pay</Box>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, maxWidth: 360 }}>{t('footer.about')}</Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1 }}>{t('footer.products')}</Typography>
            {products.map((p) => (
              <Link key={p.slug} component={RouterLink} to={`/${p.slug}`} color="inherit" underline="hover" display="block" variant="body2" sx={{ py: 0.3 }}>
                {t(`products.${p.slug}.title`)}
              </Link>
            ))}
          </Grid>
          <Grid item xs={6} md={4}>
            <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1 }}>{t('footer.demo')}</Typography>
            {t('footer.demoItems').map((item) => (
              <Typography key={item} variant="body2">{item}</Typography>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
