import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import SingularDebugPanel from './components/SingularDebugPanel';
import { pushDataLayer } from './lib/singular';

export default function App() {
  const { pathname } = useLocation();

  // SPA: GTM no ve cambios de ruta solo; avisamos con un page view virtual.
  // La primera carga no se envía: el init del Web SDK ya registra esa visita.
  const firstPath = useRef(pathname);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (pathname === firstPath.current) return;
    firstPath.current = null;
    pushDataLayer({ event: 'virtual_page_view', page_path: pathname, page_title: document.title });
  }, [pathname]);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
      <SingularDebugPanel />
    </Box>
  );
}
