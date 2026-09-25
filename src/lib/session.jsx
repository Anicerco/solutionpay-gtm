import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { trackEvent } from './singular';
import { readSession, toUserId, writeSession } from './identity';

// Sesión de "home banking" del demo. Antes del login el usuario es anónimo
// (Singular lo identifica por su device id web). Al loguearse se le asigna un
// user_id que GTM pasa a singularSdk.login() y que persiste hasta el logout.
const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [user, setUser] = useState(readSession);

  const login = useCallback((username, { isNew = false, name } = {}) => {
    const next = { userId: toUserId(username), name: name || username };
    // Primero se guarda la sesión, así todos los eventos siguientes ya llevan user_id
    writeSession(next);
    setUser(next);
    if (isNew) trackEvent('sign_up', { method: 'web' });
    trackEvent('login', { method: 'web' });
    return next;
  }, []);

  const logout = useCallback(() => {
    trackEvent('logout');
    writeSession(null);
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export const useSession = () => useContext(SessionContext);
