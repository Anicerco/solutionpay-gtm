// Sesión web persistida en localStorage (misma clave que lee la variable de GTM
// "JS - Solution Pay user_id" para setear el Custom User ID en el init).
// Guarda solo nombre y user_id, nunca la clave.
export const SESSION_KEY = 'solutionpay.session';

export function readSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

export function writeSession(value) {
  try {
    if (value) localStorage.setItem(SESSION_KEY, JSON.stringify(value));
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    // sin storage: la sesión dura hasta recargar
  }
}

export function currentUserId() {
  return readSession()?.userId || null;
}

// ID estable y opaco a partir del usuario (no es PII), usado como Custom User ID
// en la web y enviado a la app en el passthrough del Singular Link.
export function toUserId(username) {
  let h = 0;
  for (const c of username.trim().toLowerCase()) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `sp_${h.toString(16)}`;
}
