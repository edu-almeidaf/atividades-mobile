import { useState } from 'react';
import { ScrollView, View, Text, Switch, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormInput } from '../components/FormInput';
import { FormButton } from '../components/FormButton';
import { useTheme } from '../contexts/ThemeContext';
import { Colors } from '../theme/colors';

export function RegisterScreen() {
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const nomeInvalido = nome.length > 0 && nome.trim().length < 3;
  const emailInvalido = email.length > 0 && !email.includes('@');
  const senhaInvalida = senha.length > 0 && senha.length < 6;
  const isFormValid = nome.trim().length >= 3 && email.includes('@') && senha.length >= 6;

  const handleSubmit = () => {
    console.log('[LOG] Cadastro enviado:', { nome, email });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.themeRow}>
          <Text style={[styles.themeLabel, { color: colors.text }]}>
            {theme === 'dark' ? '🌙 Tema escuro' : '☀️ Tema claro'}
          </Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: colors.primaryDisabled }}
            thumbColor={theme === 'dark' ? colors.primary : '#F4F3F4'}
          />
        </View>

        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.primary }]}>Minhas Finanças</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            Crie a sua conta para gerir os seus gastos
          </Text>
        </View>

        <FormInput
          label="Nome Completo"
          placeholder="Ex: Eduardo Fernandes"
          value={nome}
          onChangeText={setNome}
          error={nomeInvalido ? 'O nome deve ter pelo menos 3 letras.' : undefined}
        />

        <FormInput
          label="E-mail"
          placeholder="Ex: eduardo@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          error={emailInvalido ? 'E-mail inválido.' : undefined}
        />

        <FormInput
          label="Senha"
          placeholder="Mínimo de 6 caracteres"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
          error={senhaInvalida ? 'A senha deve ter no mínimo 6 caracteres.' : undefined}
        />

        <FormButton title="Cadastrar" disabled={!isFormValid} onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  themeLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
});
