import { Pressable, Text, View } from 'react-native';

import type { TipoTransacao } from '../../types/Transacao';
import { styles } from './styles';

interface TipoSelectorProps {
  value: TipoTransacao | null;
  onChange: (tipo: TipoTransacao) => void;
  error?: string;
}

const OPCOES: { tipo: TipoTransacao; label: string }[] = [
  { tipo: 'entrada', label: '↑ Entrada' },
  { tipo: 'saida', label: '↓ Saída' },
];

export function TipoSelector({ value, onChange, error }: TipoSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tipo</Text>

      <View style={styles.row}>
        {OPCOES.map(({ tipo, label }) => {
          const selected = value === tipo;
          return (
            <Pressable
              key={tipo}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              onPress={() => onChange(tipo)}
              style={[styles.option, selected && (tipo === 'entrada' ? styles.entradaSelected : styles.saidaSelected)]}
            >
              <Text style={[styles.optionText, selected && styles.optionTextSelected]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}
