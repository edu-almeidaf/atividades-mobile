import { Alert, Platform } from 'react-native';

// No Expo Web o Alert.alert não funciona, então usamos o alert/confirm do navegador
const browser = globalThis as unknown as {
  alert: (message: string) => void;
  confirm: (message: string) => boolean;
};

export function showAlert(title: string, message: string) {
  if (Platform.OS === 'web') {
    browser.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
}

export function confirmAction(title: string, message: string, confirmText = 'Confirmar'): Promise<boolean> {
  if (Platform.OS === 'web') {
    return Promise.resolve(browser.confirm(`${title}\n\n${message}`));
  }

  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => resolve(false) },
        { text: confirmText, style: 'destructive', onPress: () => resolve(true) },
      ],
      { cancelable: true, onDismiss: () => resolve(false) },
    );
  });
}
