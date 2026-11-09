import { StyleSheet, Text } from 'react-native';

import { colors, spacing } from '../../theme';

interface SectionFooterProps {
  total: number;
}

export function SectionFooter({ total }: SectionFooterProps) {
  return (
    <Text style={styles.text}>
      Total: {total} {total === 1 ? 'motocicleta' : 'motocicletas'}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
});
