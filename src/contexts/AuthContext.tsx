import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { setAuthToken, setUnauthorizedHandler } from '../services/api';
import { loginRequest } from '../services/auth';
import { clearSession, loadSession, saveSession } from '../storage/session';
import type { User } from '../types/User';

export interface AuthContextProps {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(async () => {
    setAuthToken(null);
    setToken(null);
    setUser(null);
    await clearSession();
  }, []);

  useEffect(() => {
    async function restoreSession() {
      try {
        const session = await loadSession();
        if (session) {
          setAuthToken(session.token);
          setToken(session.token);
          setUser(session.user);
        }
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout();
    });
    return () => setUnauthorizedHandler(null);
  }, [logout]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await loginRequest(email, password);
    await saveSession({ token: response.token, user: response.record });
    setAuthToken(response.token);
    setUser(response.record);
    setToken(response.token);
  }, []);

  const authContext = useMemo<AuthContextProps>(
    () => ({ user, token, isLoading, login, logout }),
    [user, token, isLoading, login, logout],
  );

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthContextProvider!');
  }
  return context;
}
