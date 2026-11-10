import { isAxiosError } from 'axios';

export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) {
      return 'Não foi possível conectar ao servidor. Verifique sua conexão e se a API está no ar.';
    }

    const data = error.response.data as { message?: string } | undefined;
    if (error.response.status === 400 && error.config?.url?.includes('auth-with-password')) {
      return 'E-mail ou senha incorretos.';
    }
    if (data?.message) {
      return data.message;
    }
  }

  return 'Ocorreu um erro inesperado. Tente novamente.';
}
