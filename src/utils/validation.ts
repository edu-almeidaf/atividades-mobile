import type { TipoTransacao } from '../types/Transacao';
import { parseValor } from './format';

export type FormErrors<T extends string> = Partial<Record<T, string>>;

export function hasErrors(errors: FormErrors<string>): boolean {
  return Object.values(errors).some(Boolean);
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validateLogin(email: string, password: string): FormErrors<'email' | 'password'> {
  const errors: FormErrors<'email' | 'password'> = {};

  if (!email.trim()) {
    errors.email = 'Informe o e-mail.';
  } else if (!isValidEmail(email)) {
    errors.email = 'E-mail inválido.';
  }

  if (!password) {
    errors.password = 'Informe a senha.';
  } else if (password.length < 8) {
    errors.password = 'A senha deve ter no mínimo 8 caracteres.';
  }

  return errors;
}

export interface TransacaoFormValues {
  descricao: string;
  valor: string;
  tipo: TipoTransacao | null;
}

export function validateTransacao(
  values: TransacaoFormValues,
): FormErrors<'descricao' | 'valor' | 'tipo'> {
  const errors: FormErrors<'descricao' | 'valor' | 'tipo'> = {};

  const descricao = values.descricao.trim();
  if (!descricao) {
    errors.descricao = 'Informe a descrição.';
  } else if (descricao.length > 100) {
    errors.descricao = 'A descrição deve ter no máximo 100 caracteres.';
  }

  const valor = parseValor(values.valor);
  if (!values.valor.trim()) {
    errors.valor = 'Informe o valor.';
  } else if (Number.isNaN(valor)) {
    errors.valor = 'Valor inválido. Ex: 49,90';
  } else if (valor <= 0) {
    errors.valor = 'O valor deve ser maior que zero.';
  }

  if (!values.tipo) {
    errors.tipo = 'Escolha entrada ou saída.';
  }

  return errors;
}
