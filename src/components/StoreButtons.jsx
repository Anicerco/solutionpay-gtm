import { Box, ButtonBase, Stack } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import { appHome } from '../config/products';
import AppLink from './AppLink';
import { useI18n } from '../i18n';

// Ícono "play" de 4 colores dibujado en SVG (genérico, no el logo oficial).
function PlayGlyph() {
  return (
    <svg width="26" height="28" viewBox="0 0 26 28" aria-hidden="true">
      <path d="M1 1.5 L15 14 L1 26.5 Z" fill="#00D1A0" />
      <path d="M1 1.5 L20 12 L15 14 Z" fill="#2F80ED" />
      <path d="M1 26.5 L20 16 L15 14 Z" fill="#E0457B" />
      <path d="M20 12 L25 14 L20 16 L15 14 Z" fill="#FFB020" />
    </svg>
  );
}

function StoreButton({ icon, small, big, placement }) {
  return (
    <AppLink
      product={appHome}
      placement={placement}
      component={ButtonBase}
      sx={{
        bgcolor: '#000',
        color: '#fff',
        borderRadius: 2.5,
        px: 2,
        py: 1,
        minWidth: 180,
        justifyContent: 'flex-start',
        gap: 1.5,
        border: '1px solid rgba(255,255,255,0.25)',
        transition: 'transform .15s',
        '&:hover': { transform: 'translateY(-2px)' },
      }}
    >
      {icon}
      <Box sx={{ textAlign: 'left', lineHeight: 1.1 }}>
        <Box sx={{ fontSize: 10, letterSpacing: 0.5, opacity: 0.85 }}>{small}</Box>
        <Box sx={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>{big}</Box>
      </Box>
    </AppLink>
  );
}

// Ambos botones usan el mismo Singular Link: Singular decide la tienda según el
// dispositivo. El placement distingue cuál tocó el usuario en GTM.
export default function StoreButtons({ placement = 'footer_band' }) {
  const { t } = useI18n();
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
      <StoreButton icon={<PlayGlyph />} small={t('stores.googleSmall')} big={t('stores.googleBig')} placement={`${placement}_google_play`} />
      <StoreButton icon={<AppleIcon sx={{ fontSize: 30 }} />} small={t('stores.appleSmall')} big={t('stores.appleBig')} placement={`${placement}_app_store`} />
    </Stack>
  );
}
