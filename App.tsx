import { useState, useEffect } from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Image, 
  Switch, 
  StyleSheet 
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { FormInput } from './src/components/FormInput';
import { FormButton } from './src/components/FormButton';
import { LoadingScreen } from './src/components/LoadingScreen';

export default function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [lembrarMim, setLembrarMim] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    console.log("Sistema a carregar...");
    const timer = setTimeout(() => {
      setIsLoading(false);
      console.log("Sistema Carregado!");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const nomeValido = nome.trim().length > 3;
    const emailValido = email.includes('@');
    const senhaValida = senha.length >= 6;

    if (nomeValido && emailValido && senhaValida) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [nome, email, senha]);

  const handleSubmit = () => {
    const formData = { nome, email, senha, lembrarMim };
    console.log("[LOG] Registo Submetido com Sucesso: ", formData);
  };

  const nameValidation: boolean = nome.length > 0 && nome.length < 3
  const emailValidation: boolean = email.length > 0 && !email.includes('@')
  const passwordValidation: boolean = senha.length > 0 && senha.length < 6

  if (isLoading) return <LoadingScreen />;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          <View style={styles.header}>
            <Image 
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/584/584026.png' }} 
              style={styles.logo} 
            />
            <Text style={styles.title}>Minhas Finanças</Text>
            <Text style={styles.subtitle}>Crie a sua conta para gerir os seus gastos</Text>
          </View>

          <FormInput 
            label="Nome Completo"
            placeholder="Ex: Eduardo Fernandes"
            value={nome}
            onChangeText={setNome}
            error={nameValidation ? "O nome deve ter pelo menos 3 letras." : undefined}
          />

          <FormInput 
            label="E-mail"
            placeholder="Ex: eduardo@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            error={emailValidation ? "E-mail inválido." : undefined}
          />

          <FormInput 
            label="Senha"
            placeholder="Mínimo de 6 caracteres"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            error={passwordValidation ? "A senha deve ter no mínimo 6 caracteres." : undefined}
          />

          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Manter sessão iniciada</Text>
            <Switch 
              value={lembrarMim} 
              onValueChange={setLembrarMim} 
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={lembrarMim ? '#2E7D32' : '#f4f3f4'}
            />
          </View>

          <FormButton 
            title="Registar" 
            disabled={!isFormValid} 
            onPress={handleSubmit} 
          />

        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  }
});