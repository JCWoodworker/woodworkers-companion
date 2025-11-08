/**
 * Reusable style patterns for The Woodworker's Companion
 * Common component styles for consistency across the app
 */

import { StyleSheet, Platform } from 'react-native';
import { spacing, borderRadius, elevations, screenPadding, cardSpacing } from './spacing';

/**
 * Common card styles
 */
export const cardStyles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg,
    padding: cardSpacing.padding,
    marginBottom: cardSpacing.gap,
  },
  elevated: {
    borderRadius: borderRadius.lg,
    padding: cardSpacing.padding,
    marginBottom: cardSpacing.gap,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: elevations.md,
      },
    }),
  },
  pressed: {
    opacity: 0.95,
    transform: [{ scale: 0.98 }],
  },
});

/**
 * Screen container styles
 */
export const containerStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  scrollContent: {
    padding: screenPadding.horizontal,
    paddingTop: screenPadding.top,
    paddingBottom: screenPadding.bottom,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: screenPadding.horizontal,
  },
});

/**
 * Layout patterns
 */
export const layoutStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  spacedColumn: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  spacedRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});

/**
 * Input field styles
 */
export const inputStyles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  helperText: {
    marginTop: spacing.xs,
    opacity: 0.6,
    fontStyle: 'italic',
  },
  errorText: {
    marginTop: spacing.xs,
  },
});

/**
 * Button styles
 */
export const buttonStyles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  group: {
    gap: spacing.md,
  },
});

/**
 * Section/Divider styles
 */
export const sectionStyles = StyleSheet.create({
  header: {
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
    opacity: 0.12,
  },
});

/**
 * Shadow/Elevation presets
 */
export const shadowStyles = {
  sm: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
    },
    android: {
      elevation: elevations.sm,
    },
    default: {},
  }),
  md: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    android: {
      elevation: elevations.md,
    },
    default: {},
  }),
  lg: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
    },
    android: {
      elevation: elevations.lg,
    },
    default: {},
  }),
  xl: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
    },
    android: {
      elevation: elevations.xl,
    },
    default: {},
  }),
};

/**
 * Result card styles (for calculator results)
 */
export const resultCardStyles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    padding: spacing.base,
    marginBottom: spacing.base,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  divider: {
    height: 1,
    marginVertical: spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
});

