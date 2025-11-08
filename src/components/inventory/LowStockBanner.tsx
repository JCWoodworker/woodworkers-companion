/**
 * Low Stock Banner Component
 * Alert banner for low stock items
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Banner, Text } from 'react-native-paper';
import { spacing } from '@/src/theme';

interface Props {
  count: number;
  visible: boolean;
  onDismiss: () => void;
  onViewItems?: () => void;
}

export function LowStockBanner({ count, visible, onDismiss, onViewItems }: Props) {
  if (!visible || count === 0) return null;

  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: 'Dismiss',
          onPress: onDismiss,
        },
        ...(onViewItems
          ? [
              {
                label: 'View',
                onPress: onViewItems,
              },
            ]
          : []),
      ]}
      icon="alert"
      style={styles.banner}
    >
      <Text variant="bodyMedium">
        {count} item{count > 1 ? 's' : ''} {count > 1 ? 'are' : 'is'} running low on stock
      </Text>
    </Banner>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginBottom: spacing.md,
  },
});

