import { fireEvent, render, screen } from '@testing-library/react-native';

import { FormInput } from '../src/components/FormInput';

describe('<FormInput />', () => {
  it('mostra o label e repassa o texto digitado', async () => {
    const onChangeText = jest.fn();
    await render(<FormInput label="E-mail" placeholder="seu@email.com" onChangeText={onChangeText} />);

    expect(screen.getByText('E-mail')).toBeOnTheScreen();

    await fireEvent.changeText(screen.getByPlaceholderText('seu@email.com'), 'teste@teste.com');

    expect(onChangeText).toHaveBeenCalledWith('teste@teste.com');
  });

  it('mostra a mensagem de erro quando recebida', async () => {
    await render(<FormInput label="Senha" error="Informe a senha." />);

    expect(screen.getByText('Informe a senha.')).toBeOnTheScreen();
  });

  it('não mostra mensagem de erro sem a prop error', async () => {
    await render(<FormInput label="Senha" />);

    expect(screen.queryByText('Informe a senha.')).not.toBeOnTheScreen();
  });
});
