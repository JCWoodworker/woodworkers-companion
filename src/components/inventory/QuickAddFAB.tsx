/**
 * Quick Add FAB Component
 * Floating action button with category options
 */

import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import { router } from 'expo-router';
import { spacing } from '@/src/theme';
import { useCategorySettings } from '@/src/hooks/useCategorySettings';

interface Props {
  defaultCategory?: 'lumber' | 'tools' | 'consumables' | 'hardware' | 'custom';
}

export function QuickAddFAB({ defaultCategory }: Props) {
  const [open, setOpen] = useState(false);
  const { isCategoryEnabled } = useCategorySettings();

  const onStateChange = ({ open }: { open: boolean }) => setOpen(open);

  const actions = [
    ...(isCategoryEnabled('lumber')
      ? [
          {
            icon: 'tree',
            label: 'Add Lumber',
            onPress: () => router.push('/inventory/add?type=lumber' as any),
          },
        ]
      : []),
    ...(isCategoryEnabled('tools')
      ? [
          {
            icon: 'hammer-wrench',
            label: 'Add Tool',
            onPress: () => router.push('/inventory/add?type=tool' as any),
          },
        ]
      : []),
    ...(isCategoryEnabled('consumables')
      ? [
          {
            icon: 'package-variant',
            label: 'Add Consumable',
            onPress: () => router.push('/inventory/add?type=consumable' as any),
          },
        ]
      : []),
    ...(isCategoryEnabled('hardware')
      ? [
          {
            icon: 'screw-machine-flat-top',
            label: 'Add Hardware',
            onPress: () => router.push('/inventory/add?type=hardware' as any),
          },
        ]
      : []),
    ...(isCategoryEnabled('custom')
      ? [
          {
            icon: 'shape-plus',
            label: 'Add Custom',
            onPress: () => router.push('/inventory/add?type=custom' as any),
          },
        ]
      : []),
  ];

  // If only one category or default specified, show simple FAB
  if (actions.length === 1 || defaultCategory) {
    return (
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {
          if (defaultCategory) {
            router.push(`/inventory/add?type=${defaultCategory}` as any);
          } else if (actions.length === 1) {
            actions[0].onPress();
          }
        }}
        label="Add Item"
      />
    );
  }

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        icon={open ? 'close' : 'plus'}
        actions={actions}
        onStateChange={onStateChange}
        style={styles.fabGroup}
      />
    </Portal>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: spacing.base,
    bottom: spacing.base,
  },
  fabGroup: {
    paddingBottom: spacing.base,
  },
});

