/**
 * Multi-Step Progress Component
 * Visual progress indicator for wizards
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ProgressBar, useTheme } from 'react-native-paper';
import { spacing } from '@/src/theme';

interface Props {
  currentStep: number;
  totalSteps: number;
  stepTitle?: string;
}

export function MultiStepProgress({ currentStep, totalSteps, stepTitle }: Props) {
  const theme = useTheme();
  const progress = (currentStep + 1) / totalSteps;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleSmall">
          Step {currentStep + 1} of {totalSteps}
        </Text>
        {stepTitle && (
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant }}>
            {stepTitle}
          </Text>
        )}
      </View>
      <ProgressBar progress={progress} style={styles.progressBar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  header: {
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
});

