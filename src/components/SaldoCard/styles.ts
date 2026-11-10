import { StyleSheet } from 'react-native';

import { colors, radius, spacing } from '../../theme';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.lg,
    margin: spacing.md,
  },
  label: {
    fontSize: 14,
    color: colors.primaryLight,
  },
  saldo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: spacing.xs,
  },
  saldoNegativo: {
    color: colors.saidaLight,
  },
  row: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  column: {
    flex: 1,
  },
  smallLabel: {
    fontSize: 12,
    color: colors.primaryLight,
  },
  entradas: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  saidas: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.saidaLight,
  },
});
