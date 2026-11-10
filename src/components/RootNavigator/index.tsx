import { Stack } from 'expo-router';

import { useAuth } from '../../contexts/AuthContext';
import { LoadingView } from '../LoadingView';

export function RootNavigator() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingView message="Restaurando sessão..." />;
  }

  const isLoggedIn = !!token;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="login" />
      </Stack.Protected>
    </Stack>
  );
}
