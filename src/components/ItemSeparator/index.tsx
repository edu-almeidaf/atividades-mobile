import { StyleSheet, View } from 'react-native';

import { spacing } from '../../theme';

export function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    height: spacing.sm,
  },
});
