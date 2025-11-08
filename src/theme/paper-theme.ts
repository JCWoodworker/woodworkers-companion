import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';
import { Colors } from './colors';

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
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

