import { useState } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import { AppBar, Box, Button, Container, Divider, Drawer, IconButton, List, ListItemButton, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import { products } from '../config/products';
import { LANGUAGES, useI18n } from '../i18n';
import { useSession } from '../lib/session';

export function Logo() {
  return (
    <Typography component={RouterLink} to="/" variant="h6" sx={{ textDecoration: 'none', color: 'text.primary', fontWeight: 800, letterSpacing: '-0.03em' }}>
      solution<Box component="span" sx={{ color: 'primary.main' }}>pay</Box>
    </Typography>
  );
}

function LanguageSelector() {
  const { lang, setLang, t } = useI18n();
  const [anchor, setAnchor] = useState(null);
  return (
    <>
      <Button color="inherit" startIcon={<LanguageIcon />} onClick={(e) => setAnchor(e.currentTarget)} aria-label={t('nav.language')} sx={{ fontWeight: 700, minWidth: 0 }}>
        {lang.toUpperCase()}
      </Button>
      <Menu anchorEl={anchor} open={!!anchor} onClose={() => setAnchor(null)}>
        {LANGUAGES.map((l) => (
          <MenuItem key={l.code} selected={l.code === lang} onClick={() => { setLang(l.code); setAnchor(null); }}>
            <span style={{ marginRight: 8 }}>{l.flag}</span> {l.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const { user } = useSession();
  const bankingTo = user ? '/banca' : '/login';

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid', borderColor: 'rgba(24,18,58,0.06)', color: 'text.primary' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1 }}>
          <Logo />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, gap: 0.5, ml: 3 }}>
            {products.map((p) => (
              <Button key={p.slug} component={NavLink} to={`/${p.slug}`} color="inherit" sx={{ fontWeight: 600, '&.active': { color: 'primary.main', bgcolor: 'rgba(91,46,255,0.08)' } }}>
                {t(`products.${p.slug}.short`)}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: { xs: 1, lg: 0 } }} />
          <LanguageSelector />
          <Button component={RouterLink} to={bankingTo} variant="outlined" startIcon={<PersonIcon />} sx={{ display: { xs: 'none', sm: 'inline-flex' } }}>
            {user ? user.name : t('nav.personalBanking')}
          </Button>
          <Button component={RouterLink} to="/descargar" variant="contained" sx={{ display: { xs: 'none', md: 'inline-flex' } }}>
            {t('nav.downloadApp')}
          </Button>
          <IconButton sx={{ display: { lg: 'none' } }} onClick={() => setOpen(true)} aria-label={t('nav.menu')}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <List sx={{ width: 260 }} onClick={() => setOpen(false)}>
          <ListItemButton component={RouterLink} to={bankingTo}>
            <ListItemText primary={user ? user.name : t('nav.personalBanking')} primaryTypographyProps={{ fontWeight: 700 }} />
          </ListItemButton>
          <ListItemButton component={RouterLink} to="/descargar">
            <ListItemText primary={t('nav.downloadApp')} primaryTypographyProps={{ color: 'primary', fontWeight: 700 }} />
          </ListItemButton>
          <Divider />
          {products.map((p) => (
            <ListItemButton key={p.slug} component={RouterLink} to={`/${p.slug}`}>
              <ListItemText primary={t(`products.${p.slug}.title`)} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </AppBar>
  );
}
