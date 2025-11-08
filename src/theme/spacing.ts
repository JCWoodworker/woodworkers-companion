/**
 * Spacing and sizing system for The Woodworker's Companion
 * Based on 4px base unit (iOS/Android standard)
 */

/**
 * Spacing scale
 * All values in pixels
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
  '5xl': 80,
  '6xl': 96,
};

/**
 * Border radius scale
 */
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

/**
 * Icon sizes
 */
export const iconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  base: 24,
  lg: 32,
  xl: 40,
  '2xl': 48,
  '3xl': 64,
};

/**
 * Touch target sizes
 * WCAG AA requires minimum 44x44px for touch targets
 */
export const touchTargets = {
  minimum: 44, // WCAG AA minimum
  comfortable: 48, // Recommended for better UX
  large: 56, // For primary actions
};

/**
 * Screen padding
 * Consistent padding for screen edges
 */
export const screenPadding = {
  horizontal: spacing.base, // 16px
  vertical: spacing.base, // 16px
  top: spacing.lg, // 24px for header spacing
  bottom: spacing.xl, // 32px for bottom safe area
};

/**
 * Card spacing
 */
export const cardSpacing = {
  padding: spacing.base, // 16px internal padding
  gap: spacing.md, // 12px between cards
};

/**
 * Input field sizing
 */
export const inputSizes = {
  small: {
    height: 40,
    fontSize: 14,
    paddingHorizontal: spacing.md,
  },
  medium: {
    height: 48,
    fontSize: 16,
    paddingHorizontal: spacing.base,
  },
  large: {
    height: 56,
    fontSize: 18,
    paddingHorizontal: spacing.lg,
  },
};

/**
 * Button sizing
 */
export const buttonSizes = {
  small: {
    height: 36,
    paddingHorizontal: spacing.base,
    fontSize: 14,
  },
  medium: {
    height: 44, // Meets WCAG minimum
    paddingHorizontal: spacing.lg,
    fontSize: 16,
  },
  large: {
    height: 52,
    paddingHorizontal: spacing.xl,
    fontSize: 18,
  },
};

/**
 * Elevation/Shadow levels
 */
export const elevations = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
  '2xl': 16,
};

