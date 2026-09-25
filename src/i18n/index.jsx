import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import es from './es';
import en from './en';
import pt from './pt';
import { pushDataLayer } from '../lib/singular';

export const LANGUAGES = [
  { code: 'es', label: 'Español', flag: '🇦🇷' },
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
];
const dictionaries = { es, en, pt };
const STORAGE_KEY = 'solutionpay.lang';

// Prioridad: ?lang= en la URL → preferencia guardada → idioma del navegador → es.
function detectLanguage() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl && dictionaries[fromUrl]) return fromUrl;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && dictionaries[saved]) return saved;
  } catch {
    // storage bloqueado: seguimos con el idioma del navegador
  }
  const nav = (navigator.language || 'es').slice(0, 2);
  return dictionaries[nav] ? nav : 'es';
}

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLangState] = useState(detectLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // sin storage: el idioma vale solo para esta visita
    }
    pushDataLayer({ event: 'language_change', language: next });
  }, []);

  // t('help.title') → string; también devuelve arrays/objetos (bullets, steps).
  const t = useCallback(
    (path) => path.split('.').reduce((obj, key) => (obj == null ? obj : obj[key]), dictionaries[lang]) ?? path,
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export const useI18n = () => useContext(I18nContext);
