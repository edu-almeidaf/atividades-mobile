import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyList } from '../../components/EmptyList';
import { FormButton } from '../../components/FormButton';
import { LoadingView } from '../../components/LoadingView';
import { SaldoCard } from '../../components/SaldoCard';
import { TransacaoItem } from '../../components/TransacaoItem';
import { deleteTransacao, getTransacoes } from '../../services/transacoes';
import { colors, spacing } from '../../theme';
import type { Transacao } from '../../types/Transacao';
import { confirmAction, showAlert } from '../../utils/alert';
import { getErrorMessage } from '../../utils/errors';
import { calcularResumo } from '../../utils/format';

export default function TransacoesScreen() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const carregarTransacoes = useCallback(async () => {
    try {
      const data = await getTransacoes();
      setTransacoes(data);
    } catch (error) {
      showAlert('Erro ao carregar', getErrorMessage(error));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarTransacoes();
    }, [carregarTransacoes]),
  );

  const handleRefresh = () => {
    setRefreshing(true);
    carregarTransacoes();
  };

  const handleEdit = useCallback((transacao: Transacao) => {
    router.push({ pathname: '/editar/[id]', params: { id: transacao.id } });
  }, []);

  const handleDelete = useCallback(async (transacao: Transacao) => {
    const confirmed = await confirmAction('Excluir transação', `Deseja excluir "${transacao.descricao}"?`, 'Excluir');
    if (!confirmed) return;

    setDeletingId(transacao.id);
    try {
      await deleteTransacao(transacao.id);
      setTransacoes((current) => current.filter((item) => item.id !== transacao.id));
    } catch (error) {
      showAlert('Erro ao excluir', getErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  }, []);

  const resumo = useMemo(() => calcularResumo(transacoes), [transacoes]);

  if (loading) {
    return <LoadingView message="Buscando transações..." />;
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <FlatList
        data={transacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransacaoItem
            transacao={item}
            deleting={deletingId === item.id}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        ListHeaderComponent={<SaldoCard resumo={resumo} />}
        ListEmptyComponent={
          <EmptyList title="Nenhuma transação" message="Toque em “Nova transação” para registrar a primeira." />
        }
        ItemSeparatorComponent={Separator}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <FormButton title="+ Nova transação" onPress={() => router.push('/nova')} />
      </View>
    </SafeAreaView>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingBottom: spacing.md,
  },
  separator: {
    height: spacing.sm,
  },
  footer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
});
