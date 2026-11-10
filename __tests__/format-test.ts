import type { Transacao } from '../src/types/Transacao';
import { calcularResumo, formatCurrency, formatDate, parseValor, valorToInput } from '../src/utils/format';

describe('formatCurrency', () => {
  it('formata em reais com separador de milhar', () => {
    expect(formatCurrency(1234.5)).toBe('R$ 1.234,50');
    expect(formatCurrency(0)).toBe('R$ 0,00');
    expect(formatCurrency(1000000)).toBe('R$ 1.000.000,00');
  });

  it('mantém o sinal de valores negativos', () => {
    expect(formatCurrency(-49.9)).toBe('-R$ 49,90');
  });
});

describe('parseValor', () => {
  it('converte o texto digitado em número', () => {
    expect(parseValor('12')).toBe(12);
    expect(parseValor('12,5')).toBe(12.5);
    expect(parseValor('12.50')).toBe(12.5);
    expect(parseValor('1.234,56')).toBe(1234.56);
    expect(parseValor(' R$ 49,90 ')).toBe(49.9);
  });

  it('retorna NaN para textos inválidos', () => {
    expect(parseValor('')).toBeNaN();
    expect(parseValor('abc')).toBeNaN();
    expect(parseValor('12,345')).toBeNaN();
    expect(parseValor('-10')).toBeNaN();
  });
});

describe('valorToInput e formatDate', () => {
  it('prepara o valor para o campo de edição', () => {
    expect(valorToInput(12.5)).toBe('12,50');
  });

  it('converte a data do PocketBase para dd/mm/aaaa', () => {
    expect(formatDate('2026-11-09 14:30:00.000Z')).toBe('09/11/2026');
    expect(formatDate('')).toBe('');
  });
});

describe('calcularResumo', () => {
  const base = { user: 'u1', created: '', updated: '' };

  it('soma entradas, saídas e calcula o saldo', () => {
    const transacoes: Transacao[] = [
      { ...base, id: '1', descricao: 'Salário', valor: 3000, tipo: 'entrada' },
      { ...base, id: '2', descricao: 'Aluguel', valor: 1200, tipo: 'saida' },
      { ...base, id: '3', descricao: 'Mercado', valor: 450.5, tipo: 'saida' },
    ];

    expect(calcularResumo(transacoes)).toEqual({ entradas: 3000, saidas: 1650.5, saldo: 1349.5 });
  });

  it('retorna zeros para lista vazia', () => {
    expect(calcularResumo([])).toEqual({ entradas: 0, saidas: 0, saldo: 0 });
  });
});
