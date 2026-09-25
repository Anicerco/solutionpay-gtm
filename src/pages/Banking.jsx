import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Button, Card, CardActionArea, Container, Divider, Grid, Snackbar, Stack, Typography } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LogoutIcon from '@mui/icons-material/Logout';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useI18n } from '../i18n';
import { useSession } from '../lib/session';
import { trackEvent } from '../lib/singular';
import AppLink from '../components/AppLink';
import { appHome } from '../config/products';

const actions = [
  { key: 'transfer', event: 'transfer_start', icon: SwapHorizIcon, color: '#2F80ED' },
  { key: 'payBill', event: 'bill_payment_start', icon: ReceiptLongIcon, color: '#FF7A45' },
  { key: 'requestCard', event: 'card_request_start', icon: CreditCardIcon, color: '#6C3BFF' },
  { key: 'invest', event: 'investment_start', icon: TrendingUpIcon, color: '#E0457B' },
];

const movementAmounts = [-45230.5, 120000, -18400, -6999];

// Home banking web (post-login): cada operación es un evento web del funnel.
export default function Banking() {
  const { t, lang } = useI18n();
  const { user, logout } = useSession();
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (user) trackEvent('banking_home_view');
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;

  const money = (n) => new Intl.NumberFormat(lang === 'en' ? 'en-US' : lang === 'pt' ? 'pt-BR' : 'es-AR', { style: 'currency', currency: 'ARS' }).format(n);

  const onAction = (a) => {
    trackEvent(a.event);
    setToast(`${t('banking.eventSent')}: ${a.event}`);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, pb: 10 }}>
      <Container maxWidth="lg">
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="h4">{t('banking.hello')}, {user.name} 👋</Typography>
          <Button startIcon={<LogoutIcon />} onClick={logout} color="inherit">{t('banking.logout')}</Button>
        </Stack>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card sx={{ p: 4, color: '#fff', background: 'linear-gradient(135deg,#18123A 0%,#5B2EFF 100%)' }}>
              <Typography sx={{ opacity: 0.75 }}>{t('banking.account')}</Typography>
              <Typography sx={{ opacity: 0.75, mt: 2, fontSize: 14 }}>{t('banking.balance')}</Typography>
              <Typography variant="h2" sx={{ fontSize: { xs: 34, md: 44 } }}>{money(254320.5)}</Typography>
              <Typography sx={{ opacity: 0.6, mt: 1, fontFamily: 'monospace', fontSize: 13 }}>user_id: {user.userId}</Typography>
            </Card>

            <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>{t('banking.actions')}</Typography>
            <Grid container spacing={2}>
              {actions.map((a) => {
                const Icon = a.icon;
                return (
                  <Grid item xs={6} sm={3} key={a.key}>
                    <CardActionArea onClick={() => onAction(a)} sx={{ borderRadius: 4, p: 2, textAlign: 'center', bgcolor: '#fff', boxShadow: '0 10px 30px rgba(40,20,120,0.06)' }}>
                      <Box sx={{ width: 52, height: 52, mx: 'auto', borderRadius: '16px', display: 'grid', placeItems: 'center', bgcolor: `${a.color}1A`, color: a.color }}>
                        <Icon />
                      </Box>
                      <Typography fontWeight={700} fontSize={14} sx={{ mt: 1 }}>{t(`banking.${a.key}`)}</Typography>
                    </CardActionArea>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6">{t('banking.movements')}</Typography>
              {t('banking.mov').map((label, i) => (
                <Box key={label}>
                  <Stack direction="row" justifyContent="space-between" sx={{ py: 1.5 }}>
                    <Typography>{label}</Typography>
                    <Typography fontWeight={700} color={movementAmounts[i] > 0 ? 'success.main' : 'text.primary'}>{money(movementAmounts[i])}</Typography>
                  </Stack>
                  {i < 3 && <Divider />}
                </Box>
              ))}
            </Card>
            <Card sx={{ p: 3, mt: 3, bgcolor: '#EFFFF9' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <PhoneIphoneIcon sx={{ color: '#00B894', fontSize: 36 }} />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography fontWeight={700}>{t('banking.continueApp')}</Typography>
                  <Typography variant="body2" color="text.secondary">{t('banking.continueAppText')}</Typography>
                </Box>
              </Stack>
              <AppLink product={{ ...appHome, passthrough: 'source=web_banking' }} placement="banking_home" fullWidth variant="contained" color="secondary" sx={{ mt: 2, color: '#0B3B30' }}>
                {t('login.appBannerCta')}
              </AppLink>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Snackbar open={!!toast} autoHideDuration={2000} onClose={() => setToast(null)} message={toast} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} />
    </Box>
  );
}
