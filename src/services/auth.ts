import type { AuthResponse } from '../types/User';
import { api } from './api';

export async function loginRequest(email: string, password: string): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/api/collections/users/auth-with-password', {
    identity: email.trim(),
    password,
  });
  return response.data;
}
