// localStorage wrappers for the auth state read/written by AuthContext.
// Centralizing the keys here means the rest of the app never has to
// know how the auth state is persisted.

const KEYS = {
  token: "token",
  user: "user",
  isLoggedIn: "isLoggedIn",
  isAdmin: "isAdmin",
};

export function readAuthState() {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(KEYS.token);
  const user = JSON.parse(localStorage.getItem(KEYS.user) || "null");
  const isLoggedIn = localStorage.getItem(KEYS.isLoggedIn) === "true";
  const isAdmin = localStorage.getItem(KEYS.isAdmin) === "true";
  if (!isLoggedIn || !token || !user) return null;
  return { token, user, isAdmin };
}

export function writeAuthState({ token, user, isAdmin }) {
  localStorage.setItem(KEYS.isLoggedIn, "true");
  localStorage.setItem(KEYS.token, token);
  localStorage.setItem(KEYS.user, JSON.stringify(user));
  localStorage.setItem(KEYS.isAdmin, String(isAdmin));
}

export function clearAuthState() {
  localStorage.removeItem(KEYS.token);
  localStorage.removeItem(KEYS.user);
  localStorage.removeItem(KEYS.isAdmin);
  localStorage.setItem(KEYS.isLoggedIn, "false");
}
