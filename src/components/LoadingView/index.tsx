import { ActivityIndicator, Text, View } from 'react-native';

import { colors } from '../../theme';
import { styles } from './styles';

interface LoadingViewProps {
  message?: string;
}

export function LoadingView({ message = 'Carregando...' }: LoadingViewProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
