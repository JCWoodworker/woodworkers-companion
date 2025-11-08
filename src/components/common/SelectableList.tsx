/**
 * Selectable List Component
 * Reusable radio-style list for selecting from options
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, Text } from 'react-native-paper';
import { spacing } from '@/src/theme';

interface SelectableListProps<T> {
  items: T[];
  selectedValue: any;
  onSelect: (value: any) => void;
  labelKey: keyof T;
  valueKey: keyof T;
  descriptionKey?: keyof T;
  icon?: string;
  disabled?: boolean;
}

export function SelectableList<T extends Record<string, any>>({
  items,
  selectedValue,
  onSelect,
  labelKey,
  valueKey,
  descriptionKey,
  icon = 'radiobox-blank',
  disabled = false,
}: SelectableListProps<T>) {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const value = item[valueKey];
        const isSelected = value === selectedValue;
        
        return (
          <List.Item
            key={value}
            title={item[labelKey] as string}
            description={descriptionKey ? (item[descriptionKey] as string) : undefined}
            onPress={() => !disabled && onSelect(value)}
            disabled={disabled}
            left={() => (
              <List.Icon 
                icon={isSelected ? icon.replace('blank', 'marked') : icon} 
              />
            )}
            style={[
              styles.item,
              isSelected && styles.selectedItem,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.sm,
  },
  item: {
    paddingVertical: spacing.xs,
  },
  selectedItem: {
    backgroundColor: 'rgba(139, 69, 19, 0.1)', // Primary color with opacity
  },
});

