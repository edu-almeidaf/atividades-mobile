import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { Motorcycle } from '../../types/motorcycle';
import { colors, getCategoryColor, spacing } from '../../theme';

interface MotorcycleItemProps {
  motorcycle: Motorcycle;
}

export const MotorcycleItem = memo(function MotorcycleItem({ motorcycle }: MotorcycleItemProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.accent, { backgroundColor: getCategoryColor(motorcycle.category) }]} />

      <View style={styles.info}>
        <Text style={styles.model} numberOfLines={1}>
          {motorcycle.model}
        </Text>
        <Text style={styles.brand}>{motorcycle.brand}</Text>
      </View>

      <View style={styles.yearChip}>
        <Text style={styles.yearText}>{motorcycle.year}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.md,
    paddingRight: spacing.md,
    borderRadius: 10,
    overflow: 'hidden',
  },
  accent: {
    alignSelf: 'stretch',
    width: 4,
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
    paddingVertical: spacing.md - 4,
  },
  model: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  brand: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 2,
  },
  yearChip: {
    backgroundColor: colors.chip,
    borderRadius: 12,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm + 2,
    marginLeft: spacing.sm,
  },
  yearText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text,
  },
});
