/**
 * Platform Safe Area Hook
 * Returns platform-aware safe area insets
 */

import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function usePlatformSafeArea() {
  const insets = useSafeAreaInsets();

  return {
    // Raw insets
    top: insets.top,
    bottom: insets.bottom,
    left: insets.left,
    right: insets.right,

    // Platform-specific helpers
    ios: Platform.OS === 'ios',
    android: Platform.OS === 'android',
    web: Platform.OS === 'web',

    // Common use cases
    headerHeight: insets.top,
    bottomNavHeight: insets.bottom,
    
    // Safe content padding
    contentPaddingBottom: Math.max(insets.bottom, 16), // Minimum 16px
    fabBottom: insets.bottom + 16, // FABs need extra space
  };
}

