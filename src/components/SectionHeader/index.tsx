import { StyleSheet, Text, View } from 'react-native';

import { colors, getCategoryColor, spacing } from '../../theme';

interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, { borderLeftColor: getCategoryColor(title) }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  container: {
    backgroundColor: colors.header,
    borderLeftWidth: 6,
    borderRadius: 8,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.headerText,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
