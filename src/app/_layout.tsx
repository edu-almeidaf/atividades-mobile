import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import AuthContextProvider, { useAuth } from '../contexts/AuthContext';
import { LoadingView } from '../components/LoadingView';

function RootNavigator() {
  const { token, isLoading } = useAuth();

  // Enquanto lê o AsyncStorage, ainda não sabemos para qual fluxo ir
  if (isLoading) {
    return <LoadingView message="Restaurando sessão..." />;
  }

  const isLoggedIn = !!token;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Fluxo restrito: só com usuário autenticado */}
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>

      {/* Fluxo de autenticação: só sem usuário */}
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
