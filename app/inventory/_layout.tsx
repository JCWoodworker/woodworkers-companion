import { Stack } from 'expo-router';
import React from 'react';

export default function InventoryLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Inventory',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="add-lumber"
        options={{
          title: 'Add Lumber',
          headerShown: true,
        }}
      />
    </Stack>
  );
}

