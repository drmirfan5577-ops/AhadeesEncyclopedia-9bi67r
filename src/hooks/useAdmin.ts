import { useState, useCallback } from 'react';

const ADMIN_KEY = 'ahadees_admin_session_v1';
const ADMIN_PASSWORD = 'DrIrfan@5577'; // Change this to your preferred password

export function useAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      const session = localStorage.getItem(ADMIN_KEY);
      if (session) {
        const { token, expiry } = JSON.parse(session);
        if (token === btoa(ADMIN_PASSWORD) && Date.now() < expiry) return true;
      }
    } catch { /* ignore */ }
    return false;
  });

  const [loginError, setLoginError] = useState('');

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      const session = {
        token: btoa(ADMIN_PASSWORD),
        expiry: Date.now() + 3600000 * 8, // 8 hours
      };
      localStorage.setItem(ADMIN_KEY, JSON.stringify(session));
      setIsAuthenticated(true);
      setLoginError('');
      return true;
    }
    setLoginError('Invalid password • غلط پاسورڈ');
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(ADMIN_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout, loginError };
}
