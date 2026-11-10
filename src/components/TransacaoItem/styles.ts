import { StyleSheet } from 'react-native';

import { colors, radius, spacing } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderLeftWidth: 4,
    paddingVertical: 12,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    marginHorizontal: spacing.md,
  },
  borderEntrada: {
    borderLeftColor: colors.entrada,
  },
  borderSaida: {
    borderLeftColor: colors.saida,
  },
  info: {
    flex: 1,
    marginRight: spacing.sm,
  },
  descricao: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  data: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  valor: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  valorEntrada: {
    color: colors.entrada,
  },
  valorSaida: {
    color: colors.saida,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 72,
    marginLeft: spacing.xs,
  },
  actionButton: {
    padding: spacing.sm,
  },
  editText: {
    fontSize: 18,
    color: colors.primary,
  },
  deleteText: {
    fontSize: 16,
  },
});
