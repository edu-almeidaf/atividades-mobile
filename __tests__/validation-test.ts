import { hasErrors, isValidEmail, validateLogin, validateTransacao } from '../src/utils/validation';

describe('isValidEmail', () => {
  it('aceita e-mails válidos e recusa inválidos', () => {
    expect(isValidEmail('teste@teste.com')).toBe(true);
    expect(isValidEmail('teste@teste')).toBe(false);
    expect(isValidEmail('teste.com')).toBe(false);
  });
});

describe('validateLogin', () => {
  it('não retorna erros com dados válidos', () => {
    const errors = validateLogin('teste@teste.com', '12345678');
    expect(hasErrors(errors)).toBe(false);
  });

  it('exige e-mail e senha', () => {
    expect(validateLogin('', '')).toEqual({
      email: 'Informe o e-mail.',
      password: 'Informe a senha.',
    });
  });

  it('valida formato do e-mail e tamanho da senha', () => {
    expect(validateLogin('email-invalido', '123')).toEqual({
      email: 'E-mail inválido.',
      password: 'A senha deve ter no mínimo 8 caracteres.',
    });
  });
});

describe('validateTransacao', () => {
  it('não retorna erros com dados válidos', () => {
    const errors = validateTransacao({ descricao: 'Mercado', valor: '150,90', tipo: 'saida' });
    expect(hasErrors(errors)).toBe(false);
  });

  it('exige todos os campos', () => {
    expect(validateTransacao({ descricao: '  ', valor: '', tipo: null })).toEqual({
      descricao: 'Informe a descrição.',
      valor: 'Informe o valor.',
      tipo: 'Escolha entrada ou saída.',
    });
  });

  it('recusa valor inválido ou zerado', () => {
    expect(validateTransacao({ descricao: 'X', valor: 'abc', tipo: 'entrada' }).valor).toBe(
      'Valor inválido. Ex: 49,90',
    );
    expect(validateTransacao({ descricao: 'X', valor: '0', tipo: 'entrada' }).valor).toBe(
      'O valor deve ser maior que zero.',
    );
  });
});
