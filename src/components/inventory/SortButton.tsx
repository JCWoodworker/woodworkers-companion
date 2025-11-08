/**
 * Sort Button Component
 * Dropdown for sorting inventory items
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Button, Divider, useTheme } from 'react-native-paper';
import { SortOptions, SortField, SortOrder } from '@/src/types/inventory';

interface Props {
  value: SortOptions;
  onChange: (options: SortOptions) => void;
  availableFields?: SortField[];
}

const DEFAULT_FIELDS: SortField[] = ['name', 'dateAdded', 'value', 'quantity'];

const FIELD_LABELS: Record<SortField, string> = {
  name: 'Name',
  dateAdded: 'Date Added',
  dateModified: 'Date Modified',
  value: 'Value',
  quantity: 'Quantity',
  species: 'Species',
  location: 'Location',
};

export function SortButton({ value, onChange, availableFields = DEFAULT_FIELDS }: Props) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleFieldChange = (field: SortField) => {
    onChange({ ...value, field });
    closeMenu();
  };

  const handleOrderToggle = () => {
    onChange({ ...value, order: value.order === 'asc' ? 'desc' : 'asc' });
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Button
            mode="outlined"
            onPress={openMenu}
            icon={value.order === 'asc' ? 'sort-ascending' : 'sort-descending'}
          >
            {FIELD_LABELS[value.field]}
          </Button>
        }
      >
        {availableFields.map((field) => (
          <Menu.Item
            key={field}
            onPress={() => handleFieldChange(field)}
            title={FIELD_LABELS[field]}
            leadingIcon={value.field === field ? 'check' : undefined}
          />
        ))}
        <Divider />
        <Menu.Item
          onPress={handleOrderToggle}
          title={value.order === 'asc' ? 'Ascending' : 'Descending'}
          leadingIcon={value.order === 'asc' ? 'sort-ascending' : 'sort-descending'}
        />
      </Menu>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

