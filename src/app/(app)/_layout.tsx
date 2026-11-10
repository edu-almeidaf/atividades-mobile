import { Stack } from 'expo-router';

import { LogoutButton } from '../../components/LogoutButton';
import { colors } from '../../theme';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Minhas Finanças', headerRight: () => <LogoutButton /> }} />
      <Stack.Screen name="nova" options={{ title: 'Nova transação' }} />
      <Stack.Screen name="editar/[id]" options={{ title: 'Editar transação' }} />
    </Stack>
  );
}
