/**
 * Custom hook for calculator screens
 * Provides common functionality for all calculators
 */

import { useTheme } from 'react-native-paper';
import { haptics } from '@/src/theme/animations';

export const useCalculatorScreen = () => {
  const theme = useTheme();

  const withHapticFeedback = async <T extends (...args: any[]) => any>(
    fn: T,
    feedbackType: 'light' | 'medium' | 'success' = 'medium'
  ): Promise<ReturnType<T>> => {
    await haptics[feedbackType]();
    return fn();
  };

  return {
    theme,
    backgroundColor: theme.colors.background,
    withHapticFeedback,
  };
};

