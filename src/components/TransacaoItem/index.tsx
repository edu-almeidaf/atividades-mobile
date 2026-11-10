import { memo } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

import { colors } from '../../theme';
import type { Transacao } from '../../types/Transacao';
import { formatCurrency, formatDate } from '../../utils/format';
import { styles } from './styles';

interface TransacaoItemProps {
  transacao: Transacao;
  deleting: boolean;
  onEdit: (transacao: Transacao) => void;
  onDelete: (transacao: Transacao) => void;
}

export const TransacaoItem = memo(function TransacaoItem({ transacao, deleting, onEdit, onDelete }: TransacaoItemProps) {
  const isEntrada = transacao.tipo === 'entrada';

  return (
    <View style={[styles.container, isEntrada ? styles.borderEntrada : styles.borderSaida]}>
      <Pressable style={styles.info} onPress={() => onEdit(transacao)} disabled={deleting}>
        <Text style={styles.descricao} numberOfLines={1}>
          {transacao.descricao}
        </Text>
        <Text style={styles.data}>{formatDate(transacao.created)}</Text>
      </Pressable>

      <Text style={[styles.valor, isEntrada ? styles.valorEntrada : styles.valorSaida]}>
        {isEntrada ? '+ ' : '- '}
        {formatCurrency(transacao.valor)}
      </Text>

      <View style={styles.actions}>
        {deleting ? (
          <ActivityIndicator color={colors.danger} />
        ) : (
          <>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Editar ${transacao.descricao}`}
              onPress={() => onEdit(transacao)}
              style={styles.actionButton}
            >
              <Text style={styles.editText}>✎</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Excluir ${transacao.descricao}`}
              onPress={() => onDelete(transacao)}
              style={styles.actionButton}
            >
              <Text style={styles.deleteText}>🗑</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
});
