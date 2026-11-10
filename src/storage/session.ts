import AsyncStorage from '@react-native-async-storage/async-storage';

import type { User } from '../types/User';

const TOKEN_KEY = '@minhas-financas:token';
const USER_KEY = '@minhas-financas:user';

export interface Session {
  token: string;
  user: User;
}

export async function saveSession({ token, user }: Session): Promise<void> {
  await AsyncStorage.multiSet([
    [TOKEN_KEY, token],
    [USER_KEY, JSON.stringify(user)],
  ]);
}

export async function loadSession(): Promise<Session | null> {
  const [[, token], [, userJson]] = await AsyncStorage.multiGet([TOKEN_KEY, USER_KEY]);
  if (!token || !userJson) return null;

  try {
    return { token, user: JSON.parse(userJson) as User };
  } catch {
    return null;
  }
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
}
