/**
 * Complexity Mode Selector Component
 * Visual selector for Hobbyist/Professional/Custom modes
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, RadioButton, useTheme } from 'react-native-paper';
import { ComplexityMode } from '@/src/types/settings';
import { spacing } from '@/src/theme';

interface Props {
  value: ComplexityMode;
  onChange: (mode: ComplexityMode) => void;
}

export function ComplexityModeSelector({ value, onChange }: Props) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.title}>
        Complexity Mode
      </Text>
      <Text variant="bodyMedium" style={[styles.description, { color: theme.colors.onSurfaceVariant }]}>
        Choose how much detail you want across the app
      </Text>

      <Card style={styles.card} mode="outlined" onPress={() => onChange('hobbyist')}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.cardText}>
              <Text variant="titleMedium">🛠️ Hobbyist</Text>
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                Simple and streamlined. Only essential fields and features.
              </Text>
            </View>
            <RadioButton
              value="hobbyist"
              status={value === 'hobbyist' ? 'checked' : 'unchecked'}
              onPress={() => onChange('hobbyist')}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="outlined" onPress={() => onChange('professional')}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.cardText}>
              <Text variant="titleMedium">💼 Professional</Text>
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                Full-featured. All fields, analytics, and advanced tools enabled.
              </Text>
            </View>
            <RadioButton
              value="professional"
              status={value === 'professional' ? 'checked' : 'unchecked'}
              onPress={() => onChange('professional')}
            />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="outlined" onPress={() => onChange('custom')}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <View style={styles.cardText}>
              <Text variant="titleMedium">⚙️ Custom</Text>
              <Text variant="bodySmall" style={{ color: theme.colors.onSurfaceVariant }}>
                Customize exactly which features and fields you want to use.
              </Text>
            </View>
            <RadioButton
              value="custom"
              status={value === 'custom' ? 'checked' : 'unchecked'}
              onPress={() => onChange('custom')}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  description: {
    marginBottom: spacing.md,
  },
  card: {
    marginBottom: spacing.sm,
  },
  cardContent: {
    paddingVertical: spacing.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardText: {
    flex: 1,
    marginRight: spacing.md,
  },
});

