import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import { TransacaoForm } from '../../components/TransacaoForm';
import { useAuth } from '../../contexts/AuthContext';
import { createTransacao } from '../../services/transacoes';
import { colors } from '../../theme';
import type { TransacaoInput } from '../../types/Transacao';

export default function NovaTransacaoScreen() {
  const { user } = useAuth();

  async function handleCreate(data: TransacaoInput) {
    if (!user) return;
    await createTransacao(data, user.id);
    router.back();
  }

  return (
    <View style={styles.container}>
      <TransacaoForm submitLabel="Salvar transação" onSubmit={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
