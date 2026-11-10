import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormButton } from '../components/FormButton';
import { FormInput } from '../components/FormInput';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing } from '../theme';
import { showAlert } from '../utils/alert';
import { getErrorMessage } from '../utils/errors';
import { FormErrors, hasErrors, validateLogin } from '../utils/validation';

export default function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors<'email' | 'password'>>({});
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    const validationErrors = validateLogin(email, password);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      showAlert('Erro ao entrar', getErrorMessage(error));
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Text style={styles.logo}>💰</Text>
            <Text style={styles.title}>Minhas Finanças</Text>
            <Text style={styles.subtitle}>Entre para gerenciar suas transações</Text>
          </View>

          <FormInput
            label="E-mail"
            placeholder="seu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

          <FormInput
            label="Senha"
            placeholder="Mínimo de 8 caracteres"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={errors.password}
            onSubmitEditing={handleLogin}
          />

          <FormButton title="Entrar" loading={loading} onPress={handleLogin} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logo: {
    fontSize: 56,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});
