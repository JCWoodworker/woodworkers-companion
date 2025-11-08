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
        name="add"
        options={{
          title: 'Add Item',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="detail/[id]"
        options={{
          title: 'Item Details',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="categories"
        options={{
          title: 'Manage Categories',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="analytics"
        options={{
          title: 'Analytics',
          headerShown: true,
        }}
      />
    </Stack>
  );
}

