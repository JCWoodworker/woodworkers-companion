/**
 * Reusable calculator screen layout
 * Eliminates code duplication across calculator screens
 */

import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import { useCalculatorScreen } from '@/src/hooks/useCalculatorScreen';
import { usePlatformSafeArea } from '@/src/hooks/usePlatformSafeArea';
import { spacing, touchTargets } from '@/src/theme';
import { haptics } from '@/src/theme/animations';

interface CalculatorLayoutProps {
  children: ReactNode;
  onCalculate: () => void | Promise<void>;
  onReset: () => void | Promise<void>;
  calculateLabel?: string;
  calculateIcon?: string;
  isCalculateDisabled?: boolean;
}

export const CalculatorLayout: React.FC<CalculatorLayoutProps> = ({
  children,
  onCalculate,
  onReset,
  calculateLabel = 'Calculate',
  calculateIcon = 'calculator',
  isCalculateDisabled = false,
}) => {
  const { backgroundColor } = useCalculatorScreen();
  const { contentPaddingBottom } = usePlatformSafeArea();

  const handleCalculate = async () => {
    await haptics.medium();
    await onCalculate();
    await haptics.success();
  };

  const handleReset = async () => {
    await haptics.light();
    await onReset();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        style={[styles.container, { backgroundColor }]}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: contentPaddingBottom + spacing.xl }
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {children}
        
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={handleCalculate}
            style={styles.button}
            icon={calculateIcon}
            disabled={isCalculateDisabled}
          >
            {calculateLabel}
          </Button>

          <Button
            mode="outlined"
            onPress={handleReset}
            style={styles.button}
            icon="refresh"
          >
            Reset
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.base,
  },
  buttonContainer: {
    gap: spacing.md,
    marginTop: spacing.base,
  },
  button: {
    marginBottom: spacing.sm,
    minHeight: touchTargets.minimum,
  },
});

