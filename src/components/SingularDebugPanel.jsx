import { useEffect, useState } from 'react';
import { Box, Chip, Divider, Drawer, Fab, IconButton, Stack, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import CloseIcon from '@mui/icons-material/Close';
import { SINGULAR_BASE_LINK, isGtmLoaded, isSingularLoaded } from '../lib/singular';
import { currentUserId } from '../lib/identity';

function LinkParams({ link }) {
  const params = [...new URL(link).searchParams.entries()];
  return (
    <>
      <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all', my: 1, p: 1, bgcolor: 'background.default', borderRadius: 1 }}>{link}</Typography>
      <Table size="small">
        <TableBody>
          {params.map(([k, v]) => (
            <TableRow key={k}>
              <TableCell sx={{ fontFamily: 'monospace', fontWeight: 700 }}>{k}</TableCell>
              <TableCell sx={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>{v}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

// Panel para la demo: estado de GTM / Web SDK, user_id actual, último
// web-to-app (link base del sitio y link final armado por GTM) y dataLayer.
export default function SingularDebugPanel() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState({ gtm: false, sdk: false, userId: null });
  const [base, setBase] = useState(null);
  const [built, setBuilt] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const refresh = () => {
      setStatus({ gtm: isGtmLoaded(), sdk: isSingularLoaded(), userId: currentUserId() });
      setEvents((window.dataLayer || []).filter((e) => e && e.event).map((e) => e.event).slice(-10).reverse());
    };
    refresh();
    const id = setInterval(refresh, 1500);
    // El tag de GTM dispara singular:w2a-built antes que el click de React (captura)
    const onBuilt = (e) => setBuilt(e.detail);
    const onBase = (e) => {
      setBase(e.detail);
      setBuilt((b) => (b && b.base === e.detail.link ? b : null));
    };
    window.addEventListener('singular:w2a-built', onBuilt);
    window.addEventListener('singular:w2a-base', onBase);
    window.addEventListener('datalayer:push', refresh);
    return () => {
      clearInterval(id);
      window.removeEventListener('singular:w2a-built', onBuilt);
      window.removeEventListener('singular:w2a-base', onBase);
      window.removeEventListener('datalayer:push', refresh);
    };
  }, []);

  return (
    <>
      <Fab variant="extended" size="medium" color="primary" onClick={() => setOpen(true)} sx={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1200 }}>
        <BugReportIcon sx={{ mr: 1 }} /> Singular
      </Fab>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { width: { xs: '100%', sm: 440 }, p: 3 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Singular debug</Typography>
          <IconButton onClick={() => setOpen(false)}><CloseIcon /></IconButton>
        </Stack>
        <Stack direction="row" spacing={1} sx={{ my: 2 }} flexWrap="wrap" useFlexGap>
          <Chip label={`GTM ${status.gtm ? 'cargado' : 'no cargado'}`} color={status.gtm ? 'success' : 'default'} />
          <Chip label={`Web SDK ${status.sdk ? 'cargado' : 'no cargado'}`} color={status.sdk ? 'success' : 'warning'} />
          <Chip label={status.userId ? `user_id: ${status.userId}` : 'anónimo'} color={status.userId ? 'primary' : 'default'} variant="outlined" />
        </Stack>
        <Typography variant="caption" color="text.secondary">Base link</Typography>
        <Typography variant="body2" sx={{ fontFamily: 'monospace', wordBreak: 'break-all', mb: 2 }}>{SINGULAR_BASE_LINK}</Typography>
        <Divider />
        <Typography variant="subtitle2" sx={{ mt: 2 }}>Último web-to-app</Typography>
        {base ? (
          <>
            <Typography variant="caption" color="text.secondary">Producto: {base.product} · placement: {base.placement} · handler: {base.handler}</Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>1. Link base (sitio)</Typography>
            <LinkParams link={base.link} />
            <Typography variant="subtitle2" sx={{ mt: 2 }}>2. Link final</Typography>
            {built ? <LinkParams link={built.link} /> : base.handler === 'gtm_open_app' ? (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Lo arma y abre el tag Open App de GTM (openApp). Con Log Level Debug se ve en la consola.</Typography>
            ) : (
              <Typography variant="body2" color="warning.main" sx={{ mt: 1 }}>Web SDK no cargado: se abrió el link base sin parámetros web.</Typography>
            )}
          </>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>Hacé click en cualquier link "…en la app".</Typography>
        )}
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle2">dataLayer (últimos eventos)</Typography>
        <Box component="ul" sx={{ pl: 2, fontFamily: 'monospace', fontSize: 13 }}>
          {events.map((e, i) => <li key={i}>{e}</li>)}
        </Box>
      </Drawer>
    </>
  );
}
