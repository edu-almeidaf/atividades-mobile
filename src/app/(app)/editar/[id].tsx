import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { LoadingView } from '../../../components/LoadingView';
import { TransacaoForm } from '../../../components/TransacaoForm';
import { getTransacao, updateTransacao } from '../../../services/transacoes';
import { colors } from '../../../theme';
import type { Transacao, TransacaoInput } from '../../../types/Transacao';
import { showAlert } from '../../../utils/alert';
import { getErrorMessage } from '../../../utils/errors';
import { valorToInput } from '../../../utils/format';

export default function EditarTransacaoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [transacao, setTransacao] = useState<Transacao | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        setTransacao(await getTransacao(id));
      } catch (error) {
        showAlert('Erro ao carregar', getErrorMessage(error));
        router.back();
      }
    }

    carregar();
  }, [id]);

  async function handleUpdate(data: TransacaoInput) {
    await updateTransacao(id, data);
    router.back();
  }

  if (!transacao) {
    return <LoadingView message="Carregando transação..." />;
  }

  return (
    <View style={styles.container}>
      <TransacaoForm
        initialValues={{
          descricao: transacao.descricao,
          valor: valorToInput(transacao.valor),
          tipo: transacao.tipo,
        }}
        submitLabel="Salvar alterações"
        onSubmit={handleUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
