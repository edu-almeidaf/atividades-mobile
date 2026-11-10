import type { Transacao } from '../types/Transacao';

export function formatCurrency(value: number): string {
  const sign = value < 0 ? '-' : '';
  const [inteiro, decimal] = Math.abs(value).toFixed(2).split('.');
  const inteiroFormatado = inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${sign}R$ ${inteiroFormatado},${decimal}`;
}

export function parseValor(text: string): number {
  let normalizado = text.trim().replace(/^R\$\s*/, '');

  if (normalizado.includes(',')) {
    normalizado = normalizado.replace(/\./g, '').replace(',', '.');
  }

  if (!/^\d+(\.\d{1,2})?$/.test(normalizado)) {
    return NaN;
  }
  return Number(normalizado);
}

export function valorToInput(value: number): string {
  return value.toFixed(2).replace('.', ',');
}

export function formatDate(date: string): string {
  const [ano, mes, dia] = date.slice(0, 10).split('-');
  if (!ano || !mes || !dia) return '';
  return `${dia}/${mes}/${ano}`;
}

export interface Resumo {
  entradas: number;
  saidas: number;
  saldo: number;
}

export function calcularResumo(transacoes: Transacao[]): Resumo {
  let entradas = 0;
  let saidas = 0;

  for (const transacao of transacoes) {
    if (transacao.tipo === 'entrada') {
      entradas += transacao.valor;
    } else {
      saidas += transacao.valor;
    }
  }

  return { entradas, saidas, saldo: entradas - saidas };
}
