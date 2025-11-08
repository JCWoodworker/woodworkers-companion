/**
 * Empty State Component
 * Displayed when lists or screens have no data
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon, Button } from 'react-native-paper';
import { spacing } from '@/src/theme';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'inbox',
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <View style={styles.container}>
      <Icon source={icon} size={64} color="#9E9E9E" />
      
      <Text variant="headlineSmall" style={styles.title}>
        {title}
      </Text>
      
      {description && (
        <Text variant="bodyMedium" style={styles.description}>
          {description}
        </Text>
      )}

      {actionLabel && onAction && (
        <Button
          mode="contained"
          onPress={onAction}
          style={styles.button}
          icon="plus"
        >
          {actionLabel}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing['3xl'],
  },
  title: {
    marginTop: spacing.lg,
    textAlign: 'center',
    opacity: 0.7,
  },
  description: {
    marginTop: spacing.sm,
    textAlign: 'center',
    opacity: 0.6,
    maxWidth: 300,
  },
  button: {
    marginTop: spacing.lg,
  },
});

