import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import AuthContextProvider, { useAuth } from '../contexts/AuthContext';
import { LoadingView } from '../components/LoadingView';

function RootNavigator() {
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

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <StatusBar style="auto" />
      <RootNavigator />
    </AuthContextProvider>
  );
}
