import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Alert, Box, Button, Card, Container, Link, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useI18n } from '../i18n';
import { useSession } from '../lib/session';
import { trackEvent } from '../lib/singular';
import AppLink from '../components/AppLink';
import { findProduct } from '../config/products';

// Login de "Banca Personas" en la web. Es el punto del funnel donde medimos
// login_view → login_start → login / sign_up con el Web SDK (vía GTM).
export default function Login() {
  const { t } = useI18n();
  const { user, login } = useSession();
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ username: '', password: '', name: '', email: '' });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    trackEvent('login_view', { mode });
  }, [mode]);

  if (user) return <Navigate to="/banca" replace />;

  const onChange = (field) => (e) => {
    if (!started) {
      setStarted(true);
      trackEvent(mode === 'login' ? 'login_start' : 'sign_up_start');
    }
    setForm({ ...form, [field]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.username || !form.password) return;
    login(form.username, { isNew: mode === 'register', name: form.name || form.username });
    navigate('/banca');
  };

  return (
    <Box sx={{ minHeight: 'calc(100vh - 64px)', py: { xs: 6, md: 10 }, background: 'radial-gradient(900px 400px at 20% 0%, rgba(91,46,255,0.18), transparent), #F6F4FF' }}>
      <Container maxWidth="xs">
        <Card sx={{ p: { xs: 3, sm: 4 } }}>
          <Box sx={{ width: 52, height: 52, borderRadius: '16px', display: 'grid', placeItems: 'center', bgcolor: 'primary.main', color: '#fff', mb: 2 }}>
            <LockIcon />
          </Box>
          <Typography variant="h4">{t('login.title')}</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>{t('login.subtitle')}</Typography>

          <Tabs value={mode} onChange={(_, v) => { setMode(v); setStarted(false); }} sx={{ mt: 2 }} variant="fullWidth">
            <Tab value="login" label={t('login.tabLogin')} sx={{ fontWeight: 700, textTransform: 'none' }} />
            <Tab value="register" label={t('login.tabRegister')} sx={{ fontWeight: 700, textTransform: 'none' }} />
          </Tabs>

          <Stack component="form" spacing={2} sx={{ mt: 3 }} onSubmit={onSubmit}>
            {mode === 'register' && (
              <>
                <TextField label={t('login.name')} value={form.name} onChange={onChange('name')} autoComplete="off" />
                <TextField label={t('login.email')} type="email" value={form.email} onChange={onChange('email')} autoComplete="off" />
              </>
            )}
            <TextField label={t('login.user')} value={form.username} onChange={onChange('username')} required autoComplete="off" />
            <TextField label={t('login.password')} type="password" value={form.password} onChange={onChange('password')} required autoComplete="new-password" />
            <Button type="submit" size="large" variant="contained">
              {mode === 'login' ? t('login.submitLogin') : t('login.submitRegister')}
            </Button>
            {mode === 'login' && (
              <Link component="button" type="button" variant="body2" onClick={() => trackEvent('password_reset_click')} sx={{ alignSelf: 'center' }}>
                {t('login.forgot')}
              </Link>
            )}
          </Stack>
          <Alert severity="info" sx={{ mt: 3 }}>{t('login.demoNote')}</Alert>
        </Card>

        <Card sx={{ mt: 2, p: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <PhoneIphoneIcon color="primary" />
            <Typography variant="body2" sx={{ flexGrow: 1 }}>{t('login.appBanner')}</Typography>
            <AppLink product={findProduct('cuenta')} placement="login_page" size="small" variant="outlined">{t('login.appBannerCta')}</AppLink>
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
