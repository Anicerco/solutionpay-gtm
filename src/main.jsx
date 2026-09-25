import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme';
import App from './App';
import Home from './pages/Home';
import Product from './pages/Product';
import Download from './pages/Download';
import Login from './pages/Login';
import Banking from './pages/Banking';
import { I18nProvider } from './i18n';
import { SessionProvider } from './lib/session';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <I18nProvider>
        <SessionProvider>
          <Router>
            <Routes>
              <Route path='/' element={<App />}>
                <Route index element={<Home />} />
                <Route path='descargar' element={<Download />} />
                <Route path='login' element={<Login />} />
                <Route path='banca' element={<Banking />} />
                <Route path=':slug' element={<Product />} />
              </Route>
            </Routes>
          </Router>
        </SessionProvider>
      </I18nProvider>
    </ThemeProvider>
  </React.StrictMode>
);
