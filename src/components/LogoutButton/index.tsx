import { Pressable, Text } from 'react-native';

import { useAuth } from '../../contexts/AuthContext';
import { confirmAction } from '../../utils/alert';
import { styles } from './styles';

export function LogoutButton() {
  const { logout } = useAuth();

  async function handleLogout() {
    const confirmed = await confirmAction('Sair', 'Deseja realmente sair da sua conta?', 'Sair');
    if (confirmed) {
      await logout();
    }
  }

  return (
    <Pressable accessibilityRole="button" onPress={handleLogout} style={styles.button}>
      <Text style={styles.text}>Sair</Text>
    </Pressable>
  );
}
