/**
 * Common styles shared across calculator screens
 * Eliminates style duplication
 */

import { StyleSheet } from 'react-native';
import { spacing, touchTargets } from './spacing';

/**
 * Calculator screen styles
 * Use these instead of creating duplicate StyleSheets
 */
export const calculatorStyles = StyleSheet.create({
  card: {
    marginBottom: spacing.base,
  },
  resultCard: {
    marginBottom: spacing.base,
    backgroundColor: '#F5F5F0', // Light beige for results
  },
  sectionTitle: {
    marginBottom: spacing.base,
    fontWeight: '600',
  },
  input: {
    marginBottom: spacing.md,
    minHeight: touchTargets.minimum,
  },
  label: {
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  segmentedButtons: {
    marginBottom: spacing.md,
    minHeight: touchTargets.minimum,
  },
  helperText: {
    opacity: 0.6,
    fontStyle: 'italic',
    marginTop: spacing.xs,
  },
  resultTitle: {
    fontWeight: 'bold',
    marginBottom: spacing.base,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    minHeight: touchTargets.minimum,
  },
  resultValue: {
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: spacing.md,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#8B4513', // Primary woodworking color
  },
});

