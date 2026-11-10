import { fireEvent, render, screen } from '@testing-library/react-native';

import { FormButton } from '../src/components/FormButton';

describe('<FormButton />', () => {
  it('mostra o título e chama onPress ao ser tocado', async () => {
    const onPress = jest.fn();
    await render(<FormButton title="Salvar" onPress={onPress} />);

    await fireEvent.press(screen.getByText('Salvar'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('mostra o ActivityIndicator e bloqueia o toque enquanto carrega', async () => {
    const onPress = jest.fn();
    await render(<FormButton title="Salvar" loading onPress={onPress} />);

    expect(screen.getByTestId('button-loading')).toBeOnTheScreen();
    expect(screen.queryByText('Salvar')).not.toBeOnTheScreen();

    await fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('não chama onPress quando desabilitado', async () => {
    const onPress = jest.fn();
    await render(<FormButton title="Salvar" disabled onPress={onPress} />);

    await fireEvent.press(screen.getByText('Salvar'));

    expect(onPress).not.toHaveBeenCalled();
  });
});
