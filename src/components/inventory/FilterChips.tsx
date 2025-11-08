/**
 * Filter Chips Component
 * Filter inventory by category, location, etc.
 */

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import { spacing } from '@/src/theme';

interface FilterOption {
  label: string;
  value: string;
  icon?: string;
}

interface Props {
  options: FilterOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  multiSelect?: boolean;
}

export function FilterChips({ options, selectedValues, onToggle, multiSelect = false }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        
        return (
          <Chip
            key={option.value}
            selected={isSelected}
            onPress={() => onToggle(option.value)}
            style={styles.chip}
            icon={option.icon}
            mode={isSelected ? 'flat' : 'outlined'}
          >
            {option.label}
          </Chip>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  chip: {
    marginRight: spacing.sm,
  },
});

