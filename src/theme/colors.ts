/**
 * Color palette for The Woodworker's Companion
 * Inspired by woodworking materials and tools
 */

export const Colors = {
  light: {
    // Primary colors - warm wood tones
    primary: '#8B4513', // Saddle Brown (walnut/mahogany)
    primaryContainer: '#D2691E', // Chocolate (lighter wood)
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#2C1810',

    // Secondary colors - tool metal tones
    secondary: '#5D5D5D', // Steel gray
    secondaryContainer: '#9E9E9E',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#1C1C1C',

    // Tertiary colors - natural accents
    tertiary: '#CD853F', // Peru (lighter wood accent)
    tertiaryContainer: '#DEB887',
    onTertiary: '#FFFFFF',
    onTertiaryContainer: '#3E2723',

    // Background and surfaces
    background: '#FAFAF5', // Off-white (workshop lighting)
    surface: '#FFFFFF',
    surfaceVariant: '#F5F5F0',
    onBackground: '#1C1B1F',
    onSurface: '#1C1B1F',
    onSurfaceVariant: '#49454F',

    // Borders and outlines
    outline: '#79747E',
    outlineVariant: '#CAC4D0',

    // Semantic colors
    error: '#B00020',
    onError: '#FFFFFF',
    success: '#2E7D32',
    onSuccess: '#FFFFFF',
    warning: '#F57C00',
    onWarning: '#FFFFFF',

    // Elevation and shadows
    elevation: {
      level0: 'transparent',
      level1: '#F5F5F5',
      level2: '#EEEEEE',
      level3: '#E0E0E0',
      level4: '#BDBDBD',
      level5: '#9E9E9E',
    },

    // Text
    text: '#1C1B1F',
    textSecondary: '#49454F',
    textDisabled: '#9E9E9E',

    // Special UI elements
    tint: '#8B4513',
    icon: '#5D5D5D',
    tabIconDefault: '#9E9E9E',
    tabIconSelected: '#8B4513',
  },
  dark: {
    // Primary colors - warm wood tones
    primary: '#D2691E', // Lighter wood for dark mode
    primaryContainer: '#6B3410',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#FFE4D0',

    // Secondary colors - tool metal tones
    secondary: '#B0B0B0', // Light steel
    secondaryContainer: '#424242',
    onSecondary: '#000000',
    onSecondaryContainer: '#E0E0E0',

    // Tertiary colors - natural accents
    tertiary: '#DEB887', // Burlywood
    tertiaryContainer: '#5D4037',
    onTertiary: '#000000',
    onTertiaryContainer: '#FFDDC1',

    // Background and surfaces
    background: '#121212', // Dark workshop
    surface: '#1E1E1E',
    surfaceVariant: '#2C2C2C',
    onBackground: '#E6E1E5',
    onSurface: '#E6E1E5',
    onSurfaceVariant: '#CAC4D0',

    // Borders and outlines
    outline: '#938F99',
    outlineVariant: '#49454F',

    // Semantic colors
    error: '#CF6679',
    onError: '#000000',
    success: '#81C784',
    onSuccess: '#000000',
    warning: '#FFB74D',
    onWarning: '#000000',

    // Elevation and shadows
    elevation: {
      level0: 'transparent',
      level1: '#232323',
      level2: '#2A2A2A',
      level3: '#313131',
      level4: '#383838',
      level5: '#3F3F3F',
    },

    // Text
    text: '#E6E1E5',
    textSecondary: '#CAC4D0',
    textDisabled: '#6E6E6E',

    // Special UI elements
    tint: '#D2691E',
    icon: '#B0B0B0',
    tabIconDefault: '#6E6E6E',
    tabIconSelected: '#D2691E',
  },
};

export type ColorScheme = 'light' | 'dark';

