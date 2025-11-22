/**
 * Board List Sort Button Component
 * Sort button specifically for board foot lists
 */

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Menu, Button, Divider } from 'react-native-paper';
import { BoardListSortOptions, BoardListSortField } from '@/src/types/boardFootList';

interface Props {
  value: BoardListSortOptions;
  onChange: (options: BoardListSortOptions) => void;
}

const FIELD_LABELS: Record<BoardListSortField, string> = {
  name: 'Name',
  dateCreated: 'Date Created',
  dateModified: 'Date Modified',
  totalBoardFeet: 'Board Feet',
  totalCost: 'Total Cost',
  client: 'Client',
};

export function BoardListSortButton({ value, onChange }: Props) {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleFieldChange = (field: BoardListSortField) => {
    onChange({ ...value, field });
    closeMenu();
  };

  const handleOrderToggle = () => {
    onChange({ ...value, order: value.order === 'asc' ? 'desc' : 'asc' });
  };

  const fields: BoardListSortField[] = ['name', 'dateCreated', 'totalBoardFeet', 'totalCost', 'client'];

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
        {fields.map((field) => (
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

