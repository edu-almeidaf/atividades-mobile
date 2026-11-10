import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { setAuthToken, setUnauthorizedHandler } from '../services/api';
import { loginRequest } from '../services/auth';
import { clearSession, loadSession, saveSession } from '../storage/session';
import type { User } from '../types/User';

// 1. Shared Props
export interface AuthContextProps {
  user: User | null;
  token: string | null;
  isLoading: boolean; // true enquanto a sessão salva está sendo restaurada
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// 2. createContext
export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// 3. Provider
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

  // Ao abrir o app, recupera o token salvo e vai direto para a área restrita
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

  // Token expirado/inválido (401) -> volta para o login
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

// 4. Consumer Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthContextProvider!');
  }
  return context;
}
