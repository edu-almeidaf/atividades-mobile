import { Text, View } from 'react-native';

import type { Resumo } from '../../utils/format';
import { formatCurrency } from '../../utils/format';
import { styles } from './styles';

interface SaldoCardProps {
  resumo: Resumo;
}

export function SaldoCard({ resumo }: SaldoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>Saldo atual</Text>
      <Text style={[styles.saldo, resumo.saldo < 0 && styles.saldoNegativo]}>{formatCurrency(resumo.saldo)}</Text>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.smallLabel}>Entradas</Text>
          <Text style={styles.entradas}>{formatCurrency(resumo.entradas)}</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.smallLabel}>Saídas</Text>
          <Text style={styles.saidas}>{formatCurrency(resumo.saidas)}</Text>
        </View>
      </View>
    </View>
  );
}
