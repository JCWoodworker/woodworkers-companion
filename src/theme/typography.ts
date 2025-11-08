/**
 * Typography system for The Woodworker's Companion
 * Following Material Design 3 type scale with custom Inter font for headings
 */

export const fontFamilies = {
  // Inter for headings and UI elements
  heading: {
    regular: 'Inter_400Regular',
    medium: 'Inter_500Medium',
    semiBold: 'Inter_600SemiBold',
    bold: 'Inter_700Bold',
  },
  // System fonts for body text (better performance)
  body: {
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  },
};

export const fontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

/**
 * Typography scale following Material Design 3
 * Format: { fontSize, lineHeight, fontWeight }
 */
export const typography = {
  // Display - Large, impactful headlines (rarely used)
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies.heading.bold,
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies.heading.bold,
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: fontWeights.bold,
    fontFamily: fontFamilies.heading.bold,
  },

  // Headline - High-emphasis, shorter text
  headlineLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: fontWeights.semiBold,
    fontFamily: fontFamilies.heading.semiBold,
  },
  headlineMedium: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: fontWeights.semiBold,
    fontFamily: fontFamilies.heading.semiBold,
  },
  headlineSmall: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: fontWeights.semiBold,
    fontFamily: fontFamilies.heading.semiBold,
  },

  // Title - Medium-emphasis text
  titleLarge: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.heading.medium,
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.heading.medium,
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.heading.medium,
  },

  // Body - Main content text (uses system fonts for performance)
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: fontWeights.regular,
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeights.regular,
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeights.regular,
  },

  // Label - Buttons, form labels, captions
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.heading.medium,
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.heading.medium,
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.heading.medium,
  },
};

export type TypographyVariant = keyof typeof typography;

