import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { Platform } from 'react-native';
import { Colors } from './colors';
import { fontFamilies } from './typography';

// Configure custom fonts for React Native Paper
const configureFonts = () => ({
  displayLarge: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '700' as const,
    letterSpacing: 0,
  },
  displayMedium: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '700' as const,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: fontFamilies.heading.bold,
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '700' as const,
    letterSpacing: 0,
  },
  headlineLarge: {
    fontFamily: fontFamilies.heading.semiBold,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: fontFamilies.heading.semiBold,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: fontFamilies.heading.semiBold,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600' as const,
    letterSpacing: 0,
  },
  titleLarge: {
    fontFamily: fontFamilies.heading.medium,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '500' as const,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: fontFamilies.heading.medium,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500' as const,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontFamily: fontFamilies.heading.medium,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
  },
  bodyLarge: {
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const,
    letterSpacing: 0.15,
  },
  bodyMedium: {
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const,
    letterSpacing: 0.4,
  },
  labelLarge: {
    fontFamily: fontFamilies.heading.medium,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: fontFamilies.heading.medium,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: fontFamilies.heading.medium,
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500' as const,
    letterSpacing: 0.5,
  },
  default: {
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto', default: 'System' }),
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const,
    letterSpacing: 0.25,
  },
});

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  fonts: configureFonts(),
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.light.primary,
    primaryContainer: Colors.light.primaryContainer,
    onPrimary: Colors.light.onPrimary,
    onPrimaryContainer: Colors.light.onPrimaryContainer,
    
    secondary: Colors.light.secondary,
    secondaryContainer: Colors.light.secondaryContainer,
    onSecondary: Colors.light.onSecondary,
    onSecondaryContainer: Colors.light.onSecondaryContainer,
    
    tertiary: Colors.light.tertiary,
    tertiaryContainer: Colors.light.tertiaryContainer,
    onTertiary: Colors.light.onTertiary,
    onTertiaryContainer: Colors.light.onTertiaryContainer,
    
    background: Colors.light.background,
    surface: Colors.light.surface,
    surfaceVariant: Colors.light.surfaceVariant,
    onBackground: Colors.light.onBackground,
    onSurface: Colors.light.onSurface,
    onSurfaceVariant: Colors.light.onSurfaceVariant,
    
    outline: Colors.light.outline,
    outlineVariant: Colors.light.outlineVariant,
    
    error: Colors.light.error,
    onError: Colors.light.onError,
    
    elevation: {
      level0: Colors.light.elevation.level0,
      level1: Colors.light.elevation.level1,
      level2: Colors.light.elevation.level2,
      level3: Colors.light.elevation.level3,
      level4: Colors.light.elevation.level4,
      level5: Colors.light.elevation.level5,
    },
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  fonts: configureFonts(),
  colors: {
    ...MD3DarkTheme.colors,
    primary: Colors.dark.primary,
    primaryContainer: Colors.dark.primaryContainer,
    onPrimary: Colors.dark.onPrimary,
    onPrimaryContainer: Colors.dark.onPrimaryContainer,
    
    secondary: Colors.dark.secondary,
    secondaryContainer: Colors.dark.secondaryContainer,
    onSecondary: Colors.dark.onSecondary,
    onSecondaryContainer: Colors.dark.onSecondaryContainer,
    
    tertiary: Colors.dark.tertiary,
    tertiaryContainer: Colors.dark.tertiaryContainer,
    onTertiary: Colors.dark.onTertiary,
    onTertiaryContainer: Colors.dark.onTertiaryContainer,
    
    background: Colors.dark.background,
    surface: Colors.dark.surface,
    surfaceVariant: Colors.dark.surfaceVariant,
    onBackground: Colors.dark.onBackground,
    onSurface: Colors.dark.onSurface,
    onSurfaceVariant: Colors.dark.onSurfaceVariant,
    
    outline: Colors.dark.outline,
    outlineVariant: Colors.dark.outlineVariant,
    
    error: Colors.dark.error,
    onError: Colors.dark.onError,
    
    elevation: {
      level0: Colors.dark.elevation.level0,
      level1: Colors.dark.elevation.level1,
      level2: Colors.dark.elevation.level2,
      level3: Colors.dark.elevation.level3,
      level4: Colors.dark.elevation.level4,
      level5: Colors.dark.elevation.level5,
    },
  },
};

