export interface User {
  id: string;
  email: string;
  name?: string;
}

// Resposta de POST /api/collections/users/auth-with-password
export interface AuthResponse {
  token: string;
  record: User;
}
