import { Box, Typography } from '@mui/material';
import ContactlessIcon from '@mui/icons-material/Contactless';

// Tarjeta de crédito dibujada con CSS (sin imágenes).
export default function CardVisual({ sx, gradient = 'linear-gradient(135deg, #5B2EFF 0%, #B14BFF 55%, #FF7A45 100%)' }) {
  return (
    <Box
      sx={{
        width: 320,
        height: 200,
        borderRadius: 4,
        p: 3,
        color: '#fff',
        background: gradient,
        boxShadow: '0 30px 60px rgba(91, 46, 255, 0.35)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...sx,
      }}
    >
      <Box sx={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', top: -120, right: -80 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
        <Typography fontWeight={800} letterSpacing="-0.02em">solution<b style={{ color: '#00D1A0' }}>pay</b></Typography>
        <ContactlessIcon />
      </Box>
      <Box sx={{ width: 44, height: 32, borderRadius: 1, background: 'linear-gradient(135deg,#FFE08A,#E0B04A)', position: 'relative' }} />
      <Box sx={{ position: 'relative' }}>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 18, letterSpacing: 2 }}>•••• •••• •••• 4821</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5, fontSize: 12, opacity: 0.85 }}>
          <span>ANA DEMO</span>
          <span>09/30</span>
        </Box>
      </Box>
    </Box>
  );
}
