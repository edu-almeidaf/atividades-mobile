import { Text, View } from 'react-native';

import { styles } from './styles';

interface EmptyListProps {
  title: string;
  message: string;
}

export function EmptyList({ title, message }: EmptyListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📭</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
