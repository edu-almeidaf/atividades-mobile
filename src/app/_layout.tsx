import { StatusBar } from 'expo-status-bar';

import AuthContextProvider from '../contexts/AuthContext';
import { RootNavigator } from '../components/RootNavigator';

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <StatusBar style="auto" />
      <RootNavigator />
    </AuthContextProvider>
  );
}
