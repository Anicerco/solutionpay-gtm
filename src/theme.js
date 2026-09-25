import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#5B2EFF', dark: '#3A14C9', light: '#8B6BFF' },
    secondary: { main: '#00D1A0' },
    background: { default: '#F6F4FF', paper: '#FFFFFF' },
    text: { primary: '#18123A', secondary: '#5E5A7A' },
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.03em' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
    button: { textTransform: 'none', fontWeight: 700 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, paddingInline: 22, paddingBlock: 10 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { boxShadow: '0 10px 30px rgba(40, 20, 120, 0.08)' },
      },
    },
  },
});

export default theme;
