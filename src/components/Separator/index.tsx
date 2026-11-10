import { View } from 'react-native';

import { spacing } from '../../theme';
import { styles } from './styles';

interface SeparatorProps {
  size?: keyof typeof spacing;
}

export function Separator({ size = 'sm' }: SeparatorProps) {
  return <View style={[styles.separator, { height: spacing[size] }]} />;
}
