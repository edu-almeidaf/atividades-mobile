import { SafeAreaProvider } from 'react-native-safe-area-context';

import ThemeContextProvider from './src/contexts/ThemeContext';
import { RegisterScreen } from './src/screens/RegisterScreen';

export default function App() {
  return (
    <ThemeContextProvider>
      <SafeAreaProvider>
        <RegisterScreen />
      </SafeAreaProvider>
    </ThemeContextProvider>
  );
}
