import axios from 'axios';
import { Platform } from 'react-native';

// Emulador Android acessa o PC por 10.0.2.2; web e iOS por localhost.
// Celular físico: defina EXPO_PUBLIC_API_URL=http://<IP-do-PC>:8090 no arquivo .env
const DEFAULT_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8090' : 'http://localhost:8090';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? DEFAULT_URL,
  timeout: 10000,
});

let authToken: string | null = null;
let onUnauthorized: (() => void) | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

// O AuthContext registra aqui o que fazer quando o token expira (logout)
export function setUnauthorizedHandler(handler: (() => void) | null) {
  onUnauthorized = handler;
}

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401 && authToken) {
      onUnauthorized?.();
    }
    return Promise.reject(error);
  },
);
